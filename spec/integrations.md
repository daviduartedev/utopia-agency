# Integrações

## 1. WhatsApp (canal primário)

### 1.1 Número

- E.164: `+55 48 9143-4813`
- Formatado para `wa.me`: `554891434813`
- Fonte única: `src/app/lib/whatsapp.ts` → `WHATSAPP_E164`.

### 1.2 Como montar link

```ts
import { whatsappHref } from "@/app/lib/whatsapp";
// no componente:
<a href={whatsappHref(WA_MSG_HERO)} target="_blank" rel="noopener noreferrer">...</a>
```

Helper `whatsappHref(msg)` codifica a mensagem e devolve `https://wa.me/554891434813?text=...`.

### 1.3 Mensagens nomeadas

Todas as mensagens pré-preenchidas vivem em `src/app/lib/whatsapp-messages.ts`. **Nenhum componente deve inline-ar texto de WhatsApp** — sempre via constante.

Mensagens canônicas atuais:

| Constante | Origem do clique |
|---|---|
| `WA_MSG_HERO` | CTA primário do hero |
| `WA_MSG_NAV` | Item "Falar agora" do menu |
| `WA_MSG_FOOTER` | Link do rodapé |
| `WA_MSG_CTA_SECTION` | `CtaSection` (pré-FAQ na composição antiga; pré-formulário na nova) |
| `WA_MSG_FLOATING` | Botão flutuante |
| `WA_MSG_BOOK_CALL` | `BookCallWidget` dentro de `HowItWorks` |
| `WA_MSG_DEFAULT_IMPACT` | Fallback genérico |

A serem adicionadas neste ciclo (ver `cycles/Q22026/0417-conversion-focused-landing/tasks.md` §7):

- `WA_MSG_OFFER_LANDING` — CTA do card Landing Page na seção Oferta.
- `WA_MSG_OFFER_SAAS` — CTA do card SaaS.
- `WA_MSG_OFFER_APP` — CTA do card Aplicativo.

### 1.4 Regras de escrita das mensagens

- Sempre em 1ª pessoa ("Quero...").
- Sempre identifica a **origem** do clique (para a Utopia saber de onde veio sem UTM).
- Até 140 caracteres idealmente; máximo 280.
- Sem emoji excessivo; um emoji inicial ("👋") é aceitável, nunca obrigatório.

## 2. Supabase (canal alternativo)

### 2.1 Projeto

- Client criado em `src/app/lib/supabase.ts` via `@supabase/supabase-js`.
- Envs obrigatórias: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (ver `.env.example`).
- Helper `isSupabaseConfigured()` dá curto-circuito amigável quando faltam as envs.

### 2.2 Tabela `contact_submissions`

Schema canônico em [`supabase/contact_submissions.sql`](../supabase/contact_submissions.sql):

```sql
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  message text not null
);
```

Política RLS: **insert-only para role `anon`**, zero leitura via API pública.

### 2.3 Fluxo do formulário

1. Valida com `validateContactForm(payload)` (`src/app/lib/contact-validation.ts`).
2. Faz `supabase.from('contact_submissions').insert(...)`.
3. Em sucesso, monta texto a partir do payload e chama `openWhatsApp(text)` — o WhatsApp abre com os mesmos dados.
4. Em erro de RLS/rede, mostra mensagem traduzida e orienta a usar o WhatsApp direto.

### 2.4 Fonte única do fluxo

O **único** componente que grava em `contact_submissions` é `ContactFormSection.tsx`. Se um novo ponto de captura surgir, centraliza-se em um serviço (`createLead(payload)`) em `src/app/lib/` antes de espalhar.

## 3. Fora de escopo neste ciclo (follow-up)

- **Webhook Discord** em cima do insert de `contact_submissions` para notificar leads em tempo real (trigger → Edge Function → POST).
- **Rate limit** via Cloudflare Turnstile ou hCaptcha (invisível) no formulário.
- **CRM** (HubSpot/Pipedrive) plugado por webhook.
- Captura extra no lead (UTM/referrer/user-agent) — tabela permanece com os 5 campos atuais.
