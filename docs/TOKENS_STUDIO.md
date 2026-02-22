# Alien Design System — Tokens Studio Integration

> Guia completo para sincronização bidirecional usando Tokens Studio

---

## 🎯 Por que Tokens Studio?

- ✅ Funciona em **todos os planos** do Figma (Free, Pro, Organization)
- ✅ Sincronização nativa com **GitHub/GitLab**
- ✅ Suporte a **temas** (Dark/Light mode)
- ✅ **Referências entre tokens** (variáveis que referenciam outras)
- ✅ Interface visual no Figma

---

## 🔧 Configuração Inicial

### 1. Instalar Tokens Studio no Figma

1. Abra o Figma
2. Vá em **Plugins** → **Browse plugins**
3. Pesquise "**Tokens Studio for Figma**"
4. Clique em **Install**

### 2. Conectar ao Repositório GitHub

1. No Figma, abra **Plugins** → **Tokens Studio**
2. Clique na aba **Sync**
3. Selecione **GitHub**
4. Configure:
   - **Personal Access Token**: [Crie aqui](https://github.com/settings/tokens)
   - **Repository**: `seu-usuario/alien-design-system`
   - **Branch**: `main`
   - **File Path**: `tokens/tokens-studio`
5. Clique em **Save credentials**

### 3. Fazer Pull Inicial

1. Com o Tokens Studio aberto
2. Clique em **Pull from GitHub**
3. Os tokens aparecerão organizados por sets

---

## 📁 Estrutura dos Tokens

```
tokens/tokens-studio/
├── $themes.json          # Definição de temas (Dark/Light)
├── $metadata.json        # Ordem dos token sets
├── core/
│   ├── colors.json       # Cores primitivas
│   ├── typography.json   # Tipografia
│   ├── spacing.json      # Espaçamentos
│   ├── elevation.json    # Shadows, radius
│   └── motion.json       # Duração, easing
└── semantic/
    ├── dark.json         # Tokens semânticos Dark Mode
    └── light.json        # Tokens semânticos Light Mode
```

### Token Sets Explicados

| Set | Tipo | Descrição |
|-----|------|-----------|
| `core/colors` | Primitivo | Valores hex puros |
| `core/typography` | Primitivo | Fontes, tamanhos, pesos |
| `core/spacing` | Primitivo | Valores em px |
| `semantic/dark` | Semântico | Referências para dark mode |
| `semantic/light` | Semântico | Referências para light mode |

---

## 🔄 Fluxo de Trabalho

### Cenário 1: Código → Figma

```
1. Desenvolvedor edita tokens em TypeScript
   (tokens/colors.ts, tokens/typography.ts, etc)

2. Executa script de conversão:
   npm run tokens:to-figma

3. Faz commit no Git:
   git add tokens/tokens-studio
   git commit -m "Update tokens"
   git push

4. No Figma, abre Tokens Studio:
   → Pull from GitHub

5. Tokens atualizados no Figma!
```

### Cenário 2: Figma → Código

```
1. Designer edita tokens no Tokens Studio

2. Faz push para GitHub:
   → Push to GitHub (no Tokens Studio)

3. Desenvolvedor faz pull:
   git pull

4. Executa script de conversão:
   npm run tokens:from-figma

5. Código atualizado!
```

---

## 🎨 Editando Tokens no Figma

### Criar Nova Cor

1. Abra **Tokens Studio**
2. Selecione o set `core/colors`
3. Clique em **+ New token**
4. Configure:
   - **Name**: `primary/950`
   - **Type**: `color`
   - **Value**: `#050D1A`
5. Clique em **Create**

### Criar Token com Referência

1. No set `semantic/dark`
2. Clique em **+ New token**
3. Configure:
   - **Name**: `background/surface`
   - **Type**: `color`
   - **Value**: `{primary.800}` ← Referência!
4. O valor será resolvido automaticamente

### Aplicar em Elementos

1. Selecione um elemento no Figma
2. No Tokens Studio, encontre o token
3. Clique no token para aplicar
4. Ou use **Right-click** → **Apply to selection**

---

## 🌓 Usando Temas

### Como Funciona

O arquivo `$themes.json` define quais token sets estão ativos em cada tema:

```json
[
  {
    "id": "dark",
    "name": "Dark",
    "selectedTokenSets": {
      "core/colors": "enabled",
      "semantic/dark": "enabled"   // ← Dark tokens ativos
    }
  },
  {
    "id": "light",
    "name": "Light",
    "selectedTokenSets": {
      "core/colors": "enabled",
      "semantic/light": "enabled"  // ← Light tokens ativos
    }
  }
]
```

### Alternar Temas no Figma

1. No Tokens Studio, vá para **Themes**
2. Clique no tema desejado (Dark ou Light)
3. Os tokens semânticos serão substituídos

### Exemplo Prático

Token `{background.primary}`:
- **Dark theme**: resolve para `{primary.900}` → `#0A1F44`
- **Light theme**: resolve para `{neutral.50}` → `#FAFBFC`

---

## 📋 Comandos NPM

| Comando | Descrição |
|---------|-----------|
| `npm run tokens:to-figma` | Código TS → JSON (Tokens Studio) |
| `npm run tokens:from-figma` | JSON → Código TS |

---

## 🏗️ Boas Práticas

### 1. Sempre use Referências

```json
// ❌ Ruim - valor hardcoded
"background": {
  "value": "#0A1F44"
}

// ✅ Bom - referência
"background": {
  "value": "{primary.900}"
}
```

### 2. Organize por Responsabilidade

- **core/**: Valores primitivos (nunca muda entre temas)
- **semantic/**: Intenções de uso (muda entre temas)
- **component/**: Específicos de componentes (opcional)

### 3. Mantenha Sincronia

```bash
# Antes de começar a trabalhar
git pull

# Depois de editar no Figma
# Push no Tokens Studio, depois:
git pull
npm run tokens:from-figma

# Depois de editar no código
npm run tokens:to-figma
git add . && git commit -m "Update tokens" && git push
```

### 4. Commits Semânticos

```bash
git commit -m "tokens: add new accent color"
git commit -m "tokens: adjust spacing scale"
git commit -m "tokens: fix contrast on light theme"
```

---

## 🔍 Troubleshooting

### "Tokens não aparecem no Figma"

1. Verifique se fez **Pull from GitHub**
2. Confira se o **File Path** está correto: `tokens/tokens-studio`
3. Verifique se os JSONs são válidos

### "Referência não resolve"

1. Confirme que o token referenciado existe
2. Verifique a sintaxe: `{categoria.nome}`
3. Token sets devem estar habilitados

### "Push falhou"

1. Verifique o Personal Access Token do GitHub
2. Token precisa de permissão `repo`
3. Confirme branch e repositório

### "Conflito de merge"

1. Faça backup local dos JSONs
2. Resolva conflitos no Git
3. Faça Pull novamente no Tokens Studio

---

## 📚 Recursos

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [GitHub Integration Guide](https://docs.tokens.studio/sync/github)
- [Token References](https://docs.tokens.studio/tokens/aliases)
- [Theming with Tokens Studio](https://docs.tokens.studio/themes/themes-pro)

---

*Alien Design System v0.1.0*
