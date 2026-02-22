/**
 * ALIEN DESIGN SYSTEM — Elevation Tokens
 *
 * Sistema de elevação: shadows, radius, blur e z-index
 * Cria profundidade e hierarquia visual
 *
 * CONCEITOS IMPORTANTES:
 *
 * 1. ELEVAÇÃO ≠ DECORAÇÃO
 *    Shadows indicam hierarquia e interatividade
 *    Não use apenas por estética
 *
 * 2. CONSISTÊNCIA DE RADIUS
 *    Mesmo radius em todo o sistema = harmonia
 *    Exceções devem ser justificadas
 *
 * 3. Z-INDEX CONTROLADO
 *    Escala definida evita "z-index: 9999"
 *    Cada camada tem propósito
 */

// ============================================
// 🌫️ SHADOWS (Elevação Visual)
// ============================================

export const shadow = {
  // Sem sombra
  none: 'none',

  // Sombra sutil - hover states, separação leve
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  // Sombra padrão - cards, dropdowns
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',

  // Sombra elevada - modais, popovers
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',

  // Sombra alta - elementos flutuantes
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

  // Sombra máxima - overlays importantes
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Inner shadow - inputs focus, pressed states
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
} as const;

// ============================================
// 🎨 SHADOWS COM COR (Accent Glow)
// ============================================
// Para CTAs e elementos especiais

export const glowShadow = {
  // Glow do Accent (Ciano)
  accent: {
    sm: '0 0 10px rgba(58, 242, 215, 0.2)',
    md: '0 0 20px rgba(58, 242, 215, 0.3)',
    lg: '0 0 30px rgba(58, 242, 215, 0.4)',
  },

  // Glow do Aurora (Roxo)
  aurora: {
    sm: '0 0 10px rgba(107, 76, 246, 0.2)',
    md: '0 0 20px rgba(107, 76, 246, 0.3)',
    lg: '0 0 30px rgba(107, 76, 246, 0.4)',
  },

  // Glow de erro
  error: {
    sm: '0 0 10px rgba(239, 68, 68, 0.2)',
    md: '0 0 20px rgba(239, 68, 68, 0.3)',
  },

  // Glow de sucesso
  success: {
    sm: '0 0 10px rgba(34, 197, 94, 0.2)',
    md: '0 0 20px rgba(34, 197, 94, 0.3)',
  },
} as const;

// ============================================
// 🔲 BORDER RADIUS
// ============================================
// Conforme Brand Guide: sm / md / lg / full

export const radius = {
  none: '0',
  sm: '4px',     // Badges, chips pequenos
  md: '8px',     // Inputs, botões pequenos
  lg: '12px',    // Cards, botões grandes (padrão do brand)
  xl: '16px',    // Modais, containers
  '2xl': '24px', // Cards especiais
  '3xl': '32px', // Elementos hero
  full: '9999px', // Pills, avatares circulares
} as const;

// ============================================
// 🌊 BLUR (Para Glassmorphism Controlado)
// ============================================
// IMPORTANTE: Use com moderação!
// Apenas para hero ou seções especiais
// NUNCA para formulários ou tabelas

export const blur = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '40px',
} as const;

// ============================================
// 📊 Z-INDEX SCALE
// ============================================
// Escala controlada para evitar conflitos

export const zIndex = {
  // Abaixo do conteúdo
  behind: -1,

  // Base - conteúdo normal
  base: 0,

  // Acima do conteúdo - elementos levemente elevados
  raised: 10,

  // Dropdowns, tooltips
  dropdown: 100,

  // Navbar fixa
  sticky: 200,

  // Navbar com mais prioridade
  navbar: 300,

  // Overlays de fundo
  overlay: 400,

  // Modais
  modal: 500,

  // Popovers sobre modais
  popover: 600,

  // Toasts, notificações
  toast: 700,

  // Tooltips (sempre no topo)
  tooltip: 800,

  // Máximo - usar com cautela
  max: 9999,
} as const;

// ============================================
// 🧩 COMPONENT ELEVATION
// ============================================
// Presets para componentes específicos

export const componentElevation = {
  // Card padrão
  card: {
    default: {
      shadow: shadow.none,
      radius: radius.lg,
    },
    elevated: {
      shadow: shadow.md,
      radius: radius.lg,
    },
    hover: {
      shadow: shadow.lg,
      radius: radius.lg,
    },
  },

  // Botões
  button: {
    default: {
      shadow: shadow.none,
      radius: radius.lg,
    },
    elevated: {
      shadow: shadow.sm,
      radius: radius.lg,
    },
    glow: {
      shadow: glowShadow.accent.sm,
      radius: radius.lg,
    },
  },

  // Input
  input: {
    default: {
      shadow: shadow.none,
      radius: radius.md,
    },
    focus: {
      shadow: glowShadow.accent.sm,
      radius: radius.md,
    },
    error: {
      shadow: glowShadow.error.sm,
      radius: radius.md,
    },
  },

  // Modal
  modal: {
    shadow: shadow.xl,
    radius: radius.xl,
    zIndex: zIndex.modal,
  },

  // Dropdown
  dropdown: {
    shadow: shadow.lg,
    radius: radius.lg,
    zIndex: zIndex.dropdown,
  },

  // Toast
  toast: {
    shadow: shadow.lg,
    radius: radius.lg,
    zIndex: zIndex.toast,
  },

  // Tooltip
  tooltip: {
    shadow: shadow.md,
    radius: radius.md,
    zIndex: zIndex.tooltip,
  },

  // Navbar
  navbar: {
    shadow: shadow.sm,
    zIndex: zIndex.navbar,
  },

  // Sidebar
  sidebar: {
    shadow: shadow.lg,
    zIndex: zIndex.sticky,
  },

  // Badge
  badge: {
    shadow: shadow.none,
    radius: radius.full,
  },

  // Avatar
  avatar: {
    shadow: shadow.sm,
    radius: radius.full,
  },
} as const;

// ============================================
// 🎭 GLASSMORPHISM PRESETS
// ============================================
// ATENÇÃO: Usar apenas em:
// - Hero sections
// - Backgrounds decorativos
// NUNCA em:
// - Formulários
// - Tabelas
// - Áreas de leitura extensa

export const glassmorphism = {
  // Leve - para sutileza
  light: {
    background: 'rgba(10, 31, 68, 0.7)',
    blur: blur.md,
    border: '1px solid rgba(58, 242, 215, 0.1)',
  },

  // Médio - para cards especiais
  medium: {
    background: 'rgba(10, 31, 68, 0.8)',
    blur: blur.lg,
    border: '1px solid rgba(58, 242, 215, 0.15)',
  },

  // Forte - para hero sections
  strong: {
    background: 'rgba(10, 31, 68, 0.9)',
    blur: blur.xl,
    border: '1px solid rgba(58, 242, 215, 0.2)',
  },
} as const;

// ============================================
// 📚 DOCUMENTAÇÃO DE USO
// ============================================
/**
 * HIERARQUIA DE ELEVAÇÃO:
 *
 * Nível 0 (base)     → Conteúdo normal, sem sombra
 * Nível 1 (raised)   → Cards, seções destacadas
 * Nível 2 (floating) → Dropdowns, popovers
 * Nível 3 (overlay)  → Modais, dialogs
 * Nível 4 (toast)    → Notificações, toasts
 *
 * QUANDO USAR SHADOWS:
 *
 * - none: Elementos inline, texto, ícones
 * - sm: Hover states, separação sutil
 * - md: Cards, containers
 * - lg: Dropdowns, modais pequenos
 * - xl: Modais grandes, overlays
 *
 * QUANDO USAR GLOW:
 *
 * - CTAs importantes (botões primários)
 * - Focus states
 * - Elementos interativos destacados
 * - NUNCA em todos os elementos simultaneamente
 *
 * RADIUS CONSISTENCY:
 *
 * - Inputs: md (8px)
 * - Cards: lg (12px)
 * - Modais: xl (16px)
 * - Badges/Pills: full
 *
 * GLASSMORPHISM WARNING:
 *
 * ⚠️ Reduz contraste e legibilidade
 * ⚠️ Impacta performance em mobile
 * ⚠️ Problemas de acessibilidade
 *
 * Use apenas decorativamente, nunca funcionalmente.
 */

export type Shadow = typeof shadow;
export type GlowShadow = typeof glowShadow;
export type Radius = typeof radius;
export type Blur = typeof blur;
export type ZIndex = typeof zIndex;
export type ComponentElevation = typeof componentElevation;
