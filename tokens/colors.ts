/**
 * ALIEN DESIGN SYSTEM — Color Tokens
 *
 * Estrutura de cores baseada no Brand Guide de Aline Barbosa
 * Arquitetura: Primitivos → Semânticos → Componentes
 *
 * CONCEITO IMPORTANTE:
 * - Primitivos: valores raw (hex) - nunca use diretamente em componentes
 * - Semânticos: intenção de uso - use estes nos componentes
 * - Componentes: tokens específicos para elementos de UI
 */

// ============================================
// 🎨 PRIMITIVE TOKENS (Valores Base)
// ============================================
// Estes são os valores "crus" - a paleta completa
// Nunca referencie diretamente em componentes

export const primitiveColors = {
  // Primary Scale - Azuis Profundos (Identidade Principal)
  primary: {
    900: '#0A1F44', // Azul Eclipse - backgrounds principais
    800: '#0C2550',
    700: '#0F2C5C', // Azul Profundo - seções secundárias
    600: '#103365',
    500: '#123A6F', // Azul Estruturado - cards, blocos
    400: '#1A4A8A',
    300: '#2563A8',
    200: '#4A8BC7',
    100: '#7FB3E0',
    50: '#E8F2FC',
  },

  // Accent Scale - Ciano Futurista (CTAs e Destaques)
  accent: {
    900: '#0A5C52',
    800: '#0F7A6E',
    700: '#19C7B0', // Ciano Profundo - hover/ativo
    600: '#26DCC5',
    500: '#3AF2D7', // Ciano Futuro - CTA principal
    400: '#5FF5E0',
    300: '#85F8E8',
    200: '#ADF9EF',
    100: '#D6FCF6',
    50: '#EDFDFB',
  },

  // Aurora Scale - Roxo (Destaque Secundário)
  aurora: {
    900: '#2E1B6B',
    800: '#3D2587',
    700: '#4C30A3',
    600: '#5C3DC0',
    500: '#6B4CF6', // Roxo Aurora - destaque secundário
    400: '#8570F8',
    300: '#A094FA',
    200: '#BBB8FC',
    100: '#D7D5FD',
    50: '#F3F2FE',
  },

  // Neutral Scale - Cinzas Técnicos
  neutral: {
    900: '#1A1A1A', // Obsidian - fundo escuro alternativo
    800: '#2D2D2D',
    700: '#6E7A88', // Cinza Estrutural - ícones/bordas
    600: '#8E99A5', // Cinza Técnico - texto secundário
    500: '#A0A9B4',
    400: '#B3BBC4',
    300: '#C7CDD4',
    200: '#DBE0E5',
    100: '#F5F7FA', // Branco Luminoso - texto em dark
    50: '#FAFBFC',
  },

  // Base Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// ============================================
// 🎯 SEMANTIC TOKENS (Intenção de Uso)
// ============================================
// Estes definem O QUE a cor significa, não COMO ela se parece
// Use estes nos componentes

export const semanticColors = {
  // Backgrounds
  background: {
    primary: primitiveColors.primary[900],    // Fundo principal (hero, main)
    secondary: primitiveColors.primary[700],  // Fundo secundário (seções)
    tertiary: primitiveColors.primary[500],   // Cards, blocos
    elevated: primitiveColors.neutral[900],   // Elementos elevados
    inverse: primitiveColors.neutral[100],    // Fundo claro (light mode)
  },

  // Foreground (Texto)
  foreground: {
    primary: primitiveColors.neutral[100],    // Texto principal em dark
    secondary: primitiveColors.neutral[600],  // Texto secundário
    muted: primitiveColors.neutral[700],      // Texto sutil
    inverse: primitiveColors.primary[900],    // Texto em fundo claro
    accent: primitiveColors.accent[500],      // Texto destaque
  },

  // Interactive (Elementos Interativos)
  interactive: {
    primary: primitiveColors.accent[500],     // CTA principal
    primaryHover: primitiveColors.accent[700],
    primaryActive: primitiveColors.accent[800],
    secondary: primitiveColors.aurora[500],   // Destaque secundário
    secondaryHover: primitiveColors.aurora[600],
  },

  // Border
  border: {
    default: primitiveColors.neutral[700],
    subtle: `${primitiveColors.neutral[700]}40`, // 25% opacity
    accent: primitiveColors.accent[500],
    focus: primitiveColors.accent[500],
  },

  // Status (Feedback do Sistema)
  status: {
    success: '#22C55E',
    successBackground: '#22C55E1A',
    warning: '#F59E0B',
    warningBackground: '#F59E0B1A',
    error: '#EF4444',
    errorBackground: '#EF44441A',
    info: primitiveColors.accent[500],
    infoBackground: `${primitiveColors.accent[500]}1A`,
  },

  // Overlay
  overlay: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.10)',
    dark: 'rgba(0, 0, 0, 0.50)',
    backdrop: 'rgba(10, 31, 68, 0.80)',
  },
} as const;

// ============================================
// 🧩 COMPONENT TOKENS (Específicos de UI)
// ============================================
// Tokens para componentes específicos
// Garante consistência e facilita manutenção

export const componentColors = {
  button: {
    primary: {
      background: primitiveColors.accent[500],
      foreground: primitiveColors.primary[900], // Contraste forte!
      hover: primitiveColors.accent[700],
      active: primitiveColors.accent[800],
      disabled: primitiveColors.neutral[700],
      disabledForeground: `${primitiveColors.neutral[100]}66`,
    },
    secondary: {
      background: 'transparent',
      foreground: primitiveColors.accent[500],
      border: primitiveColors.accent[500],
      hover: `${primitiveColors.accent[500]}1A`, // 10% opacity
      active: `${primitiveColors.accent[500]}26`, // 15% opacity
    },
    ghost: {
      background: 'transparent',
      foreground: primitiveColors.neutral[100],
      hover: primitiveColors.overlay.light,
      active: primitiveColors.overlay.medium,
    },
  },

  input: {
    background: primitiveColors.primary[700],
    foreground: primitiveColors.neutral[100],
    placeholder: primitiveColors.neutral[600],
    border: primitiveColors.neutral[700],
    borderFocus: primitiveColors.accent[500],
    borderError: semanticColors.status.error,
  },

  card: {
    background: primitiveColors.primary[900],
    backgroundElevated: primitiveColors.primary[700],
    border: `${primitiveColors.accent[500]}40`,
    borderHover: primitiveColors.accent[500],
  },

  icon: {
    default: primitiveColors.neutral[700],
    hover: primitiveColors.accent[500],
    active: primitiveColors.accent[500],
    critical: primitiveColors.aurora[500],
  },

  badge: {
    primary: {
      background: `${primitiveColors.accent[500]}1A`,
      foreground: primitiveColors.accent[500],
    },
    secondary: {
      background: `${primitiveColors.aurora[500]}1A`,
      foreground: primitiveColors.aurora[500],
    },
    neutral: {
      background: `${primitiveColors.neutral[600]}1A`,
      foreground: primitiveColors.neutral[600],
    },
  },
} as const;

// ============================================
// 📚 DOCUMENTAÇÃO DE USO
// ============================================
/**
 * HIERARQUIA DE TOKENS:
 *
 * 1. PRIMITIVOS (primitiveColors)
 *    - Valores hex puros
 *    - Nunca use diretamente em componentes
 *    - Use para definir semânticos e componentes
 *
 * 2. SEMÂNTICOS (semanticColors)
 *    - Definem intenção (background, foreground, etc)
 *    - Use em layouts e contextos gerais
 *    - Facilitam dark/light mode
 *
 * 3. COMPONENTES (componentColors)
 *    - Específicos para elementos de UI
 *    - Garantem consistência entre componentes
 *    - Facilitam manutenção
 *
 * EXEMPLO DE USO:
 *
 * ❌ ERRADO:
 * <button style={{ background: '#3AF2D7' }}>
 *
 * ❌ AINDA ERRADO:
 * <button style={{ background: primitiveColors.accent[500] }}>
 *
 * ✅ CORRETO:
 * <button className="bg-button-primary">
 * (referencia componentColors.button.primary.background)
 *
 * REGRA DE PROPORÇÃO 60-30-10:
 * - 60% Primary/Neutral (backgrounds, textos)
 * - 30% Secondary (seções, cards)
 * - 10% Accent (CTAs, microinterações)
 */

export type PrimitiveColors = typeof primitiveColors;
export type SemanticColors = typeof semanticColors;
export type ComponentColors = typeof componentColors;
