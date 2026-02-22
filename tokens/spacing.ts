/**
 * ALIEN DESIGN SYSTEM — Spacing Tokens
 *
 * Sistema de espaçamento baseado em múltiplos de 8px
 * Escala: 8 / 16 / 24 / 32 / 48 (conforme Brand Guide)
 *
 * CONCEITOS IMPORTANTES:
 *
 * 1. POR QUE 8px?
 *    - Divisível por 2 e 4 (flexibilidade)
 *    - Alinha com grids comuns (12, 24 colunas)
 *    - Funciona bem em diferentes densidades de tela
 *
 * 2. CONSISTÊNCIA > PERFEIÇÃO
 *    Usar a escala mesmo quando "parece" que outro valor ficaria melhor
 *    garante harmonia visual em todo o sistema
 *
 * 3. ESCALA PROGRESSIVA
 *    Cada valor tem propósito específico
 *    Não é arbitrário
 */

// ============================================
// 📐 SPACING SCALE (Base 8)
// ============================================

export const spacing = {
  // Micro spacing - para ajustes finos
  px: '1px',
  0: '0',
  0.5: '2px',   // 0.25rem - mínimo
  1: '4px',     // 0.25rem - ícones, badges

  // Core spacing - uso principal
  2: '8px',     // 0.5rem  - gaps pequenos, padding interno
  3: '12px',    // 0.75rem - intermediário
  4: '16px',    // 1rem    - padding padrão, gaps
  5: '20px',    // 1.25rem - intermediário
  6: '24px',    // 1.5rem  - seções pequenas
  7: '28px',    // 1.75rem - intermediário
  8: '32px',    // 2rem    - seções médias

  // Section spacing - para layouts
  10: '40px',   // 2.5rem  - removido do brand guide, mas útil
  12: '48px',   // 3rem    - seções grandes
  14: '56px',   // 3.5rem
  16: '64px',   // 4rem    - hero sections
  20: '80px',   // 5rem
  24: '96px',   // 6rem    - mega sections
  28: '112px',  // 7rem
  32: '128px',  // 8rem

  // Layout spacing - para containers
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
} as const;

// ============================================
// 🎯 SEMANTIC SPACING
// ============================================
// Nomes com intenção de uso

export const semanticSpacing = {
  // Component internal
  component: {
    xs: spacing[1],    // 4px - ícone para texto
    sm: spacing[2],    // 8px - padding interno pequeno
    md: spacing[4],    // 16px - padding padrão
    lg: spacing[6],    // 24px - padding generoso
    xl: spacing[8],    // 32px - padding grande
  },

  // Gaps entre elementos
  gap: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
  },

  // Seções de página
  section: {
    sm: spacing[12],   // 48px
    md: spacing[16],   // 64px
    lg: spacing[24],   // 96px
    xl: spacing[32],   // 128px
  },

  // Insets (padding uniforme)
  inset: {
    xs: spacing[2],    // 8px
    sm: spacing[4],    // 16px
    md: spacing[6],    // 24px
    lg: spacing[8],    // 32px
  },

  // Stack (espaço vertical entre elementos)
  stack: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
  },

  // Inline (espaço horizontal entre elementos)
  inline: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
  },
} as const;

// ============================================
// 📦 COMPONENT SPACING
// ============================================
// Espaçamentos específicos para componentes

export const componentSpacing = {
  // Botões
  button: {
    paddingX: {
      sm: spacing[3],   // 12px
      md: spacing[4],   // 16px
      lg: spacing[6],   // 24px
    },
    paddingY: {
      sm: spacing[2],   // 8px
      md: spacing[3],   // 12px
      lg: spacing[4],   // 16px
    },
    gap: spacing[2],    // 8px - entre ícone e texto
  },

  // Inputs
  input: {
    paddingX: spacing[4],   // 16px
    paddingY: spacing[3],   // 12px
    gap: spacing[2],        // 8px - ícone para texto
  },

  // Cards
  card: {
    padding: {
      sm: spacing[4],   // 16px
      md: spacing[6],   // 24px
      lg: spacing[8],   // 32px
    },
    gap: spacing[4],    // 16px - entre elementos
  },

  // Modal
  modal: {
    padding: spacing[6],    // 24px
    gap: spacing[4],        // 16px
  },

  // Navbar
  navbar: {
    height: spacing[16],    // 64px
    paddingX: spacing[6],   // 24px
    gap: spacing[8],        // 32px
  },

  // Sidebar
  sidebar: {
    width: '280px',
    paddingX: spacing[4],   // 16px
    paddingY: spacing[6],   // 24px
    itemGap: spacing[1],    // 4px
  },

  // Form
  form: {
    fieldGap: spacing[6],   // 24px - entre campos
    labelGap: spacing[2],   // 8px - label para input
    helperGap: spacing[1],  // 4px - input para helper text
  },

  // List
  list: {
    itemPadding: spacing[4],  // 16px
    itemGap: spacing[1],      // 4px
  },

  // Badge
  badge: {
    paddingX: spacing[2],   // 8px
    paddingY: spacing[1],   // 4px
  },

  // Avatar
  avatar: {
    sm: spacing[8],    // 32px
    md: spacing[10],   // 40px
    lg: spacing[12],   // 48px
    xl: spacing[16],   // 64px
  },

  // Icon
  icon: {
    sm: spacing[4],    // 16px
    md: spacing[5],    // 20px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
  },
} as const;

// ============================================
// 📏 LAYOUT CONSTRAINTS
// ============================================

export const layout = {
  // Max widths
  maxWidth: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',    // Container padrão (do Brand Guide)
    '2xl': '1440px',
    '3xl': '1600px',
    full: '100%',
  },

  // Container
  container: {
    default: '1280px',
    narrow: '768px',
    wide: '1440px',
    paddingX: {
      mobile: spacing[4],   // 16px
      tablet: spacing[6],   // 24px
      desktop: spacing[8],  // 32px
    },
  },

  // Grid
  grid: {
    columns: 12,
    gutter: {
      mobile: spacing[4],   // 16px
      tablet: spacing[6],   // 24px
      desktop: spacing[8],  // 32px
    },
  },
} as const;

// ============================================
// 📚 DOCUMENTAÇÃO DE USO
// ============================================
/**
 * QUANDO USAR CADA TAMANHO:
 *
 * 4px (1)   → Gaps mínimos, ícone-texto inline
 * 8px (2)   → Padding interno, gaps pequenos
 * 12px (3)  → Padding de botões pequenos
 * 16px (4)  → Padding padrão, gaps médios
 * 24px (6)  → Padding de cards, seções pequenas
 * 32px (8)  → Seções médias, separação de grupos
 * 48px (12) → Seções de página
 * 64px (16) → Hero sections, separação major
 * 96px (24) → Mega sections
 *
 * DICAS DE USO:
 *
 * 1. Para margens entre elementos relacionados: use gaps menores (8-16px)
 * 2. Para margens entre grupos diferentes: use gaps maiores (24-32px)
 * 3. Para seções de página: use spacing de seção (48-96px)
 * 4. Padding interno de componentes: use valores consistentes
 *
 * REGRA DO DOBRO:
 * Para criar hierarquia visual clara, use saltos significativos
 * Exemplo: se gap interno é 8px, gap externo pode ser 16px ou 24px
 *
 * MOBILE-FIRST:
 * Comece com espaçamentos menores e aumente para desktop
 * Isso garante que mobile não fique apertado
 */

export type Spacing = typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;
export type ComponentSpacing = typeof componentSpacing;
export type Layout = typeof layout;
