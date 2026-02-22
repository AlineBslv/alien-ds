/**
 * ALIEN DESIGN SYSTEM — Storybook Configuration
 */

import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  // Onde encontrar as stories
  stories: [
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../foundations/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  // Addons
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y', // Testes de acessibilidade
  ],

  // Framework
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  // Documentação automática
  docs: {
    autodocs: 'tag',
  },

  // Webpack config
  webpackFinal: async (config) => {
    // Adiciona suporte a path aliases
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname, '..'),
      };
    }
    return config;
  },

  // Configuração do TypeScript
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
