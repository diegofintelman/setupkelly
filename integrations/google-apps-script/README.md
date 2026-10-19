# Leads do site → Google Sheets (Apps Script)

**Planilha:** "Leads - SITE e QRCODE KB" (dona: gestaofintelman@gmail.com; a Kelly já tem acesso).
**Implantação (App da Web):** `https://script.google.com/macros/s/AKfycbzbLpdXyPdwm87EU-mMj1MyWxgqpp53_edLBl8ySwAQpfUSjP6Biuh7qZGmY8BepqPV/exec`

O site novo envia para `/api/leads` (servidor Next.js). O servidor valida e repassa para o Apps Script desta planilha:

| Formulário do site novo | Vai para | E-mail para a Kelly |
|---|---|---|
| QR code | aba **Página1** (mesmas colunas de hoje: DATA, NOME, EMAIL, TELEFONE, ENDEREÇO) | sim |
| Contato | aba **Contatos** (criada no 1º envio) | sim |
| Pedido de guia (PDF) | aba **Contatos**, TIPO "Guia (PDF)" | sim |
| Newsletter | aba **Newsletter** (criada no 1º envio) | não |

O formulário antigo (página de QR code do kellybelem.com atual) continua funcionando igual: envios sem JSON caem no código original, que grava na Página1 pelo nome das colunas.

## Configuração (uma vez)

1. Abra a planilha → **Extensões → Apps Script**. Substitua todo o código pelo `leads.gs` desta pasta. Salve.
2. Gere um token aleatório (24+ caracteres, só letras e números; ex.: gerador de senhas do 1Password) e guarde no 1Password, cofre "Clientes", item "Kelly Belém".
3. No Apps Script: **Configurações do projeto (engrenagem) → Propriedades do script**. A propriedade `key` já existe (não mexa). Adicione:
   - `LEADS_TOKEN` = o token
   - `NOTIFY_EMAIL` = `kellybelem@kw.com`
4. **Implantar → Gerenciar implantações →** lápis na implantação atual **→ Versão: Nova versão → Implantar**. A URL `/exec` continua a mesma. Se pedir autorização nova (envio de e-mail), aceite com a conta gestaofintelman.
5. Na Vercel, projeto `setupkelly` → **Settings → Environment Variables** (Production):
   - `LEADS_ENDPOINT_URL` = a URL `/exec` acima
   - `LEADS_ENDPOINT_TOKEN` = o mesmo token
6. Redeploy na Vercel. Teste o `/contact`, a newsletter do rodapé e um pedido de guia em `/resources`. As linhas devem aparecer nas abas e o e-mail chegar na Kelly. Apague as linhas de teste depois.

## Como funciona

- **Segurança:** o token só existe no servidor (Vercel) e nas propriedades do script; nunca vai para o navegador nem para o Git. Envio JSON sem o token certo é recusado.
- **Duplicidade:** cada envio tem um `requestId`; se o mesmo envio chegar duas vezes em até 6 horas, só uma linha é gravada.
- **Falhas:** o site só mostra "Thank you" depois que o script confirma a gravação. Se a planilha falhar, o visitante vê um aviso para ligar ou mandar e-mail. Se só o e-mail falhar, a linha fica gravada.
- **Planilha:** telefones como `+1 ...` e textos que começam com `=`, `+`, `-` ou `@` são gravados como texto (evita fórmula).
- **Sem configuração** (local ou sem as variáveis): os formulários do site novo ficam em simulação. Com só uma das variáveis, ou URL inválida, o envio falha com erro em vez de perder o lead.

## Ao alterar o script

Sempre **Gerenciar implantações → editar → Nova versão**. "Nova implantação" gera outra URL e aí a Vercel precisa ser atualizada.

## Domínio final

A rota `/api/leads` só aceita envios do domínio configurado. Quando o site novo for para o domínio definitivo da Kelly, defina `SITE_URL` (ex.: `https://kellybelem.com`) na hospedagem, senão o formulário recusa os envios.
