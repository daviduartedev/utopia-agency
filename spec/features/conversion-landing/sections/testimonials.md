# Depoimentos

**Componente (reescrito neste ciclo):** `src/app/components/Testimonials.tsx`.
**Posição:** 8ª seção.
**Âncora:** `#depoimentos`.

## 1. Objetivo de funil

Reforço de confiança qualitativa: mostrar que **pessoas reais** passaram pelo processo e saíram satisfeitas. Sem números inventados, sem frases "WOW".

## 2. Estrutura pós-ciclo

- Substituir o **marquee vertical em duas colunas** atual por um **grid masonry estático** usando `react-responsive-masonry` (já em `package.json`).
- 3 colunas no desktop, 2 no tablet, 1 no mobile.
- Sem auto-scroll, sem marquee, sem animação de coluna. Um hover sutil no border é aceitável.

## 3. Copy canônica

- **Eyebrow**: `Depoimentos`
- **Title**: `O que dizem nossos clientes`
- **Description**: `Feedback de quem confiou na Utopia para landing pages, produtos SaaS e apps.`

## 4. Depoimentos (placeholders plausíveis)

Todos os nomes, cargos e citações abaixo são **placeholders realistas**. Usamos **primeiro nome + papel** para evitar a sensação de "persona inventada" e porque o ICP (fundador solo) conversa melhor com iguais.

| # | Nome | Cargo / contexto | Citação |
|---|---|---|---|
| 1 | `Rafaela` | Fundadora • estúdio de design | `A landing saiu em menos de duas semanas e, pela primeira vez, o site conversa com o cliente que a gente quer atrair.` |
| 2 | `Diego` | Fundador • SaaS de RH | `A Utopia me entregou um painel SaaS direto, sem tela inútil. Entramos no ritmo em poucos dias — o time adotou sem atrito.` |
| 3 | `Tatiana` | Consultora solo | `Pedi site em até 7 dias e foi o que aconteceu. Proposta curta, sinal e entrega em cima do cronograma.` |
| 4 | `Bruno` | Co-founder • fintech early-stage | `O que mudou foi a clareza: a gente consegue explicar o produto em uma frase e a página mostra exatamente isso.` |
| 5 | `Isadora` | E-commerce de nicho | `Depois do lançamento, eles continuaram disponíveis pelo WhatsApp. Dúvida rápida vira conversa, não chamado novo.` |
| 6 | `Pedro` | Fundador solo • SaaS B2B | `Orçamento claro, escopo enxuto e entrega rápida. Serviu exatamente para eu validar a ideia antes de escalar.` |

Avatares: **iniciais em círculo** (ex.: "RA") com gradiente suave por depoimento — evita foto stock e mantém o look premium do resto da página.

## 5. Visual

- `bg-page-surface py-20 md:py-28`.
- Cards: `bg-white/[0.03]` ou `bg-black/20`, border `white/10`, radius `2xl`, padding `p-6 md:p-7`.
- Tipografia: citação em `font-sans` 15–16px, nome em 14px peso 600, cargo em 12–13px `zinc-500`.

## 6. Acessibilidade

- Cada card usa `<blockquote>` com `<cite>` interna contendo nome e cargo (implementado).
- Ícone `Quote` decorativo (`aria-hidden`).
- Sem animações dependentes de scroll além do `whileInView` sutil em entrada.

## 7. Não fazer

- Não manter em paralelo o marquee vertical antigo.
- Não inventar resultado numérico ("faturamos +400% em um mês").
- Não usar fotos stock de pessoas (Unsplash genérico) — iniciais em círculo ou o avatar neutro.

## 8. Placeholders

- Todos os 6 depoimentos acima são **fictícios**. Serão substituídos por reais assim que tivermos autorização escrita por cliente.
