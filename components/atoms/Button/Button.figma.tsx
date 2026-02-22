/**
 * ALIEN DESIGN SYSTEM — Button Code Connect
 *
 * Este arquivo conecta o componente Button do código
 * ao componente Button no Figma
 *
 * COMO FUNCIONA:
 * 1. Figma Code Connect lê este arquivo
 * 2. Mapeia propriedades do Figma para props do React
 * 3. Gera snippets de código corretos no Dev Mode
 *
 * BENEFÍCIOS:
 * - Designers veem código real, não gerado
 * - Desenvolvedores copiam código funcional
 * - Reduz drift entre design e implementação
 */

import figma from '@figma/code-connect';
import { Button } from './Button';

/**
 * Conexão principal do Button
 *
 * IMPORTANTE:
 * - O figmaNodeUrl deve ser o URL do componente no Figma
 * - As props devem mapear exatamente as propriedades do Figma
 */
figma.connect(Button, 'https://www.figma.com/file/YOUR_FILE_KEY?node-id=BUTTON_NODE_ID', {
  // Mapeia propriedades do Figma para props do React
  props: {
    // Variante visual
    variant: figma.enum('Variant', {
      'Primary': 'primary',
      'Secondary': 'secondary',
      'Ghost': 'ghost',
      'Danger': 'danger',
      'Link': 'link',
    }),

    // Tamanho
    size: figma.enum('Size', {
      'Small': 'sm',
      'Medium': 'md',
      'Large': 'lg',
      'Extra Large': 'xl',
    }),

    // Estado de loading
    loading: figma.boolean('Loading', {
      true: true,
      false: false,
    }),

    // Estado disabled
    disabled: figma.boolean('Disabled', {
      true: true,
      false: false,
    }),

    // Largura total
    fullWidth: figma.boolean('Full Width', {
      true: true,
      false: false,
    }),

    // Ícone à esquerda (se existir como instância)
    leftIcon: figma.instance('Left Icon'),

    // Ícone à direita (se existir como instância)
    rightIcon: figma.instance('Right Icon'),

    // Texto do botão
    children: figma.textContent('Label'),
  },

  // Template do código gerado
  example: (props) => (
    <Button
      variant={props.variant}
      size={props.size}
      loading={props.loading}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
    >
      {props.children}
    </Button>
  ),
});

/**
 * Variante: Icon Button (apenas ícone)
 */
figma.connect(Button, 'https://www.figma.com/file/YOUR_FILE_KEY?node-id=ICON_BUTTON_NODE_ID', {
  props: {
    variant: figma.enum('Variant', {
      'Primary': 'primary',
      'Secondary': 'secondary',
      'Ghost': 'ghost',
    }),
    icon: figma.instance('Icon'),
    disabled: figma.boolean('Disabled'),
  },

  example: (props) => (
    <Button
      variant={props.variant}
      size="icon"
      disabled={props.disabled}
      aria-label="Descrição da ação"
    >
      {props.icon}
    </Button>
  ),
});
