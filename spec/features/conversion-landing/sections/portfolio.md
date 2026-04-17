# Portfólio

**Componente (reescrito neste ciclo):** `src/app/components/Portfolio.tsx`.
**Posição:** 7ª seção.
**Âncora:** `#portfolio`.

## 1. Objetivo de funil

Mostrar de forma tangível **o tipo de entrega** que a Utopia faz — LP de produto, sistema interno, app de agendamento. Evidência qualitativa, sem métrica inventada.

## 2. Estrutura pós-ciclo

- Substituir o **marquee horizontal infinito** atual por um **carrossel horizontal com snap** usando `embla-carousel-react` (já em `package.json`).
- Controles visíveis: botões `Prev` / `Next`, drag com mouse, swipe em touch, setas do teclado quando o container tem foco.

Opções do Embla (referência):
```ts
{ loop: true, align: "start", dragFree: false, skipSnaps: false, containScroll: "trimSnaps" }
```

## 3. Copy canônica

- **Eyebrow**: `Portfólio`
- **Title**: `Trabalhos selecionados`
- **Description**: `Alguns tipos de entrega — do site de produto ao app que a equipe usa no dia a dia.`

## 4. Cases (placeholders realistas)

Lista canônica. Enquanto não houver autorização dos clientes reais, mantêm-se nomes genéricos já usados no `public/` + 2 adicionais a criar neste ciclo.

| # | Título visível | Imagem | Layout |
|---|---|---|---|
| 1 | `ERP para lojistas` | `/portfolio-movix-erp.png` | `web` |
| 2 | `LP para loja de painéis solares` | `/portfolio-emera-solar.png` | `web` |
| 3 | `App de agendamento para barbearia` | `/portfolio-appweb-barbearia.png` | `phone` |
| 4 | `Painel administrativo para clínica` | `[placeholder]` | `web` |
| 5 | `Site institucional com blog` | `[placeholder]` | `web` |

Legendas abaixo do slide: **título + 1 frase de escopo** (ex.: `ERP para lojistas — catálogo, estoque e pedidos num painel único.`). **Nunca** incluir "+X%" ou "+N leads" (regra `content-guidelines.md`).

## 5. Visual

- Largura máxima do slide web ~`820px` (viewport menos margens); altura pela proporção **880×550** (mesma escala que antes, só um pouco menor em telas largas). Phone: 250×550.
- Fades laterais (mask) mantidos para lembrar ao usuário que há mais cases fora do viewport.
- Radius `rounded-[15px]`, border `border-[0.5px] border-transparent` (mantida para evitar serrilhado).

## 6. Acessibilidade

- Container: `role="region"` + `aria-roledescription="carousel"` + `aria-label="Trabalhos selecionados"`.
- Cada slide: `aria-roledescription="slide"` + `aria-label="Case N de Total"`.
- Botões `prev`/`next` com `aria-label` em texto ("Ver case anterior", "Ver próximo case").
- Teclado: quando o container estiver focado, `ArrowLeft` / `ArrowRight` devem navegar (hook do Embla).
- `prefers-reduced-motion`: desativar o auto-scroll (se houver) e a animação de transição (Embla suporta via plugin ou via CSS).

## 7. Estados

- Sem auto-play por padrão. Se for habilitado no futuro, pausar em `hover`/`focus` e respeitar `prefers-reduced-motion`.
- Loop infinito habilitado.

## 8. Não fazer

- Não manter em paralelo o marquee antigo. O componente fica com uma única abordagem.
- Não adicionar paginação (bolinhas) — as laterais em fade + botões Prev/Next já dão o recado.
- Não inventar métricas nos cards.

## 9. Placeholders

- Cases 4 e 5 (`Painel administrativo para clínica`, `Site institucional com blog`) precisam de screenshots. Enquanto não existirem, usar retângulos escuros com título textual (aceitável) ou gerar mocks simples em `public/portfolio-placeholder-<slug>.png`.
