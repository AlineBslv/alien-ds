# Alien Design System — Design Principles

> **"Você não está criando UI. Você está criando infraestrutura de decisão."**

---

## 🎯 Visão do Sistema

O Alien Design System é uma fundação técnica que transforma identidade de marca em decisões de design consistentes, acessíveis e escaláveis.

---

## 📐 Princípios Fundamentais

### 1. Contraste Primeiro

> Acessibilidade não é feature, é fundamento.

- **WCAG AA como mínimo** — 4.5:1 para texto normal, 3:1 para texto grande
- Cores de fundo e texto sempre validadas
- Estados de foco visíveis para todos os elementos interativos
- Não dependa apenas de cor para transmitir informação

```
✅ Correto: Botão com texto Primary-900 sobre Accent-500
❌ Errado: Texto claro sobre fundo saturado sem teste de contraste
```

### 2. Neon Estratégico, Não Excessivo

> O destaque perde valor quando tudo destaca.

- **Regra 60-30-10:**
  - 60% Primary/Neutral (backgrounds, texto base)
  - 30% Secondary (seções, cards)
  - 10% Accent (CTAs, microinterações)
- Accent (#3AF2D7) apenas para ações primárias
- Aurora (#6B4CF6) para destaques secundários
- Nunca use accent em todos os ícones simultaneamente

### 3. Escala Tipográfica Fixa

> Decisões arbitrárias criam inconsistência.

- **Escala definida:** 12 / 14 / 16 / 18 / 24 / 32 / 48 / 56 / 64px
- **Mínimo para texto público:** 14px
- **Máximo por linha:** 65 caracteres
- Uma única H1 por página
- Line-height generoso para body (1.6)

### 4. Espaçamento Modular

> Consistência > perfeição visual pontual.

- **Base 8px** — todos os espaçamentos são múltiplos
- Escala oficial: 8 / 16 / 24 / 32 / 48px
- Use a escala mesmo quando outro valor "parece" melhor
- Saltos significativos para criar hierarquia (dobro ou mais)

### 5. Estados Definidos

> Todo elemento interativo precisa de estados completos.

Estados obrigatórios para elementos interativos:
- **Default** — estado inicial
- **Hover** — mouse sobre
- **Focus** — navegação por teclado (outline visível!)
- **Active** — sendo clicado/pressionado
- **Disabled** — indisponível
- **Loading** — processando (quando aplicável)

### 6. Acessibilidade AA como Padrão

> Acessibilidade beneficia todos os usuários.

- Navegação completa por teclado
- Labels para todos os inputs
- Alt text para imagens significativas
- Respeito a `prefers-reduced-motion`
- Respeito a `prefers-contrast`
- Estrutura semântica correta (headings, landmarks)

---

## 🧠 Conceitos Técnicos Essenciais

### Contrato de Componente

Um **contrato** define:
- Quais props o componente aceita
- Quais valores são válidos para cada prop
- O comportamento esperado para cada combinação

```typescript
// Exemplo de contrato
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}
```

O contrato é uma **promessa** para quem usa o componente.

### API Visual

A **API Visual** é como você expõe customização:

```tsx
// API bem definida
<Button variant="primary" size="lg">
  Salvar
</Button>

// Evite: API muito aberta
<Button
  backgroundColor="#3AF2D7"
  textColor="#0A1F44"
  padding="12px 24px"
>
  Salvar
</Button>
```

**Regra:** Exponha intenções, não implementação.

### Variante vs Composição

**Variantes** = mesma função, aparência diferente

```tsx
<Button variant="primary">Confirmar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost">Saiba mais</Button>
```

**Composição** = elementos combinados formando novo componente

```tsx
<FormField>
  <Label>Email</Label>
  <Input type="email" />
  <HelperText>Nunca compartilharemos seu email</HelperText>
</FormField>
```

**Quando usar cada um:**
- Variante: diferenças visuais, mesma estrutura
- Composição: estruturas diferentes, mais flexibilidade

### Identidade vs Tema

**Identidade** = constante, define a marca
- Cores primárias
- Tipografia principal
- Tom de voz
- Personalidade visual

**Tema** = variável, contexto de uso
- Light/Dark mode
- Alta densidade / Confortável
- Acessibilidade (alto contraste)

O sistema deve permitir **temas** sem perder **identidade**.

---

## 🏗️ Arquitetura de Tokens

### Hierarquia de 3 Níveis

```
┌─────────────────────────────────────────┐
│           PRIMITIVOS                    │
│   Valores raw - NUNCA use direto        │
│   Ex: primary-500: #123A6F              │
└─────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────┐
│           SEMÂNTICOS                    │
│   Intenção de uso - Use em layouts      │
│   Ex: background-primary, text-muted    │
└─────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────┐
│          COMPONENTES                    │
│   Específicos - Use em components       │
│   Ex: button-primary-bg, input-border   │
└─────────────────────────────────────────┘
```

### Por que 3 níveis?

1. **Primitivos permitem** — definir a paleta completa
2. **Semânticos permitem** — trocar temas sem mudar componentes
3. **Componentes permitem** — consistência e manutenção fácil

---

## 📋 Checklist de Qualidade

### Para cada componente, valide:

- [ ] Props bem tipadas com TypeScript
- [ ] Variantes mínimas e necessárias
- [ ] Todos os estados implementados
- [ ] Navegação por teclado funcionando
- [ ] Contraste validado (WCAG AA)
- [ ] Responsivo (mobile-first)
- [ ] Documentado com exemplos
- [ ] Testado em Storybook

### Para o sistema como um todo:

- [ ] Tokens centralizados (single source of truth)
- [ ] Sem valores hardcoded
- [ ] Nomenclatura consistente
- [ ] Dark mode funcionando
- [ ] Reduced motion implementado
- [ ] Documentação atualizada

---

## 🚫 Anti-patterns a Evitar

### ❌ Hardcoded Values

```tsx
// Errado
<div style={{ padding: '17px', color: '#3AF2D7' }}>

// Correto
<div className="p-4 text-accent-500">
```

### ❌ Componentes God

```tsx
// Errado: componente que faz tudo
<SuperButton
  isLink
  isDropdown
  hasIcon
  hasTooltip
  isLoading
  isCard
/>

// Correto: composição de componentes especializados
<DropdownButton>
  <Button>Ações</Button>
  <DropdownMenu>...</DropdownMenu>
</DropdownButton>
```

### ❌ Props demais

```tsx
// Errado: API confusa
<Button
  bgColor="..."
  hoverBgColor="..."
  activeBgColor="..."
  textColor="..."
  hoverTextColor="..."
/>

// Correto: variantes
<Button variant="primary">
```

### ❌ Estilos inline em massa

```tsx
// Errado
<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  // ... 20 linhas de estilos
}}>

// Correto: classes utilitárias ou componente
<Card variant="horizontal">
```

---

## 🎨 Filosofia Visual

### O Alien Design System transmite:

1. **Sofisticação técnica** — não é amador
2. **Controle visual** — cada pixel tem propósito
3. **Confiança institucional** — profissional e sério
4. **Energia futurista controlada** — inovador sem ser exagerado

### Não é:

- Infantil ou excessivamente colorido
- Pesado ou sobrecarregado
- Minimalista ao ponto de ser frio
- Genérico ou sem personalidade

---

## 📖 Glossário

| Termo | Definição |
|-------|-----------|
| **Token** | Valor de design armazenado como variável |
| **Primitivo** | Token de valor bruto (hex, px) |
| **Semântico** | Token que expressa intenção |
| **Variante** | Versão visual diferente do mesmo componente |
| **Composição** | Combinar componentes menores em maiores |
| **Contrato** | Interface definida de um componente |
| **API Visual** | Como usuários customizam componentes |
| **Atom** | Componente indivisível (Button, Input) |
| **Molecule** | Combinação de atoms (FormField) |
| **Organism** | Seção complexa (Navbar, Modal) |

---

*Alien Design System v0.1.0*
*Criado por Aline Barbosa*
