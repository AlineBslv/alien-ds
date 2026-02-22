/**
 * ALIEN DESIGN SYSTEM — Token Index
 *
 * Ponto de entrada único para todos os Design Tokens
 * Importa tudo daqui para garantir consistência
 *
 * ESTRUTURA DE TOKENS:
 *
 * ┌─────────────────────────────────────────────┐
 * │                 PRIMITIVOS                  │
 * │     (valores raw - nunca use direto)        │
 * └─────────────────────────────────────────────┘
 *                      ▼
 * ┌─────────────────────────────────────────────┐
 * │                 SEMÂNTICOS                  │
 * │        (intenção - use em layouts)          │
 * └─────────────────────────────────────────────┘
 *                      ▼
 * ┌─────────────────────────────────────────────┐
 * │               COMPONENTES                   │
 * │      (específicos - use em components)      │
 * └─────────────────────────────────────────────┘
 */

// ============================================
// 🎨 COLORS
// ============================================
export {
  primitiveColors,
  semanticColors,
  componentColors,
  type PrimitiveColors,
  type SemanticColors,
  type ComponentColors,
} from './colors';

// ============================================
// 🔤 TYPOGRAPHY
// ============================================
export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
  measure,
  type FontFamily,
  type FontSize,
  type FontWeight,
  type LineHeight,
  type LetterSpacing,
  type TextStyles,
} from './typography';

// ============================================
// 📏 SPACING
// ============================================
export {
  spacing,
  semanticSpacing,
  componentSpacing,
  layout,
  type Spacing,
  type SemanticSpacing,
  type ComponentSpacing,
  type Layout,
} from './spacing';

// ============================================
// 🌫️ ELEVATION
// ============================================
export {
  shadow,
  glowShadow,
  radius,
  blur,
  zIndex,
  componentElevation,
  glassmorphism,
  type Shadow,
  type GlowShadow,
  type Radius,
  type Blur,
  type ZIndex,
  type ComponentElevation,
} from './elevation';

// ============================================
// ⚡ MOTION
// ============================================
export {
  duration,
  easing,
  transition,
  animation,
  componentMotion,
  reducedMotion,
  type Duration,
  type Easing,
  type Transition,
  type Animation,
  type ComponentMotion,
} from './motion';

// ============================================
// 📦 TOKENS OBJECT (All-in-one)
// ============================================
// Para uso em configurações (tailwind, etc)

import { primitiveColors, semanticColors, componentColors } from './colors';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textStyles, measure } from './typography';
import { spacing, semanticSpacing, componentSpacing, layout } from './spacing';
import { shadow, glowShadow, radius, blur, zIndex, componentElevation, glassmorphism } from './elevation';
import { duration, easing, transition, animation, componentMotion, reducedMotion } from './motion';

export const tokens = {
  colors: {
    primitive: primitiveColors,
    semantic: semanticColors,
    component: componentColors,
  },
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textStyles,
    measure,
  },
  spacing: {
    scale: spacing,
    semantic: semanticSpacing,
    component: componentSpacing,
    layout,
  },
  elevation: {
    shadow,
    glowShadow,
    radius,
    blur,
    zIndex,
    component: componentElevation,
    glassmorphism,
  },
  motion: {
    duration,
    easing,
    transition,
    animation,
    component: componentMotion,
    reducedMotion,
  },
} as const;

export type Tokens = typeof tokens;
