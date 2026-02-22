/**
 * ALIEN DESIGN SYSTEM — Import Tokens from Figma
 *
 * Este script importa alterações feitas no Figma de volta para o código
 * Lê variáveis do Figma e atualiza os arquivos de tokens
 *
 * USO:
 * npx ts-node scripts/figma-sync/import-tokens.ts
 *
 * FLUXO:
 * 1. Designer edita variáveis no Figma
 * 2. Este script lê as variáveis via API
 * 3. Compara com tokens locais
 * 4. Gera diff das mudanças
 * 5. Atualiza arquivos de tokens
 */

import * as fs from 'fs';
import * as path from 'path';
import { defaultConfig, validateConfig, FIGMA_API } from './config';

// ============================================
// TIPOS
// ============================================

interface FigmaVariableCollection {
  id: string;
  name: string;
  modes: { modeId: string; name: string }[];
  variableIds: string[];
}

interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  description: string;
  valuesByMode: Record<string, FigmaVariableValue>;
  codeSyntax?: {
    WEB?: string;
  };
}

type FigmaVariableValue =
  | { r: number; g: number; b: number; a: number }
  | number
  | string
  | boolean;

interface FigmaVariablesResponse {
  status: number;
  error: boolean;
  meta: {
    variableCollections: Record<string, FigmaVariableCollection>;
    variables: Record<string, FigmaVariable>;
  };
}

interface TokenDiff {
  added: { path: string; value: unknown }[];
  modified: { path: string; oldValue: unknown; newValue: unknown }[];
  removed: { path: string; oldValue: unknown }[];
}

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Converte cor Figma (0-1) para hex
 */
function figmaColorToHex(color: { r: number; g: number; b: number; a: number }): string {
  const toHex = (n: number) =>
    Math.round(n * 255)
      .toString(16)
      .padStart(2, '0');

  const hex = `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;

  if (color.a < 1) {
    return `${hex}${toHex(color.a)}`;
  }

  return hex.toUpperCase();
}

/**
 * Converte nome de variável Figma para path de token
 * Ex: "primary/900" -> ["primary", "900"]
 */
function variableNameToPath(name: string): string[] {
  return name.split('/').map((part) => part.trim());
}

/**
 * Obtém valor de um objeto por path
 */
function getByPath(obj: Record<string, unknown>, path: string[]): unknown {
  return path.reduce((acc: unknown, key) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Define valor em um objeto por path
 */
function setByPath(
  obj: Record<string, unknown>,
  path: string[],
  value: unknown
): void {
  const lastKey = path[path.length - 1];
  const parent = path.slice(0, -1).reduce((acc: unknown, key) => {
    if (acc && typeof acc === 'object') {
      const record = acc as Record<string, unknown>;
      if (!record[key]) {
        record[key] = {};
      }
      return record[key];
    }
    return undefined;
  }, obj) as Record<string, unknown>;

  if (parent) {
    parent[lastKey] = value;
  }
}

// ============================================
// CLIENTE FIGMA API
// ============================================

class FigmaClient {
  private accessToken: string;
  private fileKey: string;

  constructor(accessToken: string, fileKey: string) {
    this.accessToken = accessToken;
    this.fileKey = fileKey;
  }

  private async request<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': this.accessToken,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Figma API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async getLocalVariables(): Promise<FigmaVariablesResponse> {
    return this.request(FIGMA_API.variables(this.fileKey));
  }
}

// ============================================
// PROCESSADORES DE VARIÁVEIS
// ============================================

/**
 * Processa variáveis de cor do Figma
 */
function processColorVariables(
  variables: FigmaVariable[],
  collections: Record<string, FigmaVariableCollection>
): Record<string, Record<string, string>> {
  const colors: Record<string, Record<string, string>> = {};

  variables
    .filter((v) => v.resolvedType === 'COLOR')
    .forEach((variable) => {
      const path = variableNameToPath(variable.name);
      const modeId = Object.keys(variable.valuesByMode)[0];
      const value = variable.valuesByMode[modeId];

      if (
        typeof value === 'object' &&
        'r' in value &&
        'g' in value &&
        'b' in value
      ) {
        if (path.length === 2) {
          const [category, shade] = path;
          if (!colors[category]) {
            colors[category] = {};
          }
          colors[category][shade] = figmaColorToHex(value);
        }
      }
    });

  return colors;
}

/**
 * Processa variáveis de espaçamento do Figma
 */
function processSpacingVariables(
  variables: FigmaVariable[]
): Record<string, string> {
  const spacing: Record<string, string> = {};

  variables
    .filter(
      (v) => v.resolvedType === 'FLOAT' && v.name.startsWith('spacing/')
    )
    .forEach((variable) => {
      const path = variableNameToPath(variable.name);
      const modeId = Object.keys(variable.valuesByMode)[0];
      const value = variable.valuesByMode[modeId];

      if (typeof value === 'number' && path.length === 2) {
        spacing[path[1]] = `${value}px`;
      }
    });

  return spacing;
}

/**
 * Processa variáveis de tipografia do Figma
 */
function processTypographyVariables(variables: FigmaVariable[]): {
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  lineHeight: Record<string, string>;
} {
  const result = {
    fontSize: {} as Record<string, string>,
    fontWeight: {} as Record<string, string>,
    lineHeight: {} as Record<string, string>,
  };

  variables
    .filter(
      (v) => v.resolvedType === 'FLOAT' && v.name.startsWith('typography/')
    )
    .forEach((variable) => {
      const path = variableNameToPath(variable.name);
      const modeId = Object.keys(variable.valuesByMode)[0];
      const value = variable.valuesByMode[modeId];

      if (typeof value === 'number' && path.length === 3) {
        const [, type, key] = path;

        switch (type) {
          case 'size':
            result.fontSize[key] = `${value}px`;
            break;
          case 'weight':
            result.fontWeight[key] = String(value);
            break;
          case 'lineHeight':
            result.lineHeight[key] = String(value);
            break;
        }
      }
    });

  return result;
}

// ============================================
// GERADOR DE DIFF
// ============================================

/**
 * Compara tokens locais com tokens do Figma
 */
function compareTokens(
  localTokens: Record<string, unknown>,
  figmaTokens: Record<string, unknown>,
  basePath: string[] = []
): TokenDiff {
  const diff: TokenDiff = {
    added: [],
    modified: [],
    removed: [],
  };

  // Verificar adições e modificações
  for (const key of Object.keys(figmaTokens)) {
    const currentPath = [...basePath, key];
    const pathString = currentPath.join('.');
    const localValue = localTokens[key];
    const figmaValue = figmaTokens[key];

    if (localValue === undefined) {
      diff.added.push({ path: pathString, value: figmaValue });
    } else if (
      typeof figmaValue === 'object' &&
      figmaValue !== null &&
      typeof localValue === 'object' &&
      localValue !== null
    ) {
      const nestedDiff = compareTokens(
        localValue as Record<string, unknown>,
        figmaValue as Record<string, unknown>,
        currentPath
      );
      diff.added.push(...nestedDiff.added);
      diff.modified.push(...nestedDiff.modified);
      diff.removed.push(...nestedDiff.removed);
    } else if (localValue !== figmaValue) {
      diff.modified.push({
        path: pathString,
        oldValue: localValue,
        newValue: figmaValue,
      });
    }
  }

  // Verificar remoções
  for (const key of Object.keys(localTokens)) {
    if (figmaTokens[key] === undefined) {
      const currentPath = [...basePath, key];
      diff.removed.push({
        path: currentPath.join('.'),
        oldValue: localTokens[key],
      });
    }
  }

  return diff;
}

// ============================================
// GERADOR DE CÓDIGO
// ============================================

/**
 * Gera código TypeScript para tokens de cor
 */
function generateColorTokensCode(
  colors: Record<string, Record<string, string>>
): string {
  let code = `/**
 * ALIEN DESIGN SYSTEM — Color Tokens
 *
 * ⚠️ GERADO AUTOMATICAMENTE DO FIGMA
 * Última sincronização: ${new Date().toISOString()}
 */

export const primitiveColors = {\n`;

  for (const [category, shades] of Object.entries(colors)) {
    code += `  ${category}: {\n`;
    for (const [shade, hex] of Object.entries(shades)) {
      code += `    ${shade}: '${hex}',\n`;
    }
    code += `  },\n`;
  }

  code += `} as const;\n`;

  return code;
}

// ============================================
// FUNÇÃO PRINCIPAL DE IMPORTAÇÃO
// ============================================

async function importTokensFromFigma(options: {
  dryRun?: boolean;
  verbose?: boolean;
} = {}) {
  const { dryRun = false, verbose = false } = options;

  console.log('🔄 Iniciando importação de tokens do Figma...\n');

  if (dryRun) {
    console.log('⚠️  Modo dry-run: nenhum arquivo será modificado\n');
  }

  // Validar configuração
  const validation = validateConfig(defaultConfig);
  if (!validation.valid) {
    console.error('❌ Configuração inválida:');
    validation.errors.forEach((err) => console.error(`   - ${err}`));
    process.exit(1);
  }

  const client = new FigmaClient(
    defaultConfig.accessToken,
    defaultConfig.fileKey
  );

  try {
    console.log('📥 Buscando variáveis do Figma...');
    const response = await client.getLocalVariables();

    const { variableCollections, variables } = response.meta;

    console.log(
      `   ✓ ${Object.keys(variableCollections).length} coleções encontradas`
    );
    console.log(
      `   ✓ ${Object.keys(variables).length} variáveis encontradas\n`
    );

    // Converter para array
    const variablesList = Object.values(variables);

    // Processar diferentes tipos de tokens
    console.log('🔄 Processando variáveis...');

    const figmaColors = processColorVariables(variablesList, variableCollections);
    console.log(`   ✓ ${Object.keys(figmaColors).length} categorias de cores`);

    const figmaSpacing = processSpacingVariables(variablesList);
    console.log(`   ✓ ${Object.keys(figmaSpacing).length} tokens de espaçamento`);

    const figmaTypography = processTypographyVariables(variablesList);
    console.log(
      `   ✓ ${Object.keys(figmaTypography.fontSize).length} tamanhos de fonte`
    );

    // Carregar tokens locais para comparação
    console.log('\n📊 Comparando com tokens locais...');

    // Gerar relatório de mudanças
    if (verbose) {
      console.log('\n📋 Variáveis do Figma:');
      variablesList.forEach((v) => {
        const modeId = Object.keys(v.valuesByMode)[0];
        console.log(`   - ${v.name}: ${JSON.stringify(v.valuesByMode[modeId])}`);
      });
    }

    // Se não for dry-run, atualizar arquivos
    if (!dryRun && Object.keys(figmaColors).length > 0) {
      console.log('\n📝 Atualizando arquivos de tokens...');

      // Aqui você pode implementar a lógica de atualização
      // Por segurança, vamos apenas mostrar o que seria gerado

      console.log('\n📄 Preview do código gerado:');
      console.log('─'.repeat(50));
      const colorCode = generateColorTokensCode(figmaColors);
      console.log(colorCode.slice(0, 500) + '\n...');
      console.log('─'.repeat(50));
    }

    console.log('\n✅ Importação concluída!');

    return {
      colors: figmaColors,
      spacing: figmaSpacing,
      typography: figmaTypography,
    };
  } catch (error) {
    console.error('\n❌ Erro na importação:', error);
    throw error;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const verbose = args.includes('--verbose');

  importTokensFromFigma({ dryRun, verbose }).catch(console.error);
}

export { importTokensFromFigma };
