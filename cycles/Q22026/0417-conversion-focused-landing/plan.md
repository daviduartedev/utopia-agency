# Plan — Conversion-focused Landing Page (delta)

**Cycle:** `Q22026/0417-conversion-focused-landing`
**Feature canonical spec:** [`spec/features/conversion-landing/`](../../../spec/features/conversion-landing/readme.md)
**Tipo de entrega:** rework incremental da LP existente em `src/app/`.

---

## 1. Objetivo do ciclo (estado canônico + refinamento)

### 1.1 Entrega já coberta pelo plano anterior

Reestruturar a landing da Utopia para cumprir a estrutura de funil (Hero → Problema → … → Oferta → CTA), novas seções Problema/Oferta, Portfólio/Depoimentos refeitos, auditoria de copy, hub `spec/`, etc. — conforme histórico do repositório e `tasks.md` já executado.

### 1.2 Refinamento acordado (este documento, pós-respostas)

**Problema:** Todas as seções **Oferta**, **Depoimentos**, **Como funciona**, **Por que a Utopia (diferenciais)** e **Problema** não podem parecer **cinco variações do mesmo card sombreado**. Cada uma deve ter um **layout com intenção própria** (ritmo, hierarquia, superfície), equilibrando impacto visual e custo de bundle.

**Oferta:** O formato **não** precisa permanecer em três colunas de cards; aceita-se tabela, accordion por produto, comparador ou outro padrão, desde que a **copy, preços, inclusões, CTAs WhatsApp e barra de condições** permaneçam conforme `spec/features/conversion-landing/sections/offer.md` e mensagens em `integrations.md` / `whatsapp-messages.ts`.

**Fora do escopo deste refinamento:** Hero, Logos de clientes, Serviços (`ScrollStack`), Portfólio, FAQ, CTA final, Formulário, Footer, Navbar — **sem redesenho estrutural** só por este delta. (Ajustes mínimos de integração visual ou motion global que não alterem copy/ordem podem ocorrer.)

**Design system:** Este ciclo **pode relaxar** levemente cores/superfícies sem abandonar o posicionamento premium (vide `design-system.md` § atualização).

**Motion:** Introduzir sensação **moderna (referência Webflow/Framer)** — animações de **entrada e saída ao rolar** (e coerência na LP), respeitando `prefers-reduced-motion`. Escopo preferencial: sistema de motion reutilizável + aplicação forte nas **cinco seções** nomeadas; extensão ao restante da página onde for barato e sem redesenhar seções fora de escopo.

**Bibliotecas:** Pode-se remover ou adicionar dependências **à escolha** (incl. referências como 21st.dev / React Bits), priorizando libs **confiáveis** e impacto aceitável no bundle.

**Conteúdo:** Copy, número de itens, ordem, mensagens WhatsApp e regras comerciais **permanecem** os dos arquivos em `spec/features/conversion-landing/sections/*.md` — mudança só de **apresentação**.

**Acessibilidade:** Sem requisitos **adicionais** além do baseline já descrito nos section docs (landmarks, headings, foco onde já exigido). Carrossel com requisitos extra de teclado **não** é obrigatório para este refinamento onde não houver carrossel.

**Qualidade:** QA manual dos cenários em `scenarios.feature`; sem obrigação de checklist por screenshot nem gate formal de Lighthouse.

---

## 2. Delta contra specs anteriores (refinamento visual)

| Área | Antes (implícito) | Depois (acordado) |
|------|-------------------|-------------------|
| Problema, Diferenciais, Como funciona, Depoimentos, Oferta | Vários padrões baseados em cards (`SpotlightCard`, `BentoGrid`, masonry, grid de ofertas) podendo **parecer** o mesmo tipo de bloco | Padrões **visualmente distintos** entre si; não “cinco cards com canto arredondado” |
| Oferta | Três cards em grid | Formato **livre** mantendo conteúdo canônico |
| Motion | Principalmente `whileInView` de entrada em seções | Entrada **e** saída / parallax leve ao scroll onde fizer sentido, estilo produção alta |
| Outras seções | — | **Sem** obrigação de redesenho além do necessário para motion global |

---

## 3. Direções de layout sugeridas (não prescritivas)

O implementador escolhe os padrões finais; exemplos de **diferenciação** aceitáveis:

- **Problema:** coluna editorial + lista numerada, timeline vertical ou painel dividido — evitando três tiles idênticos.
- **Diferenciais:** faixas alternadas full-width, grade assimétrica ou “feature rails” — não apenas grade 2×2 de cards iguais.
- **Como funciona:** passos em linha com conectores, ou vertical com trilha — reduzindo homogeneidade dos cinco blocos iguais.
- **Depoimentos:** destaque assimétrado + secundários, carrossel de citações com snap, ou colunas com pesos diferentes — evitando “masonry de mesmos retângulos”.
- **Oferta:** tabela comparativa, accordion por linha de produto, ou hero de preço + detalhes — desde que LP/SaaS/App e condições fiquem claros.

Referências de inspiração: [21st.dev — componentes](https://21st.dev/community/components), [React Bits](https://reactbits.dev/).

---

## 4. Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Bundle crescer demais | Lazy-load de seções já existente; motion compartilhado; medir antes/depois informalmente |
| Excesso de animação | Respeitar `prefers-reduced-motion`; evitar loop pesado em foreground |
| Oferta confusa em formato novo | Revisar contra `offer.md` linha a linha (preço, parcelas, sinal, bullets, três produtos) |
| Perda de coerência de marca | Manter `SectionHeader`, tipografia base e tom da copy; relaxamento só dentro do guardrail em `design-system.md` |

---

## 5. Critério de pronto do refinamento

- `spec/features/conversion-landing/` e `spec/design-system.md` refletem layouts e motion acordados.
- Implementação: as cinco seções nomeadas são **claramente distinguíveis** como padrões diferentes (revisão visual rápida).
- Cenários novos/atualizados em `scenarios.feature` validados manualmente.
- Nenhuma regressão de conteúdo versus `sections/*.md` para Oferta, Problema, Depoimentos, Diferenciais, Como funciona.

---

## 6. Decisões de dependências (implementação)

- **`react-responsive-masonry`:** removida — depoimentos passaram a ser bloco em destaque + citações em lista com borda esquerda (sem masonry).
- **Animação:** nenhuma lib nova; uso de `motion` + utilitários em `src/app/lib/motion-pref.ts`.
- **Oferta:** `@radix-ui/react-accordion` (já na stack) via `src/app/components/ui/accordion.tsx`.
