/**
 * ALIEN DESIGN SYSTEM — Sync from Tokens Studio
 *
 * Este script lê os tokens JSON do Tokens Studio
 * e atualiza os arquivos TypeScript do projeto
 *
 * FLUXO:
 * 1. Designer edita tokens no Figma via Tokens Studio
 * 2. Tokens Studio faz push para Git (ou export manual)
 * 3. Este script lê os JSONs e atualiza os .ts
 *
 * USO:
 * npx ts-node scripts/tokens-studio/sync-from-figma.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const TOKENS_STUDIO_PATH = path.join(__dirname, '../../tokens/tokens-studio');
const TOKENS_OUTPUT_PATH = path.join(__dirname, '../../tokens');

// ============================================
// UTILITÁRIOS
// ============================================

function readJsonFile(filePath: string): Record<string, unknown> {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function resolveTokenReference(
  value: string,
  allTokens: Record<string, unknown>
): string {
  // Se não é uma referência, retorna o valor
  if (!value.startsWith('{') || !value.endsWith('}')) {
    return value;
  }

  // Remove { e } e resolve o path
  const tokenPath = value.slice(1, -1).split('.');
  let resolved: unknown = allTokens;

  for (const key of tokenPath) {
    if (resolved && typeof resolved === 'object') {
      resolved = (resolved as Record<string, unknown>)[key];
    } else {
      return value; // Não conseguiu resolver
    }
  }

  if (resolved && typeof resolved === 'object' && 'value' in resolved) {
    return (resolved as { value: string }).value;
  }

  return value;
}

// ============================================
// GERADORES DE CÓDIGO
// ============================================

function generateColorsTs(colors: Record<string, unknown>): string {
  let code = `/**
 * ALIEN DESIGN SYSTEM — Color Tokens
 *
 * ⚠️ SINCRONIZADO COM TOKENS STUDIO
 * Última sync: ${new Date().toISOString()}
 *
 * Para editar: modifique no Figma via Tokens Studio
 * e execute: npm run tokens:sync
 */

export const primitiveColors = {\n`;

  function processColorGroup(
    group: Record<string, unknown>,
    indent: string
  ): string {
    let result = '';

    for (const [key, value] of Object.entries(group)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        'value' in value &&
        'type' in value
      ) {
        const tokenValue = value as { value: string; type: string; description?: string };
        if (tokenValue.type === 'color') {
          const description = tokenValue.description
            ? ` // ${tokenValue.description}`
            : '';
          result += `${indent}${key}: '${tokenValue.value}',${description}\n`;
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `${indent}${key}: {\n`;
        result += processColorGroup(value as Record<string, unknown>, indent + '  ');
        result += `${indent}},\n`;
      }
    }

    return result;
  }

  code += processColorGroup(colors, '  ');
  code += `} as const;\n\nexport type PrimitiveColors = typeof primitiveColors;\n`;

  return code;
}

function generateTypographyTs(typography: Record<string, unknown>): string {
  let code = `/**
 * ALIEN DESIGN SYSTEM — Typography Tokens
 *
 * ⚠️ SINCRONIZADO COM TOKENS STUDIO
 * Última sync: ${new Date().toISOString()}
 */

`;

  // Font Families
  const fontFamily = typography.fontFamily as Record<string, { value: string }>;
  if (fontFamily) {
    code += `export const fontFamily = {\n`;
    for (const [key, token] of Object.entries(fontFamily)) {
      code += `  ${key}: ['${token.value}', 'ui-sans-serif', 'system-ui', 'sans-serif'],\n`;
    }
    code += `} as const;\n\n`;
  }

  // Font Sizes
  const fontSize = typography.fontSize as Record<string, { value: string }>;
  if (fontSize) {
    code += `export const fontSize = {\n`;
    for (const [key, token] of Object.entries(fontSize)) {
      code += `  '${key}': '${token.value}px',\n`;
    }
    code += `} as const;\n\n`;
  }

  // Font Weights
  const fontWeight = typography.fontWeight as Record<string, { value: string }>;
  if (fontWeight) {
    code += `export const fontWeight = {\n`;
    for (const [key, token] of Object.entries(fontWeight)) {
      code += `  ${key}: '${token.value}',\n`;
    }
    code += `} as const;\n\n`;
  }

  // Line Heights
  const lineHeight = typography.lineHeight as Record<string, { value: string }>;
  if (lineHeight) {
    code += `export const lineHeight = {\n`;
    for (const [key, token] of Object.entries(lineHeight)) {
      code += `  ${key}: '${token.value}',\n`;
    }
    code += `} as const;\n`;
  }

  return code;
}

function generateSpacingTs(spacing: Record<string, unknown>): string {
  let code = `/**
 * ALIEN DESIGN SYSTEM — Spacing Tokens
 *
 * ⚠️ SINCRONIZADO COM TOKENS STUDIO
 * Última sync: ${new Date().toISOString()}
 */

export const spacing = {\n`;

  const spacingTokens = spacing.spacing as Record<string, { value: string }>;
  if (spacingTokens) {
    for (const [key, token] of Object.entries(spacingTokens)) {
      code += `  '${key}': '${token.value}px',\n`;
    }
  }

  code += `} as const;\n\nexport type Spacing = typeof spacing;\n`;

  return code;
}

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

async function syncFromTokensStudio() {
  console.log('🔄 Sincronizando tokens do Tokens Studio...\n');

  try {
    // Verificar se os arquivos existem
    const coreColorsPath = path.join(TOKENS_STUDIO_PATH, 'core/colors.json');
    const coreTypographyPath = path.join(TOKENS_STUDIO_PATH, 'core/typography.json');
    const coreSpacingPath = path.join(TOKENS_STUDIO_PATH, 'core/spacing.json');

    if (!fs.existsSync(coreColorsPath)) {
      console.error('❌ Arquivo colors.json não encontrado');
      console.log('   Esperado em:', coreColorsPath);
      process.exit(1);
    }

    // Ler tokens
    console.log('📥 Lendo tokens JSON...');
    const colors = readJsonFile(coreColorsPath);
    console.log('   ✓ colors.json');

    const typography = fs.existsSync(coreTypographyPath)
      ? readJsonFile(coreTypographyPath)
      : null;
    if (typography) console.log('   ✓ typography.json');

    const spacing = fs.existsSync(coreSpacingPath)
      ? readJsonFile(coreSpacingPath)
      : null;
    if (spacing) console.log('   ✓ spacing.json');

    // Gerar arquivos TypeScript
    console.log('\n📝 Gerando arquivos TypeScript...');

    // Colors
    const colorsCode = generateColorsTs(colors);
    const colorsOutputPath = path.join(TOKENS_OUTPUT_PATH, 'colors.generated.ts');
    fs.writeFileSync(colorsOutputPath, colorsCode);
    console.log('   ✓ colors.generated.ts');

    // Typography
    if (typography) {
      const typographyCode = generateTypographyTs(typography);
      const typographyOutputPath = path.join(TOKENS_OUTPUT_PATH, 'typography.generated.ts');
      fs.writeFileSync(typographyOutputPath, typographyCode);
      console.log('   ✓ typography.generated.ts');
    }

    // Spacing
    if (spacing) {
      const spacingCode = generateSpacingTs(spacing);
      const spacingOutputPath = path.join(TOKENS_OUTPUT_PATH, 'spacing.generated.ts');
      fs.writeFileSync(spacingOutputPath, spacingCode);
      console.log('   ✓ spacing.generated.ts');
    }

    console.log('\n✅ Sincronização concluída!');
    console.log('   Os arquivos .generated.ts foram atualizados.');
    console.log('   Importe de lá para usar os tokens do Figma.\n');

  } catch (error) {
    console.error('\n❌ Erro na sincronização:', error);
    throw error;
  }
}

// Executar
syncFromTokensStudio().catch(console.error);

export { syncFromTokensStudio };
