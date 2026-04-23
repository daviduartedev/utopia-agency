# Spec hub — Utopia Studio

Este diretório é o **hub canônico** da Utopia: a fonte da verdade sobre **como o produto deve ser hoje**. Se um doc aqui divergir do código, o código está errado (ou o doc precisa ser atualizado antes do merge).

Arquivos de ciclo (plan/tasks/scenarios) vivem em `cycles/` e descrevem **delta** — *como chegamos no estado desejado*. Os docs aqui descrevem **estado** — *como é*.

## Estrutura

```
spec/
  README.md                 ← você está aqui
  product.md                Visão, ICP, posicionamento comercial.
  design-system.md          Tokens, tipografia, componentes base.
  content-guidelines.md     Tom de voz e blacklist canônica de clichês.
  integrations.md           WhatsApp + Supabase + afins.
  seo.md                    Metas, canonical, OG. Estado atual + TODOs.
  analytics.md              Eventos e ferramentas. Estado atual + TODOs.
  performance-budget.md     Budgets e decisões de performance.
  accessibility.md          WCAG baseline e convenções.
  privacy-lgpd.md           LGPD, cookies, páginas legais. Estado atual + TODOs.
  features/
    conversion-landing/     LP principal da Utopia.
      readme.md
      sections/             Um doc por seção da LP (estado atual).
    card-swap/              Componente reutilizável (pilha 3D) usado no portfólio.
      readme.md
    shape-grid-background/  Canvas de grelha animada no corpo da LP (não no hero).
      readme.md
```

## Convenções

1. **Datas e moeda**: PT-BR de 2026. Preços sempre com símbolo `R$` e espaço (ex.: `R$ 999`).
2. **Idioma**: todo conteúdo público e todos os docs em PT-BR.
3. **Ciclos** atualizam o spec como parte da "definição de pronto". Nada é "mergeado" com o spec desalinhado.
4. **TODOs** ficam em seções `## TODO (futuros ciclos)` no final do doc — não em comentários espalhados.
5. **Placeholders** (conteúdo fictício ainda não confirmado com cliente) ficam marcados `[placeholder]` no texto e listados ao final do doc.
6. **Nada de métricas inventadas**. Prova é qualitativa enquanto não houver dado real auditável.

## Features ativas

- [`features/conversion-landing/`](features/conversion-landing/readme.md) — Landing page pública da Utopia, focada em conversão para WhatsApp.
- [`features/card-swap/`](features/card-swap/readme.md) — `CardSwap` (GSAP), canónico na secção de portfólio.
- [`features/shape-grid-background/`](features/shape-grid-background/readme.md) — `ShapeGrid` (canvas 2D), fundo do corpo da LP; hero continua só com Plasma + gradiente.
