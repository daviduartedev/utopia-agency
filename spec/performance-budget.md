# Performance budget

Este ciclo **não altera** a performance nem instrumenta budgets. O que segue é o contrato implícito atual e o que está em vigor via arquitetura.

## 1. Contrato implícito atual

- Hero renderiza no chunk inicial. Plasma (OGL/WebGL) é **lazy** (`React.lazy`), só carrega após `requestIdleCallback` no desktop e nunca em mobile estreito (< 640px). Fallback visual é um gradiente radial.
- Seções abaixo do hero são todas **code-split** via `src/app/lazy-pages.tsx` + `LazySection` + `Suspense`, com `minHeight` explícito para não quebrar layout antes do chunk chegar.
- Marquees e colunas em animação pausam quando fora do viewport (`section-anim-paused` em `theme.css`), reduzindo uso de CPU/GPU.
- Imagens de portfólio e testimonials usam `loading="lazy"` + `decoding="async"` + `sizes`.
- `prefers-reduced-motion` é respeitado para marquees.

## 2. Dependências pesadas em uso

| Lib | Uso | Risco |
|---|---|---|
| `gsap` + `lenis` | smooth-scroll e ScrollStack | grande; mitigado por ser lazy junto com a seção Serviços |
| `framer-motion` / `motion` | entrada de seções | médio; tree-shaking ok |
| `@tsparticles/*` | disponível, **não usado** na LP | risco de import acidental — cuidado em PR |
| `ogl` | Plasma do hero | médio; lazy + skip em mobile |
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
