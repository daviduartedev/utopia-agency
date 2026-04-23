# Depoimentos

**Componente (reescrito neste ciclo):** `src/app/components/Testimonials.tsx`.
**Posição:** 8ª secção.
**Âncora:** `#depoimentos`.

## 1. Objetivo de funil

Reforço de confiança qualitativa: mostrar que **pessoas reais** passaram pelo processo e saíram satisfeitas. Sem números inventados, sem frases "WOW".

## 2. Estrutura pós-ciclo

- **Implementação actual:** primeiro depoimento em **bloco em destaque** (gradiente + tipografia display); os outros cinco em **grid** de duas colunas com citação e barra lateral (`border-l`), sem masonry e sem `react-responsive-masonry`.

## 3. Copy canônica

- **Eyebrow**: `Depoimentos`
- **Title**: `Quem já passou por aqui`
- **Description**: `Voz de fundadores que precisavam de clareza, prazo e alguém no WhatsApp depois do ar.`

## 4. Depoimentos (placeholders plausíveis)

Todos os nomes, cargos e citações abaixo são **placeholders realistas**. Usamos **primeiro nome + papel** para evitar a sensação de "persona inventada" e porque o ICP (fundador solo) conversa melhor com iguais.

| # | Nome | Cargo / contexto | Citação |
|---|---|---|---|
| 1 | `Rafaela` | Fundadora • estúdio de design | `A landing saiu rápido e, pela primeira vez, o site fala com o cliente que a gente quer atrair — sem enrolação.` |
| 2 | `Diego` | Fundador • SaaS de RH | `Entregaram um painel SaaS direto, sem tela inútil. O time entrou no fluxo em poucos dias.` |
| 3 | `Tatiana` | Consultora solo | `Pedi prazo curto na proposta e foi o que aconteceu. Sinal pago, entrega em cima do combinado.` |
| 4 | `Bruno` | Co-founder • fintech early-stage | `Hoje a gente explica o produto numa frase e a página mostra a mesma coisa. Antes era só promessa vaga.` |
| 5 | `Isadora` | E-commerce de nicho | `Depois do ar continuaram no WhatsApp. Dúvida pequena não vira ticket eterno.` |
| 6 | `Pedro` | Fundador solo • SaaS B2B | `Orçamento legível, escopo enxuto. Serviu para validar a ideia antes de pensar em escala.` |

Avatares: **iniciais em círculo** (ex.: "RA") com gradiente suave por depoimento — evita foto stock e mantém o look premium do resto da página.

## 5. Visual

- `bg-page-surface py-20 md:py-28`.
- Superfícies de citação podem ser cartões, blocos tipo pull-quote ou slides — **tom** continua sóbrio (fundos escuros, bordas discretas).
- Tipografia: citação em `font-sans` 15–16px, nome em 14px peso 600, cargo em 12–13px `zinc-500`.
- Motion: entrada/saída ou reveal ao scroll; sem depender de animação contínua para ler o texto.

## 6. Acessibilidade

- Cada card usa `<blockquote>` com `<cite>` interna contendo nome e cargo (implementado).
- Ícone `Quote` decorativo (`aria-hidden`).
- Sem animações dependentes de scroll além do `whileInView` sutil em entrada.

## 7. Não fazer

- Não voltar ao marquee vertical em duas colunas em loop.
- Não inventar resultado numérico ("faturamos +400% em um mês").
- Não usar fotos stock de pessoas (Unsplash genérico) — iniciais em círculo ou o avatar neutro.

## 8. Placeholders

- Todos os 6 depoimentos acima são **fictícios**. Serão substituídos por reais assim que tivermos autorização escrita por cliente.
