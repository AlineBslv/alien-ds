# Alien Design System — Roadmap de Desenvolvimento

> **Duração estimada:** 12 semanas
> **Método:** Atomic Design
> **Stack:** Next.js, TypeScript, Tailwind CSS, Storybook

---

## 📍 Status Atual

### ✅ FASE 0 — Mentalidade de Sistema (Concluída)

- [x] Definição de Design Principles
- [x] Documentação de conceitos fundamentais
- [x] Estrutura de projeto definida

### ✅ FASE 1 — Fundamentos Estruturais (Concluída)

- [x] Escala tipográfica (Space Grotesk + Inter)
- [x] Escala de espaçamento (base 8px)
- [x] Tokens de radius (sm/md/lg/full)
- [x] Tokens de shadow
- [x] Definição de motion
- [x] Estratégia Dark + Light mode
- [x] Diretrizes de acessibilidade (WCAG AA)

### ✅ FASE 2 — Tokenização Real (Concluída)

- [x] Estrutura oficial de tokens (3 níveis)
- [x] CSS variables
- [x] tailwind.config.ts mapeado
- [x] Tokens de cores (primitive, semantic, component)
- [x] Tokens de tipografia
- [x] Tokens de espaçamento
- [x] Tokens de elevação
- [x] Tokens de motion

---

## 🚧 Próximos Passos

### 🟡 FASE 3 — Atoms Profundos (Semanas 3–5)

#### Typography (Prioridade Alta)
- [ ] Componente Text
- [ ] Componente Heading
- [ ] Documentação de uso

#### Button (Em Progresso)
- [x] Estrutura base
- [x] Variantes (primary, secondary, ghost, danger, link)
- [x] Tamanhos (sm, md, lg, xl, icon)
- [x] Estados (hover, focus, active, disabled, loading)
- [x] Suporte a ícones
- [x] Stories Storybook
- [ ] Testes unitários
- [ ] Exportação Figma

#### Input
- [ ] Estrutura base
- [ ] Variantes
- [ ] Estados (focus, error, disabled)
- [ ] Suporte a ícones
- [ ] Validação visual
- [ ] Stories
- [ ] Testes

#### Label
- [ ] Estrutura base
- [ ] Required indicator
- [ ] Optional indicator
- [ ] Stories

#### Icon
- [ ] Icon wrapper component
- [ ] Integração com Lucide
- [ ] Tamanhos padronizados
- [ ] Cores semânticas

#### Badge
- [ ] Estrutura base
- [ ] Variantes de cor
- [ ] Tamanhos
- [ ] Dot variant

#### Avatar
- [ ] Estrutura base
- [ ] Fallback (iniciais)
- [ ] Status indicator
- [ ] Tamanhos

#### Divider
- [ ] Horizontal
- [ ] Vertical
- [ ] Com texto

#### Spinner
- [ ] Estrutura base
- [ ] Tamanhos
- [ ] Cores

---

### 🟠 FASE 4 — Molecules Estratégicas (Semanas 6–7)

- [ ] FormField (Label + Input + Helper)
- [ ] SearchField
- [ ] ToggleGroup
- [ ] CardHeader
- [ ] Notification
- [ ] Breadcrumb

---

### 🔴 FASE 5 — Organismos & Complexidade (Semanas 8–9)

- [ ] Modal
- [ ] Navbar
- [ ] Sidebar
- [ ] DataTable
- [ ] AuthForm
- [ ] Dashboard layout

---

### 🟤 FASE 6 — Documentação & Governança (Semana 10)

- [ ] Guia de uso completo
- [ ] When to use / When not to use
- [ ] Guidelines de contribuição
- [ ] Padrão de naming
- [ ] Estratégia de versionamento
- [ ] Critérios de aprovação

---

### ⚫ FASE 7 — Auditoria & Evolução (Semanas 11–12)

- [ ] Auditoria de contraste
- [ ] Auditoria de consistência
- [ ] Revisão de tokens
- [ ] Refatoração de API
- [ ] Teste de densidade
- [ ] Teste de legibilidade

---

## 📂 Estrutura de Arquivos

```
alien-design-system/
├── .storybook/           # Configuração Storybook
├── app/                  # Next.js App Router
├── components/           # Componentes
│   ├── atoms/           # Elementos básicos
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Label/
│   │   └── ...
│   ├── molecules/       # Composições simples
│   ├── organisms/       # Seções complexas
│   ├── templates/       # Layouts de página
│   └── pages/           # Páginas completas
├── foundations/         # Documentação base
├── lib/                 # Utilitários
├── styles/              # CSS global
├── tokens/              # Design Tokens
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── elevation.ts
│   ├── motion.ts
│   └── index.ts
└── docs/                # Documentação adicional
```

---

## 🎯 Critérios de Qualidade

### Para cada componente:
- [ ] Props bem tipadas com TypeScript
- [ ] Variantes mínimas e necessárias
- [ ] Todos os estados implementados
- [ ] Navegação por teclado funcionando
- [ ] Contraste validado (WCAG AA)
- [ ] Responsivo (mobile-first)
- [ ] Documentado com exemplos
- [ ] Testado em Storybook
- [ ] Testes unitários

### Para o sistema:
- [ ] Tokens centralizados
- [ ] Sem valores hardcoded
- [ ] Nomenclatura consistente
- [ ] Dark mode funcionando
- [ ] Light mode funcionando
- [ ] Reduced motion implementado
- [ ] Documentação atualizada

---

## 🔧 Comandos Úteis

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Storybook
npm run storybook

# Build
npm run build

# Testes
npm run test

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 📝 Notas de Aprendizado

### Fase 0 — O que aprendi:
- Design System não é biblioteca de componentes
- É infraestrutura de decisão
- Contratos de componente são promessas
- API visual expõe intenções, não implementação

### Fase 1-2 — O que aprendi:
- Tokens em 3 níveis (primitive > semantic > component)
- Escala modular cria consistência
- Acessibilidade é fundamento, não feature
- Dark mode como padrão é possível com planejamento

---

*Última atualização: Fase 2 concluída*
*Próximo: Iniciar FASE 3 — Atoms*
