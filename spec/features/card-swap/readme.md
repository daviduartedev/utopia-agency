# Feature (componente) — CardSwap

Pilha de cartões em perspectiva 3D com rotação **automática** em ciclo, implementada com **GSAP** (padrão ReactBits). A finalidade no produto Utopia é, neste estado, a **apresentação dos cases na secção** [`../conversion-landing/sections/portfolio.md`](../conversion-landing/sections/portfolio.md).

## Implementação

| Item | Valor canónico |
|---|---|
| Código | `src/app/components/CardSwap/` (`CardSwap.tsx`, `Card`, `index.ts`, `README` na pasta) |
| Animação | `gsap` (já dependência do projeto) |
| Estilos | Preferir Tailwind + tokens; CSS module ou estilos locais só se necessário para 3D |

## Comportamento contratual

- Troca cíclica: o cartão de cima “sai” e volta à **retaguarda**; os restantes avançam.
- `prefers-reduced-motion: reduce` → **sem** rotação automática; pilha **estática** (o visitante ainda vê a lista de conteúdos, não uma animação equivalente no tempo).
- Opcional: pausa enquanto o pointer está sobre a região (`pauseOnHover` ou equivalente documentado na implementação do portfólio).
- Mínimo de cartões: 2 ou mais (o portfólio tem seis; o componente deve suportar N genérico).

## Atribuição

Lógica e padrão visual baseados no **CardSwap** de [React Bits](https://reactbits.dev/components/card-swap) (licença MIT + Commons Clause no repositório de origem). A pasta do componente inclui nota curta; não é necessário duplicar a licença fora de `CardSwap/README.md` e referências técnicas.

## TODO (futuros ciclos)

- Controlo explícito anterior/seguinte, se a UX passar a exigir padrão tipo carrossel.
- Uso noutra secção além do portfólio, se o design system precisar de variação de tamanho/tema.
