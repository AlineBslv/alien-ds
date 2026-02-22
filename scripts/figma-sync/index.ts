/**
 * ALIEN DESIGN SYSTEM — Figma Sync CLI
 *
 * Ponto de entrada para comandos de sincronização com Figma
 *
 * USO:
 * npx ts-node scripts/figma-sync export    # Exporta tokens para Figma
 * npx ts-node scripts/figma-sync import    # Importa tokens do Figma
 * npx ts-node scripts/figma-sync diff      # Mostra diferenças
 */

import { exportTokensToFigma } from './export-tokens';
import { importTokensFromFigma } from './import-tokens';

const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║     ALIEN DESIGN SYSTEM — Figma Sync     ║');
  console.log('╚══════════════════════════════════════════╝\n');

  switch (command) {
    case 'export':
      await exportTokensToFigma();
      break;

    case 'import':
      const dryRun = args.includes('--dry-run');
      const verbose = args.includes('--verbose');
      await importTokensFromFigma({ dryRun, verbose });
      break;

    case 'diff':
      console.log('🔍 Comparando tokens locais com Figma...\n');
      await importTokensFromFigma({ dryRun: true, verbose: true });
      break;

    case 'help':
    default:
      console.log('Comandos disponíveis:\n');
      console.log('  export              Exporta tokens do código para o Figma');
      console.log('  import              Importa tokens do Figma para o código');
      console.log('  import --dry-run    Mostra o que seria importado sem modificar');
      console.log('  import --verbose    Mostra detalhes das variáveis');
      console.log('  diff                Mostra diferenças entre código e Figma');
      console.log('  help                Mostra esta ajuda\n');
      console.log('Configuração necessária:\n');
      console.log('  FIGMA_ACCESS_TOKEN  Token de acesso da API do Figma');
      console.log('  FIGMA_FILE_KEY      ID do arquivo Figma (da URL)');
      break;
  }
}

main().catch((error) => {
  console.error('\n❌ Erro:', error.message);
  process.exit(1);
});
