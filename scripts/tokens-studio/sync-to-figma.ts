/**
 * ALIEN DESIGN SYSTEM — Sync to Tokens Studio
 *
 * Este script lê os tokens TypeScript
 * e atualiza os arquivos JSON para Tokens Studio
 *
 * FLUXO:
 * 1. Desenvolvedor edita tokens em TypeScript
 * 2. Este script converte para formato Tokens Studio
 * 3. Commit no Git
 * 4. Tokens Studio faz pull no Figma
 *
 * USO:
 * npx ts-node scripts/tokens-studio/sync-to-figma.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Importar tokens TypeScript
import { primitiveColors } from '../../tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { radius, shadow } from '../../tokens/elevation';

const OUTPUT_PATH = path.join(__dirname, '../../tokens/tokens-studio');

// ============================================
// TRANSFORMADORES
// ============================================

function transformColorsToTokensStudio(colors: typeof primitiveColors): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [category, shades] of Object.entries(colors)) {
    if (typeof shades === 'string') {
      // Cor única (white, black, transparent)
      result[category] = {
        value: shades,
        type: 'color',
      };
    } else if (typeof shades === 'object') {
      // Categoria com shades
      result[category] = {};
      for (const [shade, hex] of Object.entries(shades)) {
        (result[category] as Record<string, unknown>)[shade] = {
          value: hex,
          type: 'color',
        };
      }
    }
  }

  return result;
}

function transformTypographyToTokensStudio(): Record<string, unknown> {
  const result: Record<string, unknown> = {
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    lineHeight: {},
    letterSpacing: {},
  };

  // Font families
  for (const [key, value] of Object.entries(fontFamily)) {
    (result.fontFamily as Record<string, unknown>)[key] = {
      value: Array.isArray(value) ? value[0] : value,
      type: 'fontFamilies',
    };
  }

  // Font sizes
  for (const [key, value] of Object.entries(fontSize)) {
    (result.fontSize as Record<string, unknown>)[key] = {
      value: value.replace('px', ''),
      type: 'fontSizes',
    };
  }

  // Font weights
  for (const [key, value] of Object.entries(fontWeight)) {
    (result.fontWeight as Record<string, unknown>)[key] = {
      value: value,
      type: 'fontWeights',
    };
  }

  // Line heights
  for (const [key, value] of Object.entries(lineHeight)) {
    (result.lineHeight as Record<string, unknown>)[key] = {
      value: value,
      type: 'lineHeights',
    };
  }

  // Letter spacing
  for (const [key, value] of Object.entries(letterSpacing)) {
    (result.letterSpacing as Record<string, unknown>)[key] = {
      value: value.replace('em', '%').replace('-0.05', '-5').replace('-0.025', '-2.5')
        .replace('0.025', '2.5').replace('0.05', '5').replace('0.1', '10'),
      type: 'letterSpacing',
    };
  }

  return result;
}

function transformSpacingToTokensStudio(): Record<string, unknown> {
  const result: Record<string, unknown> = {
    spacing: {},
  };

  for (const [key, value] of Object.entries(spacing)) {
    (result.spacing as Record<string, unknown>)[key] = {
      value: value.replace('px', ''),
      type: 'spacing',
    };
  }

  return result;
}

function transformElevationToTokensStudio(): Record<string, unknown> {
  const result: Record<string, unknown> = {
    borderRadius: {},
  };

  for (const [key, value] of Object.entries(radius)) {
    (result.borderRadius as Record<string, unknown>)[key] = {
      value: value.replace('px', ''),
      type: 'borderRadius',
    };
  }

  return result;
}

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

async function syncToTokensStudio() {
  console.log('🔄 Sincronizando tokens para Tokens Studio...\n');

  try {
    // Garantir que as pastas existem
    const corePath = path.join(OUTPUT_PATH, 'core');
    const semanticPath = path.join(OUTPUT_PATH, 'semantic');

    if (!fs.existsSync(corePath)) {
      fs.mkdirSync(corePath, { recursive: true });
    }
    if (!fs.existsSync(semanticPath)) {
      fs.mkdirSync(semanticPath, { recursive: true });
    }

    // Transformar e salvar tokens
    console.log('📝 Convertendo tokens...');

    // Colors
    const colorsJson = transformColorsToTokensStudio(primitiveColors);
    fs.writeFileSync(
      path.join(corePath, 'colors.json'),
      JSON.stringify(colorsJson, null, 2)
    );
    console.log('   ✓ core/colors.json');

    // Typography
    const typographyJson = transformTypographyToTokensStudio();
    fs.writeFileSync(
      path.join(corePath, 'typography.json'),
      JSON.stringify(typographyJson, null, 2)
    );
    console.log('   ✓ core/typography.json');

    // Spacing
    const spacingJson = transformSpacingToTokensStudio();
    fs.writeFileSync(
      path.join(corePath, 'spacing.json'),
      JSON.stringify(spacingJson, null, 2)
    );
    console.log('   ✓ core/spacing.json');

    // Elevation
    const elevationJson = transformElevationToTokensStudio();
    fs.writeFileSync(
      path.join(corePath, 'elevation.json'),
      JSON.stringify(elevationJson, null, 2)
    );
    console.log('   ✓ core/elevation.json');

    console.log('\n✅ Sincronização concluída!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. Commit as mudanças no Git');
    console.log('   2. No Figma, abra Tokens Studio');
    console.log('   3. Clique em "Pull from GitHub"');
    console.log('   4. Tokens atualizados!\n');

  } catch (error) {
    console.error('\n❌ Erro na sincronização:', error);
    throw error;
  }
}

// Executar
syncToTokensStudio().catch(console.error);

export { syncToTokensStudio };
