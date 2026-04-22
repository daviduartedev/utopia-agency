# Solução — Serviços

**Componente:** `src/app/components/OfferingsScrollStack.tsx` (nome do arquivo pode permanecer; o **layout interno** deve seguir este spec e não é mais prescrito como `ScrollStack` empilhando três cartões no scroll).
**Posição:** 4ª seção (depois de ClientLogos).
**Âncora:** `#ofertas` (mantida por retrocompatibilidade de navegação).

> Apesar do id `#ofertas`, esta seção apresenta os **serviços** como solução. A seção comercial com preço se chama `Offer` e tem id próprio — ver `offer.md`.

## 1. Objetivo de funil

Depois de a dor ser nomeada (seção Problema), esta seção mostra **em que formatos** a Utopia responde: Landing Page, Sistema SaaS, Aplicativo.

## 2. Copy canônica

- **Title**: `Nossos serviços`
- **Description**: `Landing pages, sistemas SaaS e aplicativos — três formatos, um mesmo padrão de entrega.`

### Três cards (ordem fixa)

1. **Landing pages** — kicker `Conversão e clareza`
   Body: `Landing pages e sites de produto para converter visita em contato. Mensagem clara, layout objetivo e performance real.`

2. **Sistemas SaaS** — kicker `Operação e escala`
   Body: `Sistemas SaaS e painéis customizados para sua equipe operar e medir. Integrações sólidas e escala sem gargalo técnico.`

3. **Aplicativos** — kicker `Mobile & PWA`
   Body: `Aplicativos mobile e PWA com fluxos simples e onboarding inteligente. Experiência pensada para o uso no dia a dia.`

> Copy ajustada do original: "converter visita em lead" → "converter visita em contato" (alinhamento com o vocabulário do request).

## 3. Visual

- Cabeçalho: `SectionHeader` com `compactDescription` — margem entre o `h2` e o parágrafo um pouco menor que o padrão global.
- **Formato livre (ciclo atual):** a apresentação dos três serviços **não** usa mais o padrão canônico de três cartões com **`ScrollStack`** empilhando no scroll. O implementador escolhe um arranjo **claramente diferenciado** (ex.: faixas horizontais alternadas, painel em destaque + secundários, bento assimétrico, sequência editorial), mantendo a ordem e a copy dos três itens.
- Imagens de apoio (se houver) continuam otimizadas (`loading`/`sizes` adequados) e não devem competir com o texto.
- Mobile estreito (`<640px`): priorizar leitura e rolagem fluida; evitar gestos ou efeitos que dependam de scroll “preso”.

## 4. CTA

Nenhum CTA explícito por card. O card serve de apresentação; a conversão acontece no bloco `Offer` (seção 9) e nos CTAs persistentes.

## 5. Acessibilidade

- `<section aria-labelledby="ofertas-heading">`.
- Imagens de fundo com `aria-hidden` (são decorativas; o texto em cima carrega o conteúdo).

## 6. Não fazer

- Não mudar `#ofertas` para outra âncora sem atualizar `Navbar` e `Footer` juntos.
- Não reordenar os três cards — Landing é a porta de entrada comercial (preço-âncora), vem primeiro.
- Não voltar ao layout canônico antigo de **três cartões + `ScrollStack`** como padrão principal desta seção neste ciclo.
