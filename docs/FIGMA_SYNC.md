# Alien Design System — Sincronização com Figma

> Guia completo para o fluxo bidirecional entre código e Figma

---

## 🎯 Visão Geral do Fluxo

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│  Claude     │ ──(1)──▶│   Figma     │ ──(3)──▶│   Claude    │
│  Code       │         │   (edição)  │         │   Code      │
│  (criar)    │◀──(5)── │             │ ◀──(4)──│   (MCP)     │
└─────────────┘         └─────────────┘         └─────────────┘
      │                       │                       │
      ▼                       ▼                       ▼
   Tokens               Design Visual            Código
   TypeScript           Variáveis Figma          Atualizado
```

### O Fluxo Completo:

1. **Claude Code cria** → Tokens e componentes em TypeScript
2. **Script exporta** → Variáveis são criadas no Figma automaticamente
3. **Designer edita** → Ajustes visuais no Figma
4. **MCP Server lê** → Claude Code acessa contexto do Figma
5. **Script importa** → Código atualizado com alterações

---

## 🔧 Configuração Inicial

### 1. Obter Token do Figma

1. Acesse [figma.com/settings](https://www.figma.com/settings)
2. Role até "Personal access tokens"
3. Clique em "Create new token"
4. Selecione os escopos necessários:
   - ✅ `File content` (read)
   - ✅ `Variables` (read and write)
   - ✅ `Code Connect` (write)
5. Copie o token gerado

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# .env.local
FIGMA_ACCESS_TOKEN=figd_xxxxxxxxxxxxxxxxxxxxxxxxxx
FIGMA_FILE_KEY=xxxxxxxxxxxxxxxxx
```

**Para obter o FILE_KEY:**
- Abra seu arquivo Figma
- A URL será: `figma.com/file/XXXXXXX/Nome-do-Arquivo`
- O FILE_KEY é o `XXXXXXX`

### 3. Configurar MCP no Claude Code

O arquivo `.claude/mcp.json` já está configurado. O Claude Code usará:

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "headers": {
        "Authorization": "Bearer ${FIGMA_ACCESS_TOKEN}"
      }
    }
  }
}
```

---

## 📤 Exportando Tokens para Figma

### Comando

```bash
npx ts-node scripts/figma-sync export
```

### O que acontece:

1. Lê tokens de `tokens/*.ts`
2. Transforma para formato Figma Variables
3. Cria coleções:
   - **Alien Colors** — Todas as cores
   - **Alien Spacing** — Espaçamentos
   - **Alien Typography** — Fontes e tamanhos
   - **Alien Effects** — Shadows e radius

### Resultado no Figma:

```
📁 Local Variables
├── 📂 Alien Colors
│   ├── primary/900 (#0A1F44)
│   ├── primary/700 (#0F2C5C)
│   ├── accent/500 (#3AF2D7)
│   └── ...
├── 📂 Alien Spacing
│   ├── spacing/2 (8px)
│   ├── spacing/4 (16px)
│   └── ...
└── 📂 Alien Typography
    ├── typography/size/base (16px)
    └── ...
```

---

## 📥 Importando Tokens do Figma

### Comandos

```bash
# Ver diferenças sem modificar
npx ts-node scripts/figma-sync import --dry-run

# Ver detalhes das variáveis
npx ts-node scripts/figma-sync import --verbose

# Importar e atualizar código
npx ts-node scripts/figma-sync import
```

### O que acontece:

1. Lê variáveis do arquivo Figma
2. Compara com tokens locais
3. Mostra diferenças (adições, modificações, remoções)
4. Atualiza arquivos `tokens/*.ts`

---

## 🔗 Code Connect

O Code Connect vincula componentes do Figma ao código real.

### Estrutura

```
components/
└── atoms/
    └── Button/
        ├── Button.tsx           # Componente
        ├── Button.stories.tsx   # Storybook
        └── Button.figma.tsx     # Code Connect
```

### Arquivo `.figma.tsx`

```tsx
import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(Button, 'FIGMA_NODE_URL', {
  props: {
    variant: figma.enum('Variant', {
      'Primary': 'primary',
      'Secondary': 'secondary',
    }),
    children: figma.textContent('Label'),
  },
  example: (props) => (
    <Button variant={props.variant}>
      {props.children}
    </Button>
  ),
});
```

### Publicar Code Connect

```bash
npx figma connect publish
```

---

## 🤖 Usando MCP com Claude Code

### Comandos Disponíveis no Chat

Quando o MCP está configurado, você pode pedir ao Claude:

```
"Leia o componente Button do Figma e verifique se está alinhado com o código"

"Extraia as cores da página de tokens do Figma"

"Gere código React para o card que está selecionado no Figma"
```

### Ferramentas MCP Disponíveis:

| Ferramenta | Descrição |
|------------|-----------|
| `get_design_context` | Obtém estrutura do design |
| `get_metadata` | Informações de alto nível |
| `get_screenshot` | Captura visual do elemento |
| `get_code` | Gera código do elemento |

---

## 📋 Checklist de Sincronização

### Antes de Exportar:

- [ ] Tokens atualizados em `tokens/*.ts`
- [ ] `FIGMA_ACCESS_TOKEN` configurado
- [ ] `FIGMA_FILE_KEY` configurado
- [ ] Arquivo Figma criado e acessível

### Antes de Importar:

- [ ] Designer finalizou edições no Figma
- [ ] Variáveis estão organizadas nas coleções corretas
- [ ] Nomes seguem convenção (ex: `primary/900`)
- [ ] Executar `--dry-run` primeiro

### Antes de Publicar Code Connect:

- [ ] Componente tem URL do Figma correta
- [ ] Props mapeiam corretamente
- [ ] Exemplo gera código funcional
- [ ] Testado localmente

---

## 🔄 Fluxo de Trabalho Recomendado

### Criando Novo Componente

```
1. Criar componente em código (Button.tsx)
2. Criar stories (Button.stories.tsx)
3. Testar no Storybook
4. Exportar tokens para Figma
5. Designer cria componente no Figma usando variáveis
6. Criar Code Connect (Button.figma.tsx)
7. Publicar Code Connect
```

### Atualizando Tokens

```
1. Designer altera variáveis no Figma
2. Executar: npx ts-node scripts/figma-sync import --dry-run
3. Revisar mudanças
4. Executar: npx ts-node scripts/figma-sync import
5. Testar componentes afetados
6. Commit das mudanças
```

### Adicionando Nova Cor

```
Código → Figma:
1. Adicionar cor em tokens/colors.ts
2. Executar export
3. Variável aparece no Figma

Figma → Código:
1. Designer adiciona variável no Figma
2. Executar import --dry-run
3. Revisar e executar import
4. Cor disponível no código
```

---

## ⚠️ Limitações

### API do Figma (Enterprise)

A **Variables REST API** requer plano Enterprise do Figma para:
- Criar variáveis
- Atualizar variáveis
- Deletar variáveis

**Alternativa para planos Free/Pro:**
- Use **Tokens Studio** plugin no Figma
- Exporte JSON e processe localmente

### MCP Server Oficial

O servidor MCP oficial do Figma é **somente leitura**:
- ✅ Lê designs e variáveis
- ✅ Gera código
- ❌ Não cria/edita elementos

Para escrita, use os scripts de sync deste projeto.

---

## 🛠️ Troubleshooting

### "FIGMA_ACCESS_TOKEN não configurado"

```bash
# Windows
set FIGMA_ACCESS_TOKEN=seu-token

# Linux/Mac
export FIGMA_ACCESS_TOKEN=seu-token
```

### "Figma API error: 403"

- Verifique se o token tem os escopos corretos
- Verifique se você tem acesso ao arquivo
- Tokens expiram: crie um novo se necessário

### "Variables API não disponível"

- Requer plano Enterprise do Figma
- Use Tokens Studio como alternativa

### Code Connect não aparece no Figma

1. Verifique se publicou: `npx figma connect publish`
2. Confirme que a URL do node está correta
3. Atualize o Dev Mode no Figma

---

## 📚 Recursos

- [Figma MCP Server Guide](https://help.figma.com/hc/en-us/articles/32132100833559)
- [Variables REST API](https://developers.figma.com/docs/rest-api/variables-endpoints/)
- [Code Connect Docs](https://help.figma.com/hc/en-us/articles/23920389749655)
- [Tokens Studio](https://tokens.studio/)

---

*Alien Design System v0.1.0*
