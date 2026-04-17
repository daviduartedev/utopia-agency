# Hero

**Componente:** `src/app/components/Hero.tsx` → `src/app/components/ui/cinematic-hero.tsx`.
**Posição:** 1ª seção, ocupa viewport cheio (`min-h-screen`).
**Âncora:** `#inicio`.

## 1. Objetivo de funil

Em até 5 segundos, o visitante entende:
- **O que** a Utopia entrega (produto digital);
- **Para quem** (negócio que quer vender);
- **Como começar** (um clique, WhatsApp).

## 2. Copy canônica

- **Eyebrow**: `Utopia Studio`
- **Headline (2 linhas)**:
  - linha 1 (tagline1): `Produto digital`
  - linha 2 (tagline2): `pronto para vender`
- **Subheadline**: `Agência focada em landing pages, sistemas SaaS e aplicativos: briefing objetivo, prazos curtos e entrega eficiente — sem abrir mão do acabamento premium.`
- **CTA primário**: `Quero meu projeto agora` → `whatsappHref(WA_MSG_HERO)`.

Sem CTA secundário nessa etapa (ciclo atual).

## 3. Visual

- Fundo: gradiente radial dark + `Plasma` (OGL/WebGL) lazy no desktop.
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

- Não adicionar um terceiro elemento de fundo (ex.: partículas adicionais).
- Não mover a âncora `#inicio` para outro componente.
- Não trocar a headline por algo com a palavra "transforme" (blacklist).
