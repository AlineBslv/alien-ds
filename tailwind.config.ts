/**
 * ALIEN DESIGN SYSTEM — Tailwind Configuration
 *
 * Este arquivo mapeia todos os Design Tokens para classes Tailwind
 * Mantém sincronia entre tokens TypeScript e classes utilitárias
 *
 * IMPORTANTE:
 * - Nunca hardcode valores aqui
 * - Sempre importe dos tokens
 * - Mantenha nomenclatura consistente
 */

import type { Config } from 'tailwindcss';
import { primitiveColors, semanticColors, componentColors } from './tokens/colors';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './tokens/typography';
import { spacing, layout } from './tokens/spacing';
import { shadow, radius, blur, zIndex } from './tokens/elevation';
import { duration, easing } from './tokens/motion';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './foundations/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Dark mode via classe (permite toggle manual)
  darkMode: 'class',

  theme: {
    // ============================================
    // CORES
    // ============================================
    colors: {
      // Primitivas (para uso em casos específicos)
      primary: primitiveColors.primary,
      accent: primitiveColors.accent,
      aurora: primitiveColors.aurora,
      neutral: primitiveColors.neutral,

      // Base colors
      white: primitiveColors.white,
      black: primitiveColors.black,
      transparent: primitiveColors.transparent,

      // Semânticas (use estas preferencialmente)
      background: semanticColors.background,
      foreground: semanticColors.foreground,
      interactive: semanticColors.interactive,
      border: semanticColors.border,
      status: semanticColors.status,
      overlay: semanticColors.overlay,

      // Component-specific (para componentes)
      button: componentColors.button,
      input: componentColors.input,
      card: componentColors.card,
      icon: componentColors.icon,
      badge: componentColors.badge,
    },

    // ============================================
    // TIPOGRAFIA
    // ============================================
    fontFamily: {
      heading: fontFamily.heading,
      body: fontFamily.body,
      mono: fontFamily.mono,
    },

    fontSize: {
      xs: fontSize.xs,
      sm: fontSize.sm,
      base: fontSize.base,
      lg: fontSize.lg,
      xl: fontSize.xl,
      '2xl': fontSize['2xl'],
      '3xl': fontSize['3xl'],
      '4xl': fontSize['4xl'],
      '5xl': fontSize['5xl'],
      '6xl': fontSize['6xl'],
    },

    fontWeight: {
      regular: fontWeight.regular,
      medium: fontWeight.medium,
      semibold: fontWeight.semibold,
      bold: fontWeight.bold,
    },

    lineHeight: {
      none: lineHeight.none,
      tight: lineHeight.tight,
      snug: lineHeight.snug,
      normal: lineHeight.normal,
      relaxed: lineHeight.relaxed,
      loose: lineHeight.loose,
    },

    letterSpacing: {
      tighter: letterSpacing.tighter,
      tight: letterSpacing.tight,
      normal: letterSpacing.normal,
      wide: letterSpacing.wide,
      wider: letterSpacing.wider,
      widest: letterSpacing.widest,
    },

    // ============================================
    // ESPAÇAMENTO
    // ============================================
    spacing: {
      px: spacing.px,
      0: spacing[0],
      0.5: spacing[0.5],
      1: spacing[1],
      2: spacing[2],
      3: spacing[3],
      4: spacing[4],
      5: spacing[5],
      6: spacing[6],
      7: spacing[7],
      8: spacing[8],
      10: spacing[10],
      12: spacing[12],
      14: spacing[14],
      16: spacing[16],
      20: spacing[20],
      24: spacing[24],
      28: spacing[28],
      32: spacing[32],
      36: spacing[36],
      40: spacing[40],
      44: spacing[44],
      48: spacing[48],
      52: spacing[52],
      56: spacing[56],
      60: spacing[60],
      64: spacing[64],
      72: spacing[72],
      80: spacing[80],
      96: spacing[96],
    },

    // ============================================
    // LAYOUT
    // ============================================
    maxWidth: {
      xs: layout.maxWidth.xs,
      sm: layout.maxWidth.sm,
      md: layout.maxWidth.md,
      lg: layout.maxWidth.lg,
      xl: layout.maxWidth.xl,
      '2xl': layout.maxWidth['2xl'],
      '3xl': layout.maxWidth['3xl'],
      full: layout.maxWidth.full,
      prose: '65ch', // Largura ideal para leitura
    },

    // ============================================
    // ELEVAÇÃO
    // ============================================
    boxShadow: {
      none: shadow.none,
      sm: shadow.sm,
      DEFAULT: shadow.md,
      md: shadow.md,
      lg: shadow.lg,
      xl: shadow.xl,
      '2xl': shadow['2xl'],
      inner: shadow.inner,

      // Glow shadows
      'glow-accent-sm': '0 0 10px rgba(58, 242, 215, 0.2)',
      'glow-accent-md': '0 0 20px rgba(58, 242, 215, 0.3)',
      'glow-accent-lg': '0 0 30px rgba(58, 242, 215, 0.4)',
      'glow-aurora-sm': '0 0 10px rgba(107, 76, 246, 0.2)',
      'glow-aurora-md': '0 0 20px rgba(107, 76, 246, 0.3)',
      'glow-error': '0 0 10px rgba(239, 68, 68, 0.2)',
      'glow-success': '0 0 10px rgba(34, 197, 94, 0.2)',
    },

    borderRadius: {
      none: radius.none,
      sm: radius.sm,
      DEFAULT: radius.md,
      md: radius.md,
      lg: radius.lg,
      xl: radius.xl,
      '2xl': radius['2xl'],
      '3xl': radius['3xl'],
      full: radius.full,
    },

    blur: {
      none: blur.none,
      sm: blur.sm,
      DEFAULT: blur.md,
      md: blur.md,
      lg: blur.lg,
      xl: blur.xl,
      '2xl': blur['2xl'],
      '3xl': blur['3xl'],
    },

    zIndex: {
      behind: String(zIndex.behind),
      base: String(zIndex.base),
      raised: String(zIndex.raised),
      dropdown: String(zIndex.dropdown),
      sticky: String(zIndex.sticky),
      navbar: String(zIndex.navbar),
      overlay: String(zIndex.overlay),
      modal: String(zIndex.modal),
      popover: String(zIndex.popover),
      toast: String(zIndex.toast),
      tooltip: String(zIndex.tooltip),
      max: String(zIndex.max),
    },

    // ============================================
    // MOTION
    // ============================================
    transitionDuration: {
      0: '0ms',
      75: '75ms',
      100: duration.fast,
      150: duration.normal,
      200: duration.medium,
      300: duration.slow,
      400: duration.slower,
      500: duration.slowest,
      700: '700ms',
      1000: '1000ms',
    },

    transitionTimingFunction: {
      linear: easing.linear,
      in: easing.easeIn,
      out: easing.easeOut,
      'in-out': easing.easeInOut,
      spring: easing.spring,
      bounce: easing.bounce,
      sharp: easing.sharp,
      smooth: easing.smooth,
    },

    // ============================================
    // EXTENSÕES
    // ============================================
    extend: {
      // Animações customizadas
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'fade-out': 'fadeOut 150ms ease-in',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'scale-out': 'scaleOut 100ms ease-in',
        'slide-in-up': 'slideInUp 300ms ease-out',
        'slide-in-right': 'slideInRight 300ms ease-out',
        'slide-out-down': 'slideOutDown 150ms ease-in',
        'shake': 'shake 300ms ease-in-out',
        'pulse-soft': 'pulseSoft 300ms ease-in-out',
        'spin': 'spin 1s linear infinite',
        'bounce-soft': 'bounceSoft 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOutDown: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        skeleton: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },

      // Typography plugin classes
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: primitiveColors.neutral[100],
            fontFamily: fontFamily.body.join(', '),
            lineHeight: lineHeight.loose,
          },
        },
      },
    },
  },

  plugins: [
    // Plugin para variantes de acessibilidade
    function({ addVariant }: { addVariant: (name: string, css: string) => void }) {
      addVariant('reduced-motion', '@media (prefers-reduced-motion: reduce)');
      addVariant('high-contrast', '@media (prefers-contrast: more)');
    },
  ],
};

export default config;
