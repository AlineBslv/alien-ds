/**
 * ALIEN DESIGN SYSTEM — Button Component
 *
 * Átomo fundamental do sistema
 *
 * LIÇÕES DESTE COMPONENTE:
 *
 * 1. API DE COMPONENTE
 *    - Props bem tipadas definem o "contrato"
 *    - Variantes expõem intenções, não implementação
 *    - Defaults sensíveis reduzem código
 *
 * 2. ESTADOS COMPLETOS
 *    - Default, Hover, Focus, Active, Disabled, Loading
 *    - Cada estado tem propósito de feedback
 *
 * 3. ACESSIBILIDADE
 *    - Focus visible para navegação por teclado
 *    - aria-disabled ao invés de disabled quando possível
 *    - aria-busy para estado de loading
 *
 * 4. COMPOSIÇÃO
 *    - Slot pattern permite customização
 *    - Children como slot principal
 *    - leftIcon/rightIcon como slots auxiliares
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ============================================
// VARIANTES DO BOTÃO (usando CVA)
// ============================================
/**
 * CVA (Class Variance Authority) permite:
 * - Definir variantes de forma declarativa
 * - Gerar classes baseadas em props
 * - Type safety automático
 * - Combinação de variantes
 */

const buttonVariants = cva(
  // Base styles - aplicados a todas as variantes
  [
    // Layout
    'inline-flex items-center justify-center gap-2',
    // Typography
    'font-medium',
    // Shape
    'rounded-lg',
    // Transition
    'transition-all duration-150 ease-out',
    // Focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary',
    // Disabled
    'disabled:pointer-events-none disabled:opacity-50',
    // Active
    'active:scale-[0.98]',
  ],
  {
    variants: {
      // ----------------------------------------
      // VARIANT - Define a aparência visual
      // ----------------------------------------
      variant: {
        // Primary - CTA principal
        // Background accent com texto escuro para contraste
        primary: [
          'bg-accent-500 text-primary-900',
          'hover:bg-accent-700',
          'active:bg-accent-800',
        ],

        // Secondary - Ação secundária
        // Outlined com hover sutil
        secondary: [
          'border-2 border-accent-500 text-accent-500 bg-transparent',
          'hover:bg-accent-500/10',
          'active:bg-accent-500/15',
        ],

        // Ghost - Ação terciária
        // Sem background, apenas texto
        ghost: [
          'text-neutral-100 bg-transparent',
          'hover:bg-white/5',
          'active:bg-white/10',
        ],

        // Danger - Ação destrutiva
        // Vermelho para indicar cautela
        danger: [
          'bg-status-error text-white',
          'hover:bg-red-600',
          'active:bg-red-700',
        ],

        // Link - Parece um link
        // Sem padding, underline no hover
        link: [
          'text-accent-500 underline-offset-4',
          'hover:underline',
          'p-0 h-auto',
        ],
      },

      // ----------------------------------------
      // SIZE - Define o tamanho
      // ----------------------------------------
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10 p-0', // Para botões apenas com ícone
      },

      // ----------------------------------------
      // FULL WIDTH - Ocupa toda largura
      // ----------------------------------------
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },

    // Valores padrão
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// ============================================
// TIPOS
// ============================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Se true, renderiza como filho (útil para Next.js Link)
   * @example
   * <Button asChild>
   *   <Link href="/about">About</Link>
   * </Button>
   */
  asChild?: boolean;

  /**
   * Ícone à esquerda do texto
   */
  leftIcon?: React.ReactNode;

  /**
   * Ícone à direita do texto
   */
  rightIcon?: React.ReactNode;

  /**
   * Estado de carregamento
   * Desabilita o botão e mostra spinner
   */
  loading?: boolean;

  /**
   * Texto exibido durante loading
   * @default "Carregando..."
   */
  loadingText?: string;
}

// ============================================
// COMPONENTE
// ============================================

/**
 * Button - Componente de botão acessível e customizável
 *
 * @example
 * // Variantes
 * <Button variant="primary">Salvar</Button>
 * <Button variant="secondary">Cancelar</Button>
 * <Button variant="ghost">Saiba mais</Button>
 *
 * @example
 * // Com ícones
 * <Button leftIcon={<PlusIcon />}>Adicionar</Button>
 * <Button rightIcon={<ArrowIcon />}>Continuar</Button>
 *
 * @example
 * // Estados
 * <Button loading>Salvando...</Button>
 * <Button disabled>Indisponível</Button>
 *
 * @example
 * // Como link (Next.js)
 * <Button asChild>
 *   <Link href="/dashboard">Dashboard</Link>
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText = 'Carregando...',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Determina o componente a renderizar
    const Comp = asChild ? Slot : 'button';

    // Loading implica disabled
    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left icon */}
        {!loading && leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Content */}
        <span className={cn(loading && 'sr-only')}>
          {loading ? loadingText : children}
        </span>

        {/* Texto visível durante loading */}
        {loading && <span aria-hidden="true">{loadingText}</span>}

        {/* Right icon */}
        {!loading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

// ============================================
// EXPORTS
// ============================================

export { Button, buttonVariants };
