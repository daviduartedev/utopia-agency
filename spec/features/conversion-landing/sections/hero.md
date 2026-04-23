# Hero

**Componente:** `src/app/components/Hero.tsx` → `src/app/components/ui/cinematic-hero.tsx`.
**Posição:** 1ª seção, ocupa viewport cheio (`min-h-screen`).
**Âncora:** `#inicio`.

## 1. Objetivo de funil

Em poucos segundos, o visitante **reconhece a dor** (site que não gera contato), entende **quem resolve** (Utopia) e **como destravar** (WhatsApp). A promessa comercial concreta (7 dias, `R$ 999`) só entra na subheadline quando já houver contexto — ver `offer.md` / `product.md`.

## 2. Copy canônica

- **Eyebrow**: `Utopia Studio`
- **Headline (2 linhas)**:
  - linha 1 (tagline1): `Visitas chegam.`
  - linha 2 (tagline2): `Contato não entra.`
- **Subheadline** (`ctaDescription` no componente — uma frase, 14–28 palavras): `Seu site não explica o produto nem pede contato — a gente entrega uma landing page clara em até 7 dias, com valor e escopo na proposta.`
- **CTA primário** (`primaryCtaLabel`): `Quero falar agora` → `whatsappHref(WA_MSG_HERO)`.
- **Linha de confiança** (opcional, abaixo do CTA, `footnote`): `Proposta curta · resposta rápida · sem vitrine vazia`

Sem CTA secundário nesta etapa.

## 3. Visual

- Fundo: gradiente radial dark + `Plasma` (OGL/WebGL) lazy no desktop — **exclusivo desta secção**; o fundo animado em canvas **`ShapeGrid` não entra no hero** (ver `spec/features/shape-grid-background/readme.md` para o corpo da LP).
- Mobile estreito (< 640px): só gradiente (Plasma desabilitado — ver `spec/performance-budget.md`).
- Overlay: duas camadas de `bg-gradient` pretas para garantir contraste do texto.
- Tipografia do headline: `Fraunces` (display), `clamp(2.6rem, 6.5vw, 5rem)`, tracking `-0.03em`.

## 4. Estados

- `desktopPlasmaReady`: Plasma só entra após `requestIdleCallback` (ou `setTimeout` de 120ms como fallback). Enquanto não entra, o gradiente segura o LCP.

## 5. Acessibilidade

- `<h1>` único da página dentro deste componente.
- Plasma e overlays têm `aria-hidden`.
- Botão CTA com focus-ring visível sobre fundo escuro.

## 6. Não fazer

- Não adicionar um terceiro elemento de fundo **dentro do hero** (ex.: partículas adicionais nem `ShapeGrid` aqui).
- Não mover a âncora `#inicio` para outro componente.
- Não usar interrogação no headline nem verbos da blacklist (`content-guidelines.md` §4).
