

## Diagnóstico de erros no projeto

Após analisar o código, console logs, requisições de rede e a estrutura do banco, identifiquei os seguintes problemas:

---

### 1. Erro de ref no componente Index (console)

**O que acontece:** O console exibe `"Function components cannot be given refs"` referenciando o `PlaceholderIndex` em `Index.tsx`.

**Causa:** O React Router v6 tenta passar uma `ref` ao componente de rota, mas `PlaceholderIndex` é um function component simples que não suporta refs.

**Correção:** Não é crítico (é apenas um warning), mas pode ser resolvido substituindo o placeholder por um componente real ou usando `React.forwardRef`.

---

### 2. Trigger `update_updated_at` não está vinculado à tabela `progresso`

**O que acontece:** A função `update_updated_at()` existe no banco, mas conforme os dados de triggers ("There are no triggers in the database"), ela **não está associada** à tabela `progresso`. Isso significa que a coluna `updated_at` nunca é atualizada automaticamente em updates.

**Correção:** Criar uma migration com:
```sql
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.progresso
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();
```

---

### 3. Página inicial (`/`) está vazia (placeholder)

**O que acontece:** A rota `/` mostra apenas uma imagem placeholder. Se o usuário acessar `setupkelly.lovable.app` sem `/guia`, vê uma página em branco.

**Correção:** Redirecionar `/` para `/guia?cliente=demo` ou criar uma landing page que direcione o usuário.

---

### 4. Layout dos cards de etapa no mobile (timeline)

**O que acontece:** Os 3 cards da timeline usam `display: flex` horizontal sem `flexWrap` ou responsividade. Em telas pequenas (< 700px), os cards ficam espremidos e o texto trunca com `overflow: hidden`.

**Correção:** Adicionar `flexWrap: "wrap"` ao container da timeline ou empilhar verticalmente em telas menores.

---

### 5. Warnings do React Router v6 (não-crítico)

**O que acontece:** Dois warnings sobre future flags (`v7_startTransition` e `v7_relativeSplatPath`).

**Correção:** Não bloqueia funcionalidade. Pode ser resolvido adicionando as future flags no `BrowserRouter`:
```tsx
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
```

---

### Resumo por prioridade

| # | Problema | Impacto | Prioridade |
|---|----------|---------|------------|
| 1 | Trigger `updated_at` não vinculado | Dados inconsistentes no banco | Alta |
| 2 | Página `/` vazia (placeholder) | UX ruim para quem acessa sem `/guia` | Alta |
| 3 | Timeline não responsiva no mobile | Layout quebrado em celular | Média |
| 4 | Warning de ref no Index | Warning no console, sem impacto funcional | Baixa |
| 5 | Warnings do React Router v6 | Sem impacto funcional | Baixa |

---

### Plano de correção

1. **Migration SQL** para criar o trigger `update_updated_at` na tabela `progresso`
2. **Redirecionar `/`** para `/guia?cliente=demo` (ou criar landing page simples)
3. **Tornar timeline responsiva** com `flexWrap` ou layout vertical em mobile
4. **Adicionar future flags** ao BrowserRouter para silenciar warnings
5. **Remover placeholder** do Index ou converter com `forwardRef`

