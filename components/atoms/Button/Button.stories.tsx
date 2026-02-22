/**
 * ALIEN DESIGN SYSTEM — Button Stories
 *
 * Documentação e playground do componente Button
 *
 * STORYBOOK:
 * - Documenta todas as variantes
 * - Permite testar interações
 * - Mostra código de exemplo
 * - Testa acessibilidade
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Ícones de exemplo (usando SVG inline para não depender de lib)
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

// ============================================
// META
// ============================================

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O **Button** é o átomo fundamental para ações no Alien Design System.

## Princípios

- **Contraste forte**: Texto escuro sobre fundo accent para máxima legibilidade
- **Estados completos**: Default, Hover, Focus, Active, Disabled, Loading
- **Acessível**: Navegação por teclado, focus visible, aria attributes

## Uso

\`\`\`tsx
import { Button } from '@/components/atoms/Button';

<Button variant="primary" size="md">
  Salvar alterações
</Button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'link'],
      description: 'Define a aparência visual do botão',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon'],
      description: 'Define o tamanho do botão',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Se true, ocupa toda a largura do container',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    children: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ============================================
// STORIES
// ============================================

/**
 * O botão primário é usado para a ação principal da página.
 * Deve haver apenas um por contexto visual.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  },
};

/**
 * O botão secundário é usado para ações secundárias
 * como "Cancelar" ao lado de um "Confirmar".
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
};

/**
 * O botão ghost é para ações terciárias ou navegação
 * que não deve competir visualmente.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Botão Ghost',
  },
};

/**
 * O botão danger é para ações destrutivas
 * como deletar ou remover.
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Deletar',
  },
};

/**
 * O botão link parece um link de texto
 * mas mantém a semântica de botão.
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Saiba mais',
  },
};

// ============================================
// TAMANHOS
// ============================================

/**
 * Demonstra todos os tamanhos disponíveis.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

// ============================================
// COM ÍCONES
// ============================================

/**
 * Botão com ícone à esquerda.
 * Útil para ações como "Adicionar".
 */
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <PlusIcon />,
    children: 'Adicionar item',
  },
};

/**
 * Botão com ícone à direita.
 * Útil para indicar navegação ou continuação.
 */
export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRightIcon />,
    children: 'Continuar',
  },
};

/**
 * Botão apenas com ícone.
 * Use o size="icon" para proporções corretas.
 */
export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <TrashIcon />,
    'aria-label': 'Deletar item', // Importante para acessibilidade!
  },
};

// ============================================
// ESTADOS
// ============================================

/**
 * Estado de carregamento.
 * Exibe spinner e desabilita interação.
 */
export const Loading: Story = {
  args: {
    loading: true,
    loadingText: 'Salvando...',
    children: 'Salvar',
  },
};

/**
 * Estado desabilitado.
 * Indica que a ação não está disponível.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Indisponível',
  },
};

// ============================================
// FULL WIDTH
// ============================================

/**
 * Botão que ocupa toda a largura.
 * Útil em formulários mobile.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Confirmar pedido',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// TODAS AS VARIANTES
// ============================================

/**
 * Visão geral de todas as variantes.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="primary" disabled>
          Primary
        </Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="ghost" disabled>
          Ghost
        </Button>
        <Button variant="danger" disabled>
          Danger
        </Button>
        <Button variant="link" disabled>
          Link
        </Button>
      </div>
    </div>
  ),
};

// ============================================
// ACESSIBILIDADE
// ============================================

/**
 * Demonstra o foco visível para navegação por teclado.
 * Pressione Tab para ver o anel de foco.
 */
export const FocusVisible: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>Primeiro</Button>
      <Button>Segundo</Button>
      <Button>Terceiro</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pressione Tab para navegar entre os botões e ver o anel de foco.',
      },
    },
  },
};
