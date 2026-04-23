# Feature — ShapeGrid (fundo do corpo da LP)

Canvas 2D com grelha geométrica animada, usado como **fundo decorativo** de toda a área da landing **abaixo do hero**. O hero mantém apenas **gradiente + Plasma** (ver `sections/hero.md`); este componente **não** é montado dentro do `CinematicHero`.

## 1. Objetivo

- Reforçar percepção de produto **premium / tecnológico** sem competir com copy nem CTAs.
- Complementar o Plasma (que fica **só** na primeira vista) com movimento **contínuo e subtil** no resto da página.

## 2. Comportamento

- **Forma:** quadrados (`shape="square"`), movimento diagonal ou equivalente definido por `direction`.
- **Interacção:** resposta ao ponteiro (ex.: realce de célula sob o cursor). **`hoverTrailAmount = 0`** — sem rasto prolongado.
- **Ponteiro e cliques:** o `<canvas>` usa `pointer-events: none` para não interceptar toques/cliques; o rastreio de posição faz-se via listener no `window`/`document` ou contentor ancestral com área de hit transparente, **sem** bloquear botões, links, inputs ou scroll.
- **Resize:** o canvas ajusta `width`/`height` ao DPI e ao tamanho do contentor (ou viewport, se fixed).
- **Lifecycle:** `useRef` para o canvas; `useEffect` para arranque; cleanup com `removeEventListener` + `cancelAnimationFrame`.
- **Loop:** `requestAnimationFrame`; pausar ou reduzir trabalho quando `document.hidden` é recomendado.

## 3. API de props (contrato)

Valores iniciais alinhados ao pedido do ciclo; podem ser refinados após QA visual:

| Prop | Exemplo | Notas |
|------|---------|--------|
| `speed` | `0.2`–`0.3` | Nunca aumentar ao ponto de distrair. |
| `squareSize` | `40` | Grelha legível em desktop. |
| `direction` | `"diagonal"` | |
| `borderColor` | `"#2F293A"` | Neutro escuro. |
| `hoverFillColor` | `"#222"` | Só realce subtil. |
| `shape` | `"square"` | |
| `hoverTrailAmount` | `0` | Sem rasto. |

Sem usar o ShapeGrid como elemento de conteúdo (títulos, ícones, dados).

## 4. CSS canónico (classe do canvas)

```css
.shapegrid-canvas {
  position: absolute; /* ou fixed se a instância for full-viewport; ver §5 */
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.14;
  pointer-events: none;
}
```

Opcional: gradiente escuro por cima do canvas (entre canvas e conteúdo) para uniformizar leitura — não substituir os overlays já definidos por secção se criarem conflito; preferir uma camada única no wrapper do corpo.

## 5. Montagem na LP (`App.tsx`)

- **Recomendado:** **uma** instância de `ShapeGrid` num wrapper partilhado do bloco pós-hero (evita N loops de animação). Posicionamento típico: `fixed` + `inset-0` com `z-index` **inferior** ao bloco do hero (`z-20` na montagem actual) e **inferior ou igual** ao stack de secções (`z-10`), para o hero continuar a tapar qualquer vestígio na primeira vista.
- Alternativa aceitável se testes falharem: contentor `absolute` no wrapper `relative` que envolve **só** as secções após o hero (altura mínima = conteúdo).

O conteúdo das secções permanece em contentores `relative z-10` (ou superior onde já existir).

- **Fundo das secções:** a classe utilitária `bg-section-over-gradient` deve manter-se **transparente** (ou equivalente) na área cheia da secção, para o canvas fixo não ficar tapado por preto opaco; cartões e blocos internos podem usar `bg-zinc-950/…` onde for preciso contraste.

## 6. Performance e mobile

- **Viewport `< 640px`:** não correr animação contínua — omitir o componente ou renderizar último frame / fundo estático; alinhar ao breakpoint do Plasma em `performance-budget.md`.
- **Carregamento:** lazy (`React.lazy` + `Suspense`) e/ou arranque após idle, para não competir com LCP do hero.
- **Após merge:** smoke manual com DevTools Performance em desktop; se CPU/GPU elevados, baixar `opacity`, `speed` ou pausar em tab em segundo plano.

## 7. Acessibilidade

- Canvas com `aria-hidden="true"` (decoração).
- **`prefers-reduced-motion: reduce`:** parar a animação (canvas estático ou unmount).

## TODO (futuros ciclos)

- Toggle heurístico para “dispositivo fraco” (ex.: `hardwareConcurrency`, `saveData`) se o produto exigir.
- Tema claro: hoje a LP é dark-first; se existir modo claro, rever cores do grid.
