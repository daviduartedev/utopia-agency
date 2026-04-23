# CardSwap (React Bits — JS + CSS)

Baseado no pacote **@react-bits/CardSwap-JS-CSS** (instalação: `npx shadcn@latest add @react-bits/CardSwap-JS-CSS` quando o projecto tiver `components.json`). Lógica e estilos alinhados à documentação [React Bits](https://reactbits.dev/components/card-swap) (GSAP, `makeSlot`, `placeNow`, `card-swap-container` com `perspective` e transform).

- **`CardSwap.tsx`** — TypeScript, `onFrontIndexChange` (índice do filho da **frente**), `prefers-reduced-motion` (só posiciona, sem intervalo), `pauseOnHover` opcional.
- **`CardSwap.css`** — `.card` e `.card-swap-container`; tokens Utopia (bordas, fundo `#0a0a0a`).

Uso canónico: `Portfolio.tsx` (stack com `CasePreview` e legenda abaixo).

| Prop | Notas |
| --- | --- |
| `width` / `height` | Números (px) no estilo do snippet |
| `easing` | `elastic` \| `linear` (mapeado a `power1.inOut` quando linear) |
| `onFrontIndexChange` | Extra: sincronizar título/legenda fora do stack |
