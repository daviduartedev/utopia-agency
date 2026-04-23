# Oferta

**Componente (novo):** `src/app/components/Offer.tsx`.
**Posição:** 9ª secção (entre Depoimentos e FAQ).
**Âncora:** `#oferta`.

## 1. Objetivo de funil

É a secção que fecha o ciclo comercial: **o que está à venda**, preço-âncora, prazo, inclusões e como iniciar — sem esconder "sob consulta" nos formatos maiores.

## 2. Copy canônica

- **Eyebrow**: `Oferta`
- **Title**: `Preço claro. Escopo fechado.`
- **Description**: `Landing com valor de entrada; SaaS e app só depois de conversa — nada de prometer prazo mágico no ar.`

### Três produtos (ordem fixa; layout de apresentação livre)

#### Card 1 — Landing Page (**destaque**)

- Rótulo: `Landing Page`
- Preço: **`a partir de R$ 999`** · `parcelável em 3×`
- Prazo: `entrega em até 7 dias`
- Inclusões (bullets):
  - Design em Figma + código-fonte entregue
  - Domínio e hospedagem configurados
  - SEO técnico básico
  - Analytics instalado
  - 1 mês de suporte gratuito
  - Revisões inclusas na proposta
- CTA: `Quero minha landing` → `whatsappHref(WA_MSG_OFFER_LANDING)`

#### Card 2 — Sistema SaaS

- Rótulo: `Sistema SaaS`
- Preço: **`sob consulta`** · `parcelável em 3×`
- Prazo: `sob consulta`
- Inclusões (bullets):
  - Design em Figma + código-fonte entregue
  - Banco e backend configurados
  - Autenticação + painel administrativo
  - Deploy com CI/CD
  - 1 mês de suporte gratuito
  - Revisões inclusas na proposta
- CTA: `Falar sobre meu SaaS` → `whatsappHref(WA_MSG_OFFER_SAAS)`

#### Card 3 — Aplicativo

- Rótulo: `Aplicativo`
- Preço: **`sob consulta`** · `parcelável em 3×`
- Prazo: `sob consulta`
- Inclusões (bullets):
  - Design em Figma + código-fonte entregue
  - Build mobile (iOS/Android) ou PWA
  - Integrações de push/analytics
  - 1 mês de suporte gratuito
  - Revisões inclusas na proposta
- CTA: `Falar sobre meu app` → `whatsappHref(WA_MSG_OFFER_APP)`

### Rodapé do bloco (barra de condições)

Texto único, logo abaixo do bloco de produtos (seja qual for o formato visual), em `zinc-400` 13–14px:

> `Para iniciar: sinal mínimo de 30% (ou 1 parcela). O restante é combinado na proposta — sem surpresa depois.`

## 3. Visual

- `bg-page-surface py-20 md:py-24`, hairlines top/bottom.
- **Formato:** pode ser grid de cartões, **tabela comparativa**, **accordion por produto**, ou bloco hero de preço + detalhes — desde que os três produtos na ordem Landing → SaaS → App e os dados de cada um (preço, prazo, bullets, CTA) permaneçam evidentes.
- Destaque visual para **Landing Page** (preço âncora): hierarquia clara — border/fundo ligeiramente mais forte que SaaS/App.
- Preço em `font-display` grande no destaque; "a partir de" pode ir em label pequeno `zinc-500`.
- Inclusões: lista com ícone `Check` (`lucide-react`) cor `emerald-400` ou equivalente legível.
- CTA: botão primário `rounded-full` por produto; em layouts tabulares, área de clique clara por linha/bloco.
- Motion: reveal ou destaque ao rolar sem esconder preço ou condições.

## 4. Acessibilidade

- `<section aria-labelledby="oferta-heading">` com `<h2 id="oferta-heading">`.
- Cada produto dentro de `<article aria-labelledby="oferta-<slug>-title">` (ou linha equivalente em tabela/lista, mantendo rótulos associados).
- CTAs são `<a target="_blank" rel="noopener noreferrer">` com `aria-label` redundante ("Falar sobre landing page no WhatsApp").

## 5. Mensagens WhatsApp associadas

Em `src/app/lib/whatsapp-messages.ts`:

- `WA_MSG_OFFER_LANDING` — `Oi — abri a Oferta e quero a landing a partir de R$ 999. Quero alinhar escopo e data de publicação.`
- `WA_MSG_OFFER_SAAS` — `Oi — vim da Oferta, card SaaS. Preciso saber se vocês pegam meu sistema e qual é o próximo passo.`
- `WA_MSG_OFFER_APP` — `Oi — vim da Oferta, card aplicativo. Quero conversar sobre app ou PWA e próximos passos.`

## 6. Não fazer

- Não inverter a ordem dos cards. Landing vem primeiro, sempre (preço-âncora).
- Não esconder o "sob consulta" dos SaaS/App — a transparência sobre "conversamos antes" é parte da oferta.
- Não prometer suporte de mais de um mês gratuito sem revisar `product.md` antes.
- Não adicionar 4º card "pacote tudo-em-um" neste ciclo (fora de escopo).
