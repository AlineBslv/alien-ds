/**
 * ALIEN DESIGN SYSTEM — Motion Tokens
 *
 * Sistema de animação e transições
 * Movimento com propósito, não decorativo
 *
 * CONCEITOS IMPORTANTES:
 *
 * 1. MOTION = FEEDBACK
 *    Animações comunicam estado, não enfeitam
 *    Cada movimento tem razão de existir
 *
 * 2. PERFORMANCE FIRST
 *    Prefira transform e opacity
 *    Evite animar layout properties
 *
 * 3. ACESSIBILIDADE
 *    Respeite prefers-reduced-motion
 *    Forneça alternativas estáticas
 *
 * 4. CONSISTÊNCIA
 *    Mesmas durações e easings em todo sistema
 *    Movimento previsível = UX confiável
 */

// ============================================
// ⏱️ DURATION (Tempo)
// ============================================
// Escala progressiva para diferentes contextos

export const duration = {
  // Instantâneo - feedback imediato
  instant: '0ms',

  // Ultra rápido - micro interações
  fastest: '50ms',

  // Rápido - hovers, focus
  fast: '100ms',

  // Normal - transições padrão
  normal: '150ms',

  // Médio - modais, expansões
  medium: '200ms',

  // Lento - animações de entrada
  slow: '300ms',

  // Muito lento - transições de página
  slower: '400ms',

  // Lentíssimo - animações complexas
  slowest: '500ms',
} as const;

// ============================================
// 📈 EASING (Curvas de Aceleração)
// ============================================
// Baseado em física real para movimento natural

export const easing = {
  // Linear - progresso constante (raro uso)
  linear: 'linear',

  // Ease In - começa devagar, acelera
  // Uso: elementos saindo da tela
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',

  // Ease Out - começa rápido, desacelera
  // Uso: elementos entrando na tela (MAIS COMUM)
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',

  // Ease In Out - simétrico
  // Uso: transformações no lugar
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Spring - efeito de mola
  // Uso: micro interações, feedback tátil
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

  // Bounce - quique suave
  // Uso: notificações, badges
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Sharp - entrada rápida
  // Uso: tooltips, dropdowns
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

  // Smooth - suave natural
  // Uso: scrolls, slides
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

// ============================================
// 🔄 TRANSITIONS (Composições Prontas)
// ============================================
// Use estes presets nos componentes

export const transition = {
  // Sem transição
  none: 'none',

  // Todas as propriedades
  all: {
    fast: `all ${duration.fast} ${easing.easeOut}`,
    normal: `all ${duration.normal} ${easing.easeOut}`,
    slow: `all ${duration.slow} ${easing.easeOut}`,
  },

  // Cores (background, border, text)
  colors: {
    fast: `color ${duration.fast} ${easing.easeOut}, background-color ${duration.fast} ${easing.easeOut}, border-color ${duration.fast} ${easing.easeOut}`,
    normal: `color ${duration.normal} ${easing.easeOut}, background-color ${duration.normal} ${easing.easeOut}, border-color ${duration.normal} ${easing.easeOut}`,
  },

  // Opacidade
  opacity: {
    fast: `opacity ${duration.fast} ${easing.easeOut}`,
    normal: `opacity ${duration.normal} ${easing.easeOut}`,
    slow: `opacity ${duration.slow} ${easing.easeOut}`,
  },

  // Transform (scale, translate, rotate)
  transform: {
    fast: `transform ${duration.fast} ${easing.spring}`,
    normal: `transform ${duration.normal} ${easing.spring}`,
    slow: `transform ${duration.slow} ${easing.easeOut}`,
  },

  // Shadow
  shadow: {
    fast: `box-shadow ${duration.fast} ${easing.easeOut}`,
    normal: `box-shadow ${duration.normal} ${easing.easeOut}`,
  },

  // Width/Height (usar com cautela - reflow!)
  size: {
    normal: `width ${duration.medium} ${easing.easeOut}, height ${duration.medium} ${easing.easeOut}`,
    slow: `width ${duration.slow} ${easing.easeOut}, height ${duration.slow} ${easing.easeOut}`,
  },
} as const;

// ============================================
// 🎬 ANIMATION PRESETS
// ============================================
// Keyframes prontos para uso

export const animation = {
  // Fade In
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: duration.slow,
    easing: easing.easeOut,
  },

  // Fade Out
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
    duration: duration.normal,
    easing: easing.easeIn,
  },

  // Scale In (zoom)
  scaleIn: {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
    duration: duration.medium,
    easing: easing.spring,
  },

  // Scale Out
  scaleOut: {
    from: { opacity: 1, transform: 'scale(1)' },
    to: { opacity: 0, transform: 'scale(0.95)' },
    duration: duration.fast,
    easing: easing.easeIn,
  },

  // Slide In (de baixo)
  slideInUp: {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    duration: duration.slow,
    easing: easing.easeOut,
  },

  // Slide In (da direita)
  slideInRight: {
    from: { opacity: 0, transform: 'translateX(10px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    duration: duration.slow,
    easing: easing.easeOut,
  },

  // Slide Out (para baixo)
  slideOutDown: {
    from: { opacity: 1, transform: 'translateY(0)' },
    to: { opacity: 0, transform: 'translateY(10px)' },
    duration: duration.normal,
    easing: easing.easeIn,
  },

  // Shake (erro)
  shake: {
    keyframes: [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(4px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(4px)' },
      { transform: 'translateX(0)' },
    ],
    duration: duration.slow,
    easing: easing.easeInOut,
  },

  // Pulse (atenção)
  pulse: {
    keyframes: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' },
    ],
    duration: duration.slow,
    easing: easing.easeInOut,
  },

  // Spin (loading)
  spin: {
    keyframes: [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' },
    ],
    duration: '1000ms',
    easing: easing.linear,
    iterationCount: 'infinite',
  },

  // Bounce (notificação)
  bounce: {
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-6px)' },
      { transform: 'translateY(0)' },
    ],
    duration: duration.medium,
    easing: easing.bounce,
  },
} as const;

// ============================================
// 🧩 COMPONENT MOTION
// ============================================
// Motion específico para componentes

export const componentMotion = {
  // Botão
  button: {
    hover: {
      transition: transition.colors.fast,
      transform: 'translateY(-1px)',
    },
    active: {
      transition: transition.transform.fast,
      transform: 'translateY(0) scale(0.98)',
    },
    focus: {
      transition: transition.shadow.fast,
    },
  },

  // Link
  link: {
    hover: {
      transition: transition.colors.fast,
    },
  },

  // Card
  card: {
    hover: {
      transition: `${transition.shadow.normal}, ${transition.transform.normal}`,
      transform: 'translateY(-2px)',
    },
  },

  // Input
  input: {
    focus: {
      transition: `${transition.colors.normal}, ${transition.shadow.normal}`,
    },
  },

  // Modal
  modal: {
    enter: animation.scaleIn,
    exit: animation.scaleOut,
    overlay: {
      enter: animation.fadeIn,
      exit: animation.fadeOut,
    },
  },

  // Dropdown
  dropdown: {
    enter: animation.slideInUp,
    exit: animation.fadeOut,
  },

  // Toast
  toast: {
    enter: animation.slideInRight,
    exit: animation.slideOutDown,
  },

  // Tooltip
  tooltip: {
    enter: {
      ...animation.fadeIn,
      duration: duration.fast,
    },
    exit: {
      ...animation.fadeOut,
      duration: duration.fastest,
    },
  },

  // Sidebar
  sidebar: {
    enter: {
      from: { transform: 'translateX(-100%)' },
      to: { transform: 'translateX(0)' },
      duration: duration.slow,
      easing: easing.easeOut,
    },
    exit: {
      from: { transform: 'translateX(0)' },
      to: { transform: 'translateX(-100%)' },
      duration: duration.normal,
      easing: easing.easeIn,
    },
  },

  // Accordion
  accordion: {
    expand: {
      transition: transition.size.normal,
    },
    collapse: {
      transition: transition.size.normal,
    },
  },

  // Skeleton loading
  skeleton: {
    pulse: {
      keyframes: [
        { opacity: 1 },
        { opacity: 0.5 },
        { opacity: 1 },
      ],
      duration: '1500ms',
      easing: easing.easeInOut,
      iterationCount: 'infinite',
    },
  },
} as const;

// ============================================
// ♿ REDUCED MOTION
// ============================================
// Alternativas para prefers-reduced-motion

export const reducedMotion = {
  // Substitui todas as animações por fade simples
  transition: `opacity ${duration.fast} ${easing.linear}`,

  // Ou remove completamente
  none: 'none',

  // CSS media query helper
  mediaQuery: '@media (prefers-reduced-motion: reduce)',
} as const;

// ============================================
// 📚 DOCUMENTAÇÃO DE USO
// ============================================
/**
 * PRINCÍPIOS DE MOTION:
 *
 * 1. PROPÓSITO
 *    - Feedback: confirmar ações do usuário
 *    - Orientação: indicar mudanças de estado
 *    - Hierarquia: destacar elementos importantes
 *    - Continuidade: conectar estados diferentes
 *
 * 2. DURAÇÕES RECOMENDADAS
 *    - Micro interações: 50-150ms
 *    - Transições simples: 150-300ms
 *    - Animações complexas: 300-500ms
 *    - Nunca mais que 500ms para UI
 *
 * 3. EASING GUIDELINES
 *    - Elementos entrando: ease-out (desacelera)
 *    - Elementos saindo: ease-in (acelera)
 *    - Elementos no lugar: ease-in-out
 *    - Micro feedback: spring (quique)
 *
 * 4. PERFORMANCE
 *    - SEMPRE prefira: transform, opacity
 *    - EVITE: width, height, top, left, margin
 *    - Use will-change com moderação
 *    - Teste em dispositivos low-end
 *
 * 5. ACESSIBILIDADE
 *    - Implemente prefers-reduced-motion
 *    - Não dependa apenas de animação para info
 *    - Evite flashing (pode causar convulsões)
 *    - Cuidado com movimento paralaxe
 *
 * EXEMPLO DE USO:
 *
 * // No componente
 * const buttonStyles = {
 *   transition: componentMotion.button.hover.transition,
 *   '&:hover': {
 *     transform: componentMotion.button.hover.transform,
 *   }
 * };
 *
 * // Com reduced motion
 * '@media (prefers-reduced-motion: reduce)': {
 *   transition: reducedMotion.transition,
 * }
 */

export type Duration = typeof duration;
export type Easing = typeof easing;
export type Transition = typeof transition;
export type Animation = typeof animation;
export type ComponentMotion = typeof componentMotion;
