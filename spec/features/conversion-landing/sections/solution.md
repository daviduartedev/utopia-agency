# Solução — Serviços

**Componente:** `src/app/components/OfferingsScrollStack.tsx`.
**Posição:** 4ª seção (depois de ClientLogos).
**Âncora:** `#ofertas` (mantida por retrocompatibilidade de navegação).

> Apesar do id `#ofertas`, esta seção apresenta os **serviços** como solução. A seção comercial com preço se chama `Offer` e tem id próprio — ver `offer.md`.

## 1. Objetivo de funil

Depois de a dor ser nomeada (seção Problema), esta seção mostra **em que formatos** a Utopia responde: Landing Page, Sistema SaaS, Aplicativo.

## 2. Copy canônica

- **Title**: `Nossos serviços`
- **Description**: `Landing pages, sistemas SaaS e aplicativos — três formatos, um mesmo padrão de entrega.`

### Três cards (ordem fixa)

1. **Landing pages** — kicker `Conversão e clareza`
   Body: `Landing pages e sites de produto para converter visita em contato. Mensagem clara, layout objetivo e performance real.`

2. **Sistemas SaaS** — kicker `Operação e escala`
   Body: `Sistemas SaaS e painéis customizados para sua equipe operar e medir. Integrações sólidas e escala sem gargalo técnico.`

3. **Aplicativos** — kicker `Mobile & PWA`
   Body: `Aplicativos mobile e PWA com fluxos simples e onboarding inteligente. Experiência pensada para o uso no dia a dia.`

> Copy ajustada do original: "converter visita em lead" → "converter visita em contato" (alinhamento com o vocabulário do request).

## 3. Visual

- Desktop: `ScrollStack` (3 cards que empilham no scroll) com `baseScale 0.88`, `itemScale 0.038`, `stackPosition 21%`.
- Mobile estreito: fallback de 3 cards empilhados em coluna simples (sem ScrollStack) — `useIsNarrowMobile()`.
- Cada card: background image Unsplash otimizada (`w=1400 q=80` desktop, `w=720 q=68` mobile) + véu `bg-page-surface/45` + texto embaixo.

## 4. CTA

Nenhum CTA explícito por card. O card serve de apresentação; a conversão acontece no bloco `Offer` (seção 9) e nos CTAs persistentes.

## 5. Acessibilidade

- `<section aria-labelledby="ofertas-heading">`.
- Imagens de fundo com `aria-hidden` (são decorativas; o texto em cima carrega o conteúdo).

## 6. Não fazer

- Não mudar `#ofertas` para outra âncora sem atualizar `Navbar` e `Footer` juntos.
- Não reordenar os três cards — Landing é a porta de entrada comercial (preço-âncora), vem primeiro.
