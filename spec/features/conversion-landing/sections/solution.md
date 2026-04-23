# Solução — Serviços

**Componente:** `src/app/components/OfferingsScrollStack.tsx` (nome do arquivo pode permanecer; o **layout interno** deve seguir este spec e não é mais prescrito como `ScrollStack` empilhando três cartões no scroll).
**Posição:** 4ª secção (depois de ClientLogos).
**Âncora:** `#ofertas` (mantida por retrocompatibilidade de navegação).

> Apesar do id `#ofertas`, esta secção apresenta os **serviços** como solução. A secção comercial com preço chama-se `Offer` e tem id próprio — ver `offer.md`.

## 1. Objetivo de funil

Depois de a dor ser nomeada (secção Problema), esta secção mostra **em que formatos** a Utopia responde: cada formato liga-se ao problema de **clareza, prazo e contato**.

## 2. Copy canônica

- **Title**: `O que a gente constrói pra você`
- **Description**: `Landing page, SaaS ou app — três formatos com o mesmo jeito de entregar: direto, com prazo escrito e conversa no WhatsApp.`

### Três cards (ordem fixa)

1. **Landing pages** — kicker `Contato, não vitrine`
   Body: `Página de produto que diz o que você vende em segundos, leva o visitante pro WhatsApp ou pro formulário, e carrega rápido no celular.`

2. **Sistemas SaaS** — kicker `Operação no painel`
   Body: `Painéis e SaaS sob medida: login, dados e fluxos que sua equipe usa no dia a dia, sem virar projeto eterno de agência.`

3. **Aplicativos** — kicker `Uso no bolso`
   Body: `App mobile ou PWA com telas enxutas: o cliente agenda, paga ou acompanha pedido sem fricção.`

## 3. Visual

- Cabeçalho: `SectionHeader` com `compactDescription` — margem entre o `h2` e o parágrafo um pouco menor que o padrão global.
- **Formato livre (ciclo actual):** a apresentação dos três serviços **não** usa mais o padrão canónico de três cartões com **`ScrollStack`** empilhando no scroll. O implementador escolhe um arranjo **claramente diferenciado** (ex.: faixas horizontais alternadas, painel em destaque + secundários, bento assimétrico, sequência editorial), mantendo a ordem e a copy dos três itens.
- Imagens de apoio (se houver) continuam otimizadas (`loading`/`sizes` adequados) e não devem competir com o texto.
- Mobile estreito (`<640px`): priorizar leitura e rolagem fluida; evitar gestos ou efeitos que dependam de scroll “preso”.

## 4. CTA

Nenhum CTA explícito por card. O card serve de apresentação; a conversão acontece no bloco `Offer` (secção 9) e nos CTAs persistentes.

## 5. Acessibilidade

- `<section aria-labelledby="ofertas-heading">`.
- Imagens de fundo com `aria-hidden` (são decorativas; o texto em cima carrega o conteúdo).

## 6. Não fazer

- Não mudar `#ofertas` para outra âncora sem actualizar `Navbar` e `Footer` juntos.
- Não reordenar os três cards — Landing é a porta de entrada comercial (preço-âncora), vem primeiro.
- Não voltar ao layout canónico antigo de **três cartões + `ScrollStack`** como padrão principal desta secção neste ciclo.
