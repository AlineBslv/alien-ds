/**
 * ALIEN DESIGN SYSTEM — Storybook Preview Configuration
 *
 * Configura o ambiente de visualização das stories
 */

import type { Preview } from '@storybook/react';
import '../styles/globals.css';

const preview: Preview = {
  parameters: {
    // Controles automáticos
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Background padrão (dark mode)
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0A1F44', // primary-900
        },
        {
          name: 'light',
          value: '#F5F7FA', // neutral-100
        },
        {
          name: 'neutral',
          value: '#1A1A1A', // neutral-900
        },
      ],
    },

    // Layout padrão
    layout: 'centered',

    // Configurações de acessibilidade
    a11y: {
      // WCAG 2.1 AA
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },

    // Ordenação das stories
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Elevation', 'Motion'],
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
          'Pages',
        ],
      },
    },
  },

  // Decorators globais
  decorators: [
    (Story) => (
      <div className="font-body">
        <Story />
      </div>
    ),
  ],

  // Tags para autodocs
  tags: ['autodocs'],
};

export default preview;
