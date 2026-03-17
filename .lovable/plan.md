

## Diagnóstico: O que ainda precisa ser resolvido

### Sobre o deploy na Vercel

**Este projeto não deve ser deployado na Vercel.** O Lovable já tem deploy integrado — basta clicar no botão **"Publish"** no canto superior direito do editor. O deploy na Vercel falha porque:

1. O Lovable usa Vite + React (SPA), e a Vercel pode não estar configurada para SPAs (rotas como `/guia?cliente=...` retornam 404 sem um `vercel.json` com rewrites)
2. As variáveis de ambiente (`VITE_SUPABASE_URL`, etc.) precisariam ser configuradas manualmente na Vercel
3. Não há necessidade — o Lovable já publica em `setupkelly.lovable.app`

**Recomendação:** Use o botão **Publish** do Lovable. Se precisar de domínio customizado, configure em Project Settings > Domains.

---

### Problemas técnicos restantes

#### 1. Trigger `updated_at` ainda não existe no banco (Alta)
A migration foi criada mas o trigger ainda não aparece nos dados do banco (`"There are no triggers in the database"`). Precisa verificar se a migration rodou ou reexecutar.

**Correção:** Reexecutar a migration SQL para criar o trigger.

#### 2. Warnings de `forwardRef` no console (Baixa)
Os componentes `GuiaKelly` e `StepCard` ainda geram warnings de ref. Isso não quebra nada mas polui o console.

**Correção:** Os componentes internos como `StepCard` (definido como function component inline) precisam ser convertidos ou o warning ignorado, já que é um comportamento do React Router v6 tentando passar refs.

---

### Plano de ação

1. **Reexecutar migration** do trigger `set_updated_at` na tabela `progresso` (verificar se precisa ser recriada)
2. **Não deployar na Vercel** — usar o Publish do Lovable ao invés disso
3. Opcionalmente, silenciar warnings de ref convertendo componentes com `React.forwardRef`

