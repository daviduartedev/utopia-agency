# Performance budget

Documento vivo: o contrato abaixo reflete a arquitetura atual da LP e é **atualizado** quando ciclos de refinamento introduzem novos custos. Ainda **não** há instrumentação automática de budget em CI.

## 1. Contrato implícito atual

- Hero renderiza no chunk inicial. Plasma (OGL/WebGL) é **lazy** (`React.lazy`), só carrega após `requestIdleCallback` no desktop e nunca em mobile estreito (< 640px). Fallback visual é um gradiente radial.
- **ShapeGrid** (canvas 2D no **corpo** da LP, abaixo do hero): animação contínua **apenas** em viewports **≥ 640px**; abaixo disso o componente fica omitido ou reduzido a fundo estático. Preferir **uma instância** partilhada + lazy/idle para não competir com LCP; `requestAnimationFrame` com cleanup; pausa em `prefers-reduced-motion` (ver `spec/features/shape-grid-background/readme.md`).
- Seções abaixo do hero são todas **code-split** via `src/app/lazy-pages.tsx` + `LazySection` + `Suspense`, com `minHeight` explícito para não quebrar layout antes do chunk chegar.
- Marquees e colunas em animação pausam quando fora do viewport (`section-anim-paused` em `theme.css`), reduzindo uso de CPU/GPU.
- Imagens de portfólio e testimonials usam `loading="lazy"` + `decoding="async"` + `sizes`.
- `prefers-reduced-motion` é respeitado para marquees e demais animações conforme `motion-pref.ts` e `theme.css`.

## 2. Dependências pesadas em uso

Ciclos de **refinamento visual** podem trocar ou acrescentar libs leves de layout/animação nas seções centrais; manter **lazy-loading** de seções e preferir reutilizar `motion` antes de importar novos pesos. Depoimentos deixou de usar `react-responsive-masonry` (removido do `package.json`) em favor de layout editorial + grid.

| Lib | Uso | Risco |
|---|---|---|
| `gsap` + `lenis` | smooth-scroll e legado em seções lazy | grande; mitigado por lazy; evitar expandir o uso a novos blocos sem medir |
| `framer-motion` / `motion` | entrada de seções; transições ao scroll no refinamento | médio; tree-shaking ok |
| `@tsparticles/*` | disponível, **não usado** na LP | risco de import acidental — cuidado em PR |
| `ogl` | Plasma do hero | médio; lazy + skip em mobile |
| Canvas `ShapeGrid` | fundo geométrico pós-hero | baixo–médio; uma instância; skip < 640px; lazy/idle |
| `recharts`, `react-dnd`, `react-day-picker`, `vaul` | disponíveis, **não usados** na LP | idem — não importar em arquivos da LP |

## 3. Alvos informativos (sem gate ainda)

Sem CI de Lighthouse. Os números abaixo servem apenas como referência para revisão manual; não bloqueiam merge.

- LCP mobile (4G simulado): **≤ 3.0s**.
- CLS: **≤ 0.05**.
- INP: **≤ 200ms**.
- Peso inicial da home (sem Plasma): **≤ 300 KB gzip**.

## TODO (futuros ciclos)

- Integrar Lighthouse CI e publicar budgets como gate de PR.
- Auditar uso real de `react-slick` e `embla-carousel-react` (usamos só um) e desinstalar o que ficar ocioso.
- Avaliar trocar `gsap` por motion puro em `ScrollStack` se viável sem regressão visual.
- Medir impacto real do Plasma em desktop low-end; se LCP piorar, trocar por still de fundo estático.
