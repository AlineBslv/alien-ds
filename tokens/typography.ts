/**
 * ALIEN DESIGN SYSTEM — Typography Tokens
 *
 * Sistema tipográfico baseado no Brand Guide
 * Headlines: Space Grotesk | Body: Inter
 *
 * CONCEITOS IMPORTANTES:
 *
 * 1. ESCALA MODULAR
 *    Usamos uma escala consistente (não arbitrária)
 *    Cada tamanho tem propósito definido
 *
 * 2. LINE-HEIGHT
 *    - Headlines: mais apertado (1.2-1.3) = impacto
 *    - Body: mais solto (1.5-1.6) = legibilidade
 *
 * 3. ACESSIBILIDADE
 *    - Mínimo 14px para texto público
 *    - Máximo 65ch por linha
 *    - Contraste adequado (tratado nos colors)
 */

// ============================================
// 🔤 FONT FAMILIES
// ============================================

export const fontFamily = {
  // Headlines - Space Grotesk
  // Geométrica, moderna, técnica
  heading: [
    'Space Grotesk',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
  ],

  // Body - Inter
  // Otimizada para telas, excelente legibilidade
  body: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
  ],

  // Monospace - para código
  mono: [
    'JetBrains Mono',
    'Fira Code',
    'ui-monospace',
    'SFMono-Regular',
    'monospace',
  ],
} as const;

// ============================================
// 📏 FONT SIZES (Escala Modular)
// ============================================
// Base: 16px | Ratio: ~1.25 (Major Third)

export const fontSize = {
  // Display - para hero sections
  '6xl': '64px',  // 4rem
  '5xl': '56px',  // 3.5rem
  '4xl': '48px',  // 3rem - h1

  // Headlines
  '3xl': '40px',  // 2.5rem
  '2xl': '32px',  // 2rem - h2
  'xl': '24px',   // 1.5rem - h3

  // Body
  'lg': '18px',   // 1.125rem - body-lg
  'base': '16px', // 1rem - body padrão
  'sm': '14px',   // 0.875rem - caption (mínimo acessível!)

  // Tiny - apenas para badges/labels auxiliares
  'xs': '12px',   // 0.75rem - uso restrito!
} as const;

// ============================================
// ⚖️ FONT WEIGHTS
// ============================================

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// ============================================
// 📐 LINE HEIGHTS
// ============================================
// Regra: quanto maior o texto, menor o line-height

export const lineHeight = {
  none: '1',
  tight: '1.2',      // Headlines grandes
  snug: '1.25',      // Headlines médios
  normal: '1.3',     // Headlines pequenos
  relaxed: '1.5',    // Captions, labels
  loose: '1.6',      // Body text - máxima legibilidade
  'extra-loose': '1.75', // Textos longos
} as const;

// ============================================
// 🔡 LETTER SPACING
// ============================================

export const letterSpacing = {
  tighter: '-0.05em',  // Headlines grandes
  tight: '-0.025em',   // Headlines
  normal: '0',         // Body
  wide: '0.025em',     // Captions
  wider: '0.05em',     // Labels, badges
  widest: '0.1em',     // All caps text
} as const;

// ============================================
// 📝 TEXT STYLES (Composições Prontas)
// ============================================
// Use estes presets nos componentes

export const textStyles = {
  // Display - Hero sections
  display: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize['6xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tighter,
  },

  // H1 - Títulos principais
  h1: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize['4xl'],      // 48px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,   // 1.2
    letterSpacing: letterSpacing.tight,
  },

  // H2 - Títulos de seção
  h2: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize['2xl'],      // 32px
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,    // 1.25
    letterSpacing: letterSpacing.tight,
  },

  // H3 - Subtítulos
  h3: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.xl,          // 24px
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,  // 1.3
    letterSpacing: letterSpacing.normal,
  },

  // H4 - Títulos de card/componente
  h4: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.lg,          // 18px
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Body Large - Textos de destaque
  'body-lg': {
    fontFamily: fontFamily.body,
    fontSize: fontSize.lg,          // 18px
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.loose,   // 1.6
    letterSpacing: letterSpacing.normal,
  },

  // Body - Texto padrão
  body: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.base,        // 16px
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.loose,   // 1.6
    letterSpacing: letterSpacing.normal,
  },

  // Caption - Textos auxiliares
  caption: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,          // 14px
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.relaxed, // 1.5
    letterSpacing: letterSpacing.wide,
  },

  // Label - Formulários
  label: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,          // 14px
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.wide,
  },

  // Code - Blocos de código
  code: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  // Overline - Labels superiores
  overline: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.xs,          // 12px
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },
} as const;

// ============================================
// 📏 MEASURE (Largura de Linha)
// ============================================
// Para legibilidade ideal

export const measure = {
  narrow: '45ch',   // Colunas estreitas
  base: '65ch',     // Padrão - legibilidade ideal
  wide: '80ch',     // Conteúdo expandido
} as const;

// ============================================
// 📚 DOCUMENTAÇÃO DE USO
// ============================================
/**
 * QUANDO USAR CADA ESTILO:
 *
 * display    → Hero sections, landing pages
 * h1         → Título principal da página (1 por página)
 * h2         → Seções principais
 * h3         → Subtítulos, cards importantes
 * h4         → Títulos de componentes
 * body-lg    → Introduções, destaques de texto
 * body       → Texto padrão, parágrafos
 * caption    → Textos auxiliares, timestamps
 * label      → Labels de formulário
 * code       → Código inline ou blocos
 * overline   → Categorias, tags superiores
 *
 * REGRAS DE ACESSIBILIDADE:
 *
 * 1. Nunca use menos que 14px para texto público
 * 2. 12px apenas para badges e elementos auxiliares
 * 3. Line-height mínimo de 1.5 para parágrafos
 * 4. Máximo 65ch por linha para conforto
 * 5. Contraste mínimo 4.5:1 (AA) para texto normal
 * 6. Contraste mínimo 3:1 (AA) para texto grande (>18px bold ou >24px)
 *
 * HIERARQUIA VISUAL:
 *
 * Use uma única h1 por página
 * h2-h4 podem se repetir
 * Mantenha no máximo 3 níveis de hierarquia por seção
 */

export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type LetterSpacing = typeof letterSpacing;
export type TextStyles = typeof textStyles;
