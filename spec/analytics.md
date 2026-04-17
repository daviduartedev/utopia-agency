# Analytics

**Estado atual: a LP não tem analytics instalado.** Nenhuma ferramenta de tracking é carregada em produção. Este ciclo não introduz analytics — o que segue é o mapa do que existe, e os eventos-alvo quando a decisão for tomada.

## 1. Ferramentas em uso

Nenhuma. Sem GA4, Plausible, Umami, Fathom, Mixpanel, Hotjar ou Posthog.

Consequência prática: toda métrica de conversão hoje vem da **origem da mensagem do WhatsApp** (cada CTA tem texto distinto — ver `integrations.md`) e das inserções na tabela `contact_submissions` do Supabase.

## 2. Eventos-alvo (para quando tivermos tracker)

Quando um tracker for introduzido num próximo ciclo, adotar este dicionário:

| Evento | Gatilho | Propriedades |
|---|---|---|
| `cta_whatsapp_click` | clique em qualquer CTA que abre WhatsApp | `{ origin: 'hero' \| 'nav' \| 'footer' \| 'cta_section' \| 'floating' \| 'offer_landing' \| 'offer_saas' \| 'offer_app' \| 'book_call' }` |
| `form_submit` | submit bem-sucedido do formulário | `{ service }` |
| `form_error` | submit inválido ou com erro de rede/RLS | `{ reason }` |
| `faq_open` | abertura de item do FAQ | `{ question_id }` |
| `scroll_depth` | 25/50/75/100% de profundidade | `{ depth }` |
| `section_view` | seção entrou no viewport (IntersectionObserver) | `{ section_id }` |
| `portfolio_navigate` | prev/next ou drag no carrossel | `{ direction, index }` |

Convenção: `snake_case` para nomes de evento e propriedades.

## 3. Origem do lead (sem tracker)

Enquanto não há tracker, a origem do clique é inferida pela mensagem do WhatsApp. Manter mensagens nomeadas sempre distintas por origem (ver `integrations.md` §1.3) é **requisito** para essa inferência funcionar.

## TODO (futuros ciclos)

- Decidir tracker primário (recomendado: **Plausible** — cookieless, compatível com LGPD sem banner).
- Implementar consentimento LGPD se escolhermos GA4 ou ferramenta com cookies.
- Emitir os eventos da tabela em §2 consistentemente em todos os CTAs.
- Criar dashboard mínimo (4 painéis): taxa de clique no CTA por origem, conversão form vs WhatsApp, scroll-depth médio, top FAQ aberto.
