/**
 * ALIEN DESIGN SYSTEM — Utilities
 *
 * Funções utilitárias para construção de componentes
 *
 * CONCEITOS:
 *
 * 1. cn() - Class Name Merger
 *    Combina classes Tailwind de forma inteligente
 *    Resolve conflitos (última classe vence)
 *
 * 2. cva() - Class Variance Authority
 *    Define variantes de componentes de forma type-safe
 *    Gera classes baseadas em props
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes CSS de forma inteligente
 *
 * Usa clsx para condicionar classes e twMerge para resolver conflitos
 *
 * @example
 * cn('px-4 py-2', 'px-6') // 'py-2 px-6' (px-6 sobrescreve px-4)
 * cn('text-red-500', isActive && 'text-blue-500')
 * cn(baseStyles, variant === 'primary' && primaryStyles)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Cria estilos condicionais para slots de componentes
 *
 * @example
 * const styles = createSlotStyles({
 *   root: 'flex items-center',
 *   icon: 'w-4 h-4',
 *   label: 'text-sm font-medium',
 * });
 *
 * <div className={styles.root}>
 *   <Icon className={styles.icon} />
 *   <span className={styles.label}>{children}</span>
 * </div>
 */
export function createSlotStyles<T extends Record<string, string>>(
  slots: T
): T {
  return slots;
}

/**
 * Garante que um valor está dentro de um range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Formata uma string como ID válido
 *
 * @example
 * toKebabCase('Hello World') // 'hello-world'
 * toKebabCase('FormField') // 'form-field'
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Gera um ID único para componentes
 * Útil para acessibilidade (aria-labelledby, etc)
 */
let idCounter = 0;
export function generateId(prefix = 'alien'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Verifica se está no servidor
 */
export const isServer = typeof window === 'undefined';

/**
 * Verifica se está no cliente
 */
export const isClient = !isServer;

/**
 * Verifica se o usuário prefere movimento reduzido
 */
export function prefersReducedMotion(): boolean {
  if (isServer) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Verifica se o usuário prefere alto contraste
 */
export function prefersHighContrast(): boolean {
  if (isServer) return false;
  return window.matchMedia('(prefers-contrast: more)').matches;
}

/**
 * Verifica se o usuário prefere dark mode
 */
export function prefersDarkMode(): boolean {
  if (isServer) return true; // Dark é o padrão do Alien
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 * Type guard para verificar se um elemento é focável
 */
export function isFocusable(element: Element): element is HTMLElement {
  if (!(element instanceof HTMLElement)) return false;

  const focusableElements = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  return focusableElements.some((selector) => element.matches(selector));
}

/**
 * Obtém todos os elementos focáveis dentro de um container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  return Array.from(elements);
}

/**
 * Trap focus dentro de um elemento (útil para modais)
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown);
  firstElement?.focus();

  // Retorna função de cleanup
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Compõe múltiplos event handlers em um
 */
export function composeEventHandlers<E>(
  ...handlers: (((event: E) => void) | undefined)[]
): (event: E) => void {
  return (event: E) => {
    handlers.forEach((handler) => handler?.(event));
  };
}
