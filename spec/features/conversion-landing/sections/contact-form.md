# Formulário de contato

**Componente:** `src/app/components/ContactFormSection.tsx`.
**Posição:** 12ª secção (última antes do Footer).
**Âncora:** `#contato`.

## 1. Objetivo de funil

Caminho **alternativo** para quem não quer ou não pode abrir o WhatsApp agora. Ao enviar, gera lead em Supabase e **também abre o WhatsApp** com os dados preenchidos — mantém o canal primário preservado.

## 2. Copy canônica

- **Eyebrow**: `Contato`
- **Title**: `Prefere escrever primeiro?`
- **Description**: `Deixa os dados aqui. A gente lê, responde em até um dia útil e já te chama no WhatsApp com o contexto.`

> Hierarquia explícita: caminho secundário; o primário continua a ser o WhatsApp.

## 3. Campos

Fonte da verdade em [`spec/integrations.md`](../../../integrations.md) §2.

| Campo | Tipo | Obrigatório | Validação extra |
|---|---|---|---|
| `name` | text | sim | mínimo 2 caracteres |
| `email` | email | sim | formato válido |
| `phone` | tel | sim | autocomplete + placeholder E.164 PT-BR |
| `service` | select | sim | enum: `Landing page ou site`, `SaaS ou painel administrativo`, `App mobile ou PWA`, `Outro ou ainda não sei` |
| `message` | textarea | sim | mínimo 10 caracteres |

Validação central: `validateContactForm(payload)` em `src/app/lib/contact-validation.ts`.

## 4. Fluxo de submit

1. Valida client-side.
2. `supabase.from('contact_submissions').insert(payload)`.
3. Monta texto: saudação + dados formatados (nome, e-mail, telefone, tipo de projeto, mensagem).
4. `openWhatsApp(text)` abre `wa.me/<num>?text=<encoded>` em nova aba.
5. UI mostra confirmação (`role="status"`): *"Registro guardado. Se o WhatsApp não abriu, envie uma mensagem para o número da Utopia com os mesmos dados."*

## 5. Estados de erro

- **Validação**: mensagem sob o formulário (`role="alert"`), lista o primeiro campo inválido.
- **Supabase não configurado**: orienta o visitante a usar o WhatsApp direto.
- **Erro de RLS/política**: mensagem amigável via `friendlySupabaseError`.
- **Erro de rede**: `"Falha de rede. Verifique a conexão e tente de novo."`

## 6. Visual

- `max-w-xl` centralizado.
- Form dentro de um card `rounded-2xl border border-white/10 bg-black/20`.
- Inputs: `border-white/15 bg-black/30` com focus-ring `white/15`.
- Select com fundo `zinc-900` para opções (contrast-safe).
- Botão submit: `Enviar e abrir WhatsApp`.

## 7. Acessibilidade

- Todos os inputs têm `<Label htmlFor>` e id consistente.
- `aria-required` implícito via `required`.
- `role="alert"` nas mensagens de erro; `role="status"` na confirmação.
- Botão fica `disabled` enquanto `submitting`.

## 8. Não fazer

- Não adicionar captura de UTM/referrer neste ciclo (fora de escopo).
- Não remover a abertura automática do WhatsApp no sucesso — é ela que mantém a hierarquia (formulário alimenta WhatsApp).
- Não trocar o Supabase por serviço diferente sem atualizar `integrations.md`.
