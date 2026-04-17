# Tasks — Conversion-focused Landing Page

**Cycle:** `Q22026/0417-conversion-focused-landing`
**Plan:** [`plan.md`](plan.md) · **Scenarios:** [`scenarios.feature`](scenarios.feature) · **Request:** [`request.md`](request.md)

> Execute na ordem indicada. Cada bloco termina com um pequeno smoke-check manual no navegador.

---

## 0. Setup do ciclo

- [x] Mover `cycles/request.md` para `cycles/Q22026/0417-conversion-focused-landing/request.md`.
- [x] Criar `plan.md`, `scenarios.feature`, `tasks.md` no mesmo diretório.
- [x] Revisar `plan.md` antes de começar a implementação.

---

## 1. Bootstrap do hub `spec/` (obrigatório)

Criar **todos** os arquivos abaixo já populados (ver estrutura em `plan.md` §3).

- [x] `spec/README.md` — índice do hub + convenções.
- [x] `spec/product.md` — visão, ICP fundador solo, posicionamento.
- [x] `spec/design-system.md` — tokens (theme.css), tipografia (Fraunces/DM Sans), componentes chave.
- [x] `spec/content-guidelines.md` — tom de voz + **blacklist canônica** de clichês.
- [x] `spec/integrations.md` — WhatsApp (wa.me + mensagens nomeadas) + Supabase (`contact_submissions`).
- [x] `spec/seo.md` — estado atual dos metas e TODOs.
- [x] `spec/analytics.md` — estado atual (sem analytics) e TODOs.
- [x] `spec/performance-budget.md` — budgets implícitos atuais e TODOs.
- [x] `spec/accessibility.md` — baseline atual (foco visível, semântica) e TODOs.
- [x] `spec/privacy-lgpd.md` — estado atual (sem banner, sem páginas legais) e TODOs.
- [x] `spec/features/conversion-landing/readme.md` — especificação canônica da feature.
- [x] `spec/features/conversion-landing/sections/` — um doc por seção da LP (13 arquivos: hero, problem, client-logos, solution, differentiators, how-it-works, portfolio, testimonials, offer, faq, final-cta, contact-form, footer).

---

## 2. Content audit (antes do código)

- [x] Rodar busca na base por cada item da blacklist de `spec/content-guidelines.md`. Encontradas:
  - `index.html` — `#1 Agência de Desenvolvimento...`
  - `src/app/components/CtaSection.tsx` — `"Do zero ao lançamento sem complicação"`
  - `src/app/components/OfferingsScrollStack.tsx` — `"painéis sob medida"`
  - `src/app/components/Testimonials.tsx` — `"ficou sob medida"` (reescrito no §6)
- [x] Aplicar as substituições em:
  - [x] `src/app/components/CtaSection.tsx` (title + description + items alinhados a `final-cta.md`).
  - [x] `src/app/components/OfferingsScrollStack.tsx` (body do card SaaS + description do header).
  - [x] `src/app/components/HowItWorks.tsx` (passo 5 — suporte agora é "1 mês de suporte gratuito").
  - [x] `src/app/components/Faq.tsx` (6 Q&As realinhadas a `faq.md`).
  - [x] `src/app/components/ContactFormSection.tsx` (description = caminho alternativo).
  - [x] `index.html` — `<title>`, `og:title`, `twitter:title`, `meta description`.

---

## 3. Nova seção: Problema

- [x] Criar `src/app/components/Problem.tsx` (padrão: `section` + `SectionHeader` + 3 cards `SpotlightCard`).
- [x] Textos das 3 dores conforme `spec/features/conversion-landing/sections/problem.md`:
  - a) site que não converte visita em contatos;
  - b) orçamento caro, prazo longo e entrega burocrática;
  - c) agência que desaparece pós-entrega.
- [x] Adicionar lazy-import no `src/app/lazy-pages.tsx` → `Problem`.
- [x] Inserir a seção em `src/app/App.tsx` **entre Hero e OfferingsScrollStack**, com `LazySection minHeight="44vh"`.

---

## 4. ClientLogos entre Problema e Serviços

- [x] Criar 8 SVGs em `public/logos/` (acme, northwind, helix-labs, umbra, tessera, lumen, paraglide, vantage). Todos mono-cor via `currentColor`.
- [x] Criar `src/app/components/ClientLogos.tsx` dedicado (consume `LogoLoop`). **Divergência do plan**: o `LogoCloud.tsx` original fica preservado para uso como "stack técnica" — `ClientLogos` é separado, registrado em `spec/.../sections/client-logos.md` §8.
- [x] Adicionar `ClientLogos` via `lazy-pages.tsx` + `LazySection minHeight="32vh"` em `App.tsx`, imediatamente depois de `Problem`.
- [x] Copy-label discreto: `Quem já trabalhou com a Utopia`.

---

## 5. Refazer Portfólio como carrossel horizontal

- [x] Reescrever `src/app/components/Portfolio.tsx` usando `embla-carousel-react`.
- [x] Opções Embla: `{ loop: true, align: "start", dragFree: false, skipSnaps: false, containScroll: "trimSnaps" }`.
- [x] Botões **Prev/Next** com `aria-label` + ring de foco visível; navegação por teclado no container (`ArrowLeft` / `ArrowRight`).
- [x] 5 cases: 3 com imagem existente em `public/` + 2 placeholders "Case em breve" como retângulo escuro com título textual.
- [x] Fades laterais com gradiente + backdrop-blur mantidos.

---

## 6. Refazer Depoimentos em layout masonry

- [x] Reescrever `src/app/components/Testimonials.tsx` usando `react-responsive-masonry` (ambient `.d.ts` adicionado em `src/vite-env.d.ts`).
- [x] Grid 3 / 2 / 1 (breakpoints 350/700/1100).
- [x] Cards estáticos (hover via `SpotlightCard` já existente). Sem marquee, sem coluna animada.
- [x] 6 depoimentos como placeholders plausíveis (primeiro nome + papel).
- [x] Avatares = iniciais em círculo com gradiente por card.
- [x] Semântica `<blockquote>` + `<cite>`.

---

## 7. Nova seção: Oferta

- [x] Criar `src/app/components/Offer.tsx` com 3 cards (LP destaque · SaaS · App).
- [x] Preços e condições conforme `offer.md`.
- [x] Rodapé do bloco com regra de sinal mínimo 30%/1 parcela.
- [x] CTA por card com `SiWhatsapp` + `whatsappHref(...)`:
  - [x] `WA_MSG_OFFER_LANDING`
  - [x] `WA_MSG_OFFER_SAAS`
  - [x] `WA_MSG_OFFER_APP`
- [x] Adicionar lazy-import e inserir no `App.tsx` **entre Depoimentos e FAQ**.

---

## 8. Hierarquia de CTA (WhatsApp primário)

- [x] Auditados: Hero, Navbar, BookCallWidget (HowItWorks), Offer (3×), CtaSection, Footer, Floating. Todos usam `whatsappHref(...)` ou `openWhatsApp(...)`.
- [x] `ContactFormSection` description atualizada para posicionar o formulário como caminho alternativo.
- [x] Mensagens nomeadas em `src/app/lib/whatsapp-messages.ts` sem órfãs; adicionadas `WA_MSG_OFFER_*`.
- [x] Navbar recebeu link `#oferta`; Footer substituiu `Depoimentos` por `Oferta`.

---

## 9. Floating WhatsApp — ícone oficial

- [x] `src/app/components/DemoOne.tsx` agora passa `centerContent` com `SiWhatsapp` sobre círculo `#25D366`. `imageSrc="/avatar.png"` removido.
- [x] `revolvingText` atualizado para `FALAR NO WHATSAPP — UTOPIA —`.
- [x] `ctaButtonText` atualizado para `Falar no WhatsApp agora`.

---

## 10. Atualização final do `spec/` (obrigatória, não esquecer)

- [x] `spec/features/conversion-landing/readme.md` atualizado (ClientLogos, placeholders).
- [x] `spec/features/conversion-landing/sections/client-logos.md` criado.
- [x] `spec/features/conversion-landing/sections/solution.md` — remoção de "sob medida" no body do SaaS.
- [x] `spec/features/conversion-landing/sections/testimonials.md` — placeholders atualizados para primeiro nome + papel.
- [x] `spec/product.md` — "sob medida" substituído por "customizados".
- [x] `spec/seo.md` — estado atual reflete o novo `<title>` / `<meta description>`; TODO de `#1 Agência` removido.

---

## 11. QA manual antes do merge

- [ ] Rodar `npm run dev` e percorrer a página inteira no desktop (Chrome, Firefox).
- [ ] Repetir em viewport mobile (375×812 e 320×640).
- [ ] Validar cada cenário de `scenarios.feature` manualmente.
- [ ] Testar submit do formulário apontando para Supabase local/staging: caso feliz + 2 casos de erro (campo faltando, e-mail inválido).
- [ ] Abrir cada link de WhatsApp e confirmar que a mensagem pré-preenchida é a esperada para a origem do clique.
- [ ] Inspetor → console sem erros/warnings críticos.
- [ ] Lighthouse smoke (apenas informativo, sem gate formal).

---

## 12. Fora de escopo (registrar como follow-up)

- [ ] Webhook Discord para leads — aguardando dados do próximo ciclo.
- [ ] Analytics (GA4/Plausible) + consentimento LGPD.
- [ ] JSON-LD (`Organization`, `Service`, `FAQPage`).
- [ ] Páginas `/termos` e `/privacidade`.
- [ ] Rate-limit no endpoint de submissão (Turnstile/hCaptcha).
- [ ] E2E automatizado (Playwright) para os cenários desta feature.
