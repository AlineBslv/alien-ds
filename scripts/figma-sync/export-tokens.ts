/**
 * ALIEN DESIGN SYSTEM — Export Tokens to Figma
 *
 * Este script exporta os Design Tokens do código para o Figma
 * Usa a Figma Variables REST API para criar/atualizar variáveis
 *
 * USO:
 * npx ts-node scripts/figma-sync/export-tokens.ts
 *
 * REQUISITOS:
 * - FIGMA_ACCESS_TOKEN com escopo "Variables (read and write)"
 * - FIGMA_FILE_KEY do arquivo de destino
 * - Plano Enterprise do Figma (para Variables API)
 */

import { primitiveColors, semanticColors } from '../../tokens/colors';
import { fontSize, fontWeight, lineHeight, letterSpacing } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { radius, shadow } from '../../tokens/elevation';
import { defaultConfig, validateConfig, FIGMA_API } from './config';

// ============================================
// TIPOS
// ============================================

interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface FigmaVariableCreate {
  action: 'CREATE';
  id: string; // ID temporário
  name: string;
  variableCollectionId: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  description?: string;
  codeSyntax?: {
    WEB?: string;
    ANDROID?: string;
    iOS?: string;
  };
}

interface FigmaVariableModeValue {
  action: 'UPDATE';
  variableId: string;
  modeId: string;
  value: FigmaColor | number | string | boolean;
}

interface FigmaCollectionCreate {
  action: 'CREATE';
  id: string;
  name: string;
  initialModeId: string;
}

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Converte hex para formato Figma RGBA (0-1)
 */
function hexToFigmaColor(hex: string): FigmaColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

  if (!result) {
    console.warn(`Cor inválida: ${hex}`);
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: result[4] ? parseInt(result[4], 16) / 255 : 1,
  };
}

/**
 * Converte valor de spacing (ex: "16px") para número
 */
function parseSpacing(value: string): number {
  return parseFloat(value.replace('px', ''));
}

/**
 * Gera ID temporário para criação de variáveis
 */
let tempIdCounter = 0;
function generateTempId(prefix: string): string {
  tempIdCounter++;
  return `temp_${prefix}_${tempIdCounter}`;
}

// ============================================
// TRANSFORMADORES DE TOKENS
// ============================================

/**
 * Transforma tokens de cor para formato Figma
 */
function transformColorTokens(
  collectionId: string,
  modeId: string
): { variables: FigmaVariableCreate[]; values: FigmaVariableModeValue[] } {
  const variables: FigmaVariableCreate[] = [];
  const values: FigmaVariableModeValue[] = [];

  // Primary colors
  Object.entries(primitiveColors.primary).forEach(([shade, hex]) => {
    const id = generateTempId('color');
    variables.push({
      action: 'CREATE',
      id,
      name: `primary/${shade}`,
      variableCollectionId: collectionId,
      resolvedType: 'COLOR',
      description: `Primary color shade ${shade}`,
      codeSyntax: {
        WEB: `var(--color-primary-${shade})`,
      },
    });
    values.push({
      action: 'UPDATE',
      variableId: id,
      modeId,
      value: hexToFigmaColor(hex),
    });
  });

  // Accent colors
  Object.entries(primitiveColors.accent).forEach(([shade, hex]) => {
    const id = generateTempId('color');
    variables.push({
      action: 'CREATE',
      id,
      name: `accent/${shade}`,
      variableCollectionId: collectionId,
      resolvedType: 'COLOR',
      description: `Accent color shade ${shade}`,
      codeSyntax: {
        WEB: `var(--color-accent-${shade})`,
      },
    });
    values.push({
      action: 'UPDATE',
      variableId: id,
      modeId,
      value: hexToFigmaColor(hex),
    });
  });

  // Aurora colors
  Object.entries(primitiveColors.aurora).forEach(([shade, hex]) => {
    const id = generateTempId('color');
    variables.push({
      action: 'CREATE',
      id,
      name: `aurora/${shade}`,
      variableCollectionId: collectionId,
      resolvedType: 'COLOR',
      description: `Aurora color shade ${shade}`,
      codeSyntax: {
        WEB: `var(--color-aurora-${shade})`,
      },
    });
    values.push({
      action: 'UPDATE',
      variableId: id,
      modeId,
      value: hexToFigmaColor(hex),
    });
  });

  // Neutral colors
  Object.entries(primitiveColors.neutral).forEach(([shade, hex]) => {
    const id = generateTempId('color');
    variables.push({
      action: 'CREATE',
      id,
      name: `neutral/${shade}`,
      variableCollectionId: collectionId,
      resolvedType: 'COLOR',
      description: `Neutral color shade ${shade}`,
      codeSyntax: {
        WEB: `var(--color-neutral-${shade})`,
      },
    });
    values.push({
      action: 'UPDATE',
      variableId: id,
      modeId,
      value: hexToFigmaColor(hex),
    });
  });

  // Semantic colors
  Object.entries(semanticColors.background).forEach(([name, hex]) => {
    const id = generateTempId('color');
    variables.push({
      action: 'CREATE',
      id,
      name: `semantic/background/${name}`,
      variableCollectionId: collectionId,
      resolvedType: 'COLOR',
      description: `Semantic background: ${name}`,
      codeSyntax: {
        WEB: `var(--background-${name})`,
      },
    });
    values.push({
      action: 'UPDATE',
      variableId: id,
      modeId,
      value: hexToFigmaColor(hex),
    });
  });

  return { variables, values };
}

/**
 * Transforma tokens de espaçamento para formato Figma
 */
function transformSpacingTokens(
  collectionId: string,
  modeId: string
): { variables: FigmaVariableCreate[]; values: FigmaVariableModeValue[] } {
  const variables: FigmaVariableCreate[] = [];
  const values: FigmaVariableModeValue[] = [];

  Object.entries(spacing).forEach(([key, value]) => {
    if (typeof value === 'string' && value !== '0') {
      const id = generateTempId('spacing');
      variables.push({
        action: 'CREATE',
        id,
        name: `spacing/${key}`,
        variableCollectionId: collectionId,
        resolvedType: 'FLOAT',
        description: `Spacing ${key}: ${value}`,
        codeSyntax: {
          WEB: `var(--space-${key})`,
        },
      });
      values.push({
        action: 'UPDATE',
        variableId: id,
        modeId,
        value: parseSpacing(value),
      });
    }
  });

  return { variables, values };
}

/**
 * Transforma tokens de tipografia para formato Figma
 */
function transformTypographyTokens(
  collectionId: string,
  modeId: string
): { variables: FigmaVariableCreate[]; values: FigmaVariableModeValue[] } {
  const variables: FigmaVariableCreate[] = [];
  const values: FigmaVariableModeValue[] = [];

  // Font sizes
  Object.entries(fontSize).forEach(([key, value]) => {
    const id = generateTempId('font');
    variables.push({
      action: 'CREATE',
      id,
      name: `typography/size/${key}`,
      variableCollectionId: collectionId,
      resolvedType: 'FLOAT',
      description: `Font size ${key}: ${value}`,
      codeSyntax: {
        WEB: `var(--text-${key})`,
      },
    });
    values.push({
      action: 'UPDATE',
      variableId: id,
      modeId,
      value: parseSpacing(value),
    });
  });

  // Font weights
  Object.entries(fontWeight).forEach(([key, value]) => {
    const id = generateTempId('font');
    variables.push({
      action: 'CREATE',
      id,
      name: `typography/weight/${key}`,
      variableCollectionId: collectionId,
      resolvedType: 'FLOAT',
      description: `Font weight ${key}`,
      codeSyntax: {
        WEB: `font-weight: ${value}`,
      },
    });
    values.push({
      action: 'UPDATE',
      variableId: id,
      modeId,
      value: parseInt(value),
    });
  });

  // Line heights
  Object.entries(lineHeight).forEach(([key, value]) => {
    const id = generateTempId('font');
    variables.push({
      action: 'CREATE',
      id,
      name: `typography/lineHeight/${key}`,
      variableCollectionId: collectionId,
      resolvedType: 'FLOAT',
      description: `Line height ${key}`,
      codeSyntax: {
        WEB: `line-height: ${value}`,
      },
    });
    values.push({
      action: 'UPDATE',
      variableId: id,
      modeId,
      value: parseFloat(value),
    });
  });

  return { variables, values };
}

/**
 * Transforma tokens de elevação para formato Figma
 */
function transformElevationTokens(
  collectionId: string,
  modeId: string
): { variables: FigmaVariableCreate[]; values: FigmaVariableModeValue[] } {
  const variables: FigmaVariableCreate[] = [];
  const values: FigmaVariableModeValue[] = [];

  // Border radius
  Object.entries(radius).forEach(([key, value]) => {
    if (value !== '0' && value !== '9999px') {
      const id = generateTempId('radius');
      variables.push({
        action: 'CREATE',
        id,
        name: `elevation/radius/${key}`,
        variableCollectionId: collectionId,
        resolvedType: 'FLOAT',
        description: `Border radius ${key}: ${value}`,
        codeSyntax: {
          WEB: `border-radius: var(--radius-${key})`,
        },
      });
      values.push({
        action: 'UPDATE',
        variableId: id,
        modeId,
        value: parseSpacing(value),
      });
    }
  });

  return { variables, values };
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

  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Figma-Token': this.accessToken,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Figma API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Obtém variáveis locais do arquivo
   */
  async getLocalVariables() {
    return this.request(FIGMA_API.variables(this.fileKey));
  }

  /**
   * Cria ou atualiza variáveis em massa
   */
  async postVariables(payload: {
    variableCollections?: FigmaCollectionCreate[];
    variableModes?: { action: string; id: string; name: string; variableCollectionId: string }[];
    variables?: FigmaVariableCreate[];
    variableModeValues?: FigmaVariableModeValue[];
  }) {
    return this.request(FIGMA_API.postVariables(this.fileKey), {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

// ============================================
// FUNÇÃO PRINCIPAL DE EXPORTAÇÃO
// ============================================

async function exportTokensToFigma() {
  console.log('🚀 Iniciando exportação de tokens para Figma...\n');

  // Validar configuração
  const validation = validateConfig(defaultConfig);
  if (!validation.valid) {
    console.error('❌ Configuração inválida:');
    validation.errors.forEach((err) => console.error(`   - ${err}`));
    console.log('\n📝 Configure as variáveis de ambiente:');
    console.log('   export FIGMA_ACCESS_TOKEN="seu-token"');
    console.log('   export FIGMA_FILE_KEY="seu-file-key"');
    process.exit(1);
  }

  const client = new FigmaClient(
    defaultConfig.accessToken,
    defaultConfig.fileKey
  );

  try {
    // IDs temporários para coleções
    const colorCollectionId = generateTempId('collection');
    const colorModeId = generateTempId('mode');
    const spacingCollectionId = generateTempId('collection');
    const spacingModeId = generateTempId('mode');
    const typographyCollectionId = generateTempId('collection');
    const typographyModeId = generateTempId('mode');
    const elevationCollectionId = generateTempId('collection');
    const elevationModeId = generateTempId('mode');

    // Coleções a criar
    const collections: FigmaCollectionCreate[] = [
      {
        action: 'CREATE',
        id: colorCollectionId,
        name: 'Alien Colors',
        initialModeId: colorModeId,
      },
      {
        action: 'CREATE',
        id: spacingCollectionId,
        name: 'Alien Spacing',
        initialModeId: spacingModeId,
      },
      {
        action: 'CREATE',
        id: typographyCollectionId,
        name: 'Alien Typography',
        initialModeId: typographyModeId,
      },
      {
        action: 'CREATE',
        id: elevationCollectionId,
        name: 'Alien Effects',
        initialModeId: elevationModeId,
      },
    ];

    // Transformar tokens
    console.log('📦 Transformando tokens...');

    const colors = transformColorTokens(colorCollectionId, colorModeId);
    console.log(`   ✓ ${colors.variables.length} cores`);

    const spacingTokens = transformSpacingTokens(spacingCollectionId, spacingModeId);
    console.log(`   ✓ ${spacingTokens.variables.length} espaçamentos`);

    const typography = transformTypographyTokens(typographyCollectionId, typographyModeId);
    console.log(`   ✓ ${typography.variables.length} tipografias`);

    const elevation = transformElevationTokens(elevationCollectionId, elevationModeId);
    console.log(`   ✓ ${elevation.variables.length} elevações`);

    // Combinar todos os dados
    const allVariables = [
      ...colors.variables,
      ...spacingTokens.variables,
      ...typography.variables,
      ...elevation.variables,
    ];

    const allValues = [
      ...colors.values,
      ...spacingTokens.values,
      ...typography.values,
      ...elevation.values,
    ];

    console.log(`\n📤 Enviando para Figma...`);
    console.log(`   Total: ${allVariables.length} variáveis`);

    // Enviar para Figma
    const result = await client.postVariables({
      variableCollections: collections,
      variables: allVariables,
      variableModeValues: allValues,
    });

    console.log('\n✅ Exportação concluída com sucesso!');
    console.log('   Abra o Figma e verifique as variáveis criadas.');

    return result;
  } catch (error) {
    console.error('\n❌ Erro na exportação:', error);
    throw error;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  exportTokensToFigma().catch(console.error);
}

export { exportTokensToFigma };
