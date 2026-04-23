# Checklist — ShapeGrid (corpo) + Plasma (hero)

- [x] **Ler** `cycles/plan.md`, `cycles/scenarios.feature` e `cycles/request.md`.
- [x] **Actualizar spec (obrigatório):**
  - [x] `spec/features/shape-grid-background/readme.md` (criar)
  - [x] `spec/features/conversion-landing/sections/hero.md`
  - [x] `spec/features/conversion-landing/readme.md`
  - [x] `spec/performance-budget.md`
  - [x] `spec/accessibility.md`
  - [x] `spec/design-system.md`
  - [x] `spec/README.md`
- [x] **Implementar** `ShapeGrid` (canvas + `requestAnimationFrame`, resize, cleanup) com API alinhada ao pedido (`speed`, `squareSize`, `direction`, `borderColor`, `hoverFillColor`, `shape`, `hoverTrailAmount`, …).
- [x] **CSS canónico** do canvas (`.shapegrid-canvas`: absolute/fixed conforme readme, `z-index` 0, `opacity` ~0.35, `pointer-events: none`) + **interacção** sem bloquear cliques (ver readme).
- [x] **Integrar em `App.tsx`:** Plasma/hero inalterados; ShapeGrid apenas no **bloco pós-hero** (uma instância partilhada recomendada), com empilhamento de `z-index` que preserve Navbar e CTAs.
- [x] **Lazy / arranque tardio:** carregar ShapeGrid de forma que não prejudique LCP (ex.: `React.lazy` + `Suspense` e/ou idle, espelhando padrão do Plasma onde fizer sentido).
- [x] **`< 640px`:** sem animação contínua (ou grid estático — conforme teste rápido).
- [x] **`prefers-reduced-motion`:** animação do grid desligada.
- [x] **`pnpm run build`** sem erros.
- [ ] **QA manual** contra `cycles/scenarios.feature` (desktop, mobile estreito, reduced motion, scroll longo, cliques em CTA/links).
