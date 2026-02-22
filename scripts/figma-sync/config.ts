/**
 * ALIEN DESIGN SYSTEM — Figma Sync Configuration
 *
 * Configuração para sincronização bidirecional com Figma
 *
 * FLUXO:
 * 1. Claude Code cria componentes/tokens
 * 2. Script exporta para Figma via API
 * 3. Designer edita no Figma
 * 4. Script importa alterações de volta
 * 5. Código atualizado automaticamente
 */

export interface FigmaConfig {
  /** Token de acesso à API do Figma */
  accessToken: string;

  /** ID do arquivo principal do Design System no Figma */
  fileKey: string;

  /** IDs das páginas específicas */
  pages: {
    tokens: string;
    components: string;
    documentation: string;
  };

  /** Configurações de sincronização */
  sync: {
    /** Sincronizar cores */
    colors: boolean;
    /** Sincronizar tipografia */
    typography: boolean;
    /** Sincronizar espaçamento */
    spacing: boolean;
    /** Sincronizar elevação (shadows, radius) */
    elevation: boolean;
    /** Sincronizar componentes */
    components: boolean;
  };

  /** Mapeamento de coleções de variáveis */
  collections: {
    colors: string;
    typography: string;
    spacing: string;
    effects: string;
  };
}

/**
 * Configuração padrão
 *
 * IMPORTANTE: Substitua os valores placeholder pelos seus
 *
 * Para obter o FIGMA_ACCESS_TOKEN:
 * 1. Vá para figma.com/settings
 * 2. Scroll até "Personal access tokens"
 * 3. Clique "Create new token"
 * 4. Selecione os escopos necessários:
 *    - File content (read)
 *    - Variables (read and write)
 *    - Code Connect (write)
 *
 * Para obter o FILE_KEY:
 * 1. Abra seu arquivo Figma
 * 2. A URL será: figma.com/file/XXXXXXX/Nome-do-Arquivo
 * 3. O FILE_KEY é o XXXXXXX
 */
export const defaultConfig: FigmaConfig = {
  accessToken: process.env.FIGMA_ACCESS_TOKEN || '',
  fileKey: process.env.FIGMA_FILE_KEY || '',

  pages: {
    tokens: '', // Será preenchido após criação no Figma
    components: '',
    documentation: '',
  },

  sync: {
    colors: true,
    typography: true,
    spacing: true,
    elevation: true,
    components: true,
  },

  collections: {
    colors: 'Alien Colors',
    typography: 'Alien Typography',
    spacing: 'Alien Spacing',
    effects: 'Alien Effects',
  },
};

/**
 * Valida se a configuração está completa
 */
export function validateConfig(config: FigmaConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.accessToken) {
    errors.push('FIGMA_ACCESS_TOKEN não configurado');
  }

  if (!config.fileKey) {
    errors.push('FIGMA_FILE_KEY não configurado');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * URLs da API do Figma
 */
export const FIGMA_API = {
  base: 'https://api.figma.com/v1',
  files: (fileKey: string) => `https://api.figma.com/v1/files/${fileKey}`,
  variables: (fileKey: string) =>
    `https://api.figma.com/v1/files/${fileKey}/variables/local`,
  publishedVariables: (fileKey: string) =>
    `https://api.figma.com/v1/files/${fileKey}/variables/published`,
  postVariables: (fileKey: string) =>
    `https://api.figma.com/v1/files/${fileKey}/variables`,
} as const;
