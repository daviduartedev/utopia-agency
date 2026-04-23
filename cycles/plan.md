# Plano (delta) — ShapeGrid no corpo da LP + Plasma só no hero

**Pedido:** `cycles/request.md`  
**Respostas consolidadas:**

- **Plasma:** permanece **apenas** no hero (`CinematicHero`), sem ShapeGrid no mesmo bloco.
- **ShapeGrid:** fundo animado contínuo para **toda a área da landing abaixo do hero** (visitante percebe o mesmo padrão geométrico subtil ao longo das secções), independente do Plasma.
- **Empilhamento / performance (1.2):** definir na implementação com **validação manual** (desktop médio, scroll longo, DevTools Performance): preferir **uma única instância** de canvas (ex.: `position: fixed` + `z-index` abaixo do stack de secções e abaixo do hero) para não multiplicar `requestAnimationFrame`; se métricas ou jank justificarem, ajustar `opacity`, `speed`, pausa em `document.hidden` ou desactivação em viewport estreito.
- **Interacção (2.1):** obrigatoriamente **interactivo** (resposta ao ponteiro), **sem rasto** (`hoverTrailAmount = 0`). O canvas mantém-se **não bloqueante** para cliques: `pointer-events: none` no canvas e rastreio de ponteiro a nível de `document` ou contentor pai (ver `spec/features/shape-grid-background/readme.md`).
- **Código de referência (6.1):** não há componente externo completo — **implementar** `ShapeGrid` no repo com a API de props do pedido (`useRef`, `useEffect`, cleanup de listeners + `cancelAnimationFrame`, resize do canvas).

## Estado alvo (vs. spec anterior)

- **Hero:** inalterado quanto a copy e hierarquia; fundo continua **gradiente + Plasma** (lazy + idle), sem acrescentar ShapeGrid nem “terceiro” animado no mesmo bloco.
- **Corpo da LP:** novo fundo **ShapeGrid** (grelha quadrada, movimento suave, cores escuras/neutras, opacidade baixa) por trás de todas as secções montadas **após** o `<Hero />` em `App.tsx`, com conteúdo e CTAs sempre acima e legíveis.
- **Mobile / motion:** alinhar ao contrato existente do Plasma — **viewport estreito `< 640px`:** ShapeGrid **desligado ou substituído por fundo estático** (implementação escolhe o que medir melhor); **`prefers-reduced-motion: reduce`:** animação do grid **parada** (frame estático ou componente não montado).
- **Documentação canónica:** novo `spec/features/shape-grid-background/readme.md`; actualizações em `hero.md`, `performance-budget.md`, `accessibility.md`, `design-system.md`, `spec/README.md`, `conversion-landing/readme.md`.

## Decisões explícitas

| Tema | Decisão |
|------|---------|
| ShapeGrid no hero? | **Não.** Só Plasma + gradientes/overlays no hero. |
| Uma vs N canvases | **Uma instância** por defeito no plano; N instâncias só se testes mostrarem necessidade (improvável). |
| Breakpoint “mobile” | **`< 640px`**, coerente com `useIsNarrowMobile` / Plasma (`performance-budget.md`). |
| Toggle “dispositivo fraco” | **Fora deste ciclo**; deixar como TODO opcional no readme da feature se sobrar capacidade. |

## Actualização canónica (spec)

- `spec/features/shape-grid-background/readme.md` — contrato técnico (props, CSS, z-index, interacção, lifecycle).
- `spec/features/conversion-landing/sections/hero.md` — clarificar que o Plasma não se estende às outras secções; ShapeGrid não entra no hero.
- `spec/features/conversion-landing/readme.md` — nota sobre dupla camada visual (Plasma no hero + ShapeGrid no corpo).
- `spec/performance-budget.md` — linha sobre custo do canvas ShapeGrid + política lazy / mobile.
- `spec/accessibility.md` — decoração, `aria-hidden`, reduced motion.
- `spec/design-system.md` — stack de efeitos de fundo.
- `spec/README.md` — entrada em `features/`.

## Fora de escopo

- Trocar ou remover o Plasma do hero (mantém-se).
- Alterar copy, ordem de secções ou CTAs.
- Instrumentação Lighthouse CI (permanece TODO global no budget).
