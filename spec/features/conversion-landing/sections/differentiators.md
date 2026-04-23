# Diferenciais

**Componente:** `src/app/components/WhyUs.tsx`.
**Posição:** 5ª secção (depois de Serviços).
**Âncora:** `#diferenciais`.

## 1. Objetivo de funil

Responder à pergunta "por que você e não outra agência/freelancer?" em até 4 pontos objetivos, com **contraste** em relação ao problema (teatro, prazo opaco, sumiço pós-entrega).

## 2. Copy canônica

- **Eyebrow**: `Por que a Utopia`
- **Title**: `Menos teatro. Mais produto no ar.`
- **Description**: `Você não paga por slide bonito. Paga por escopo legível, prazo combinado e alguém que responde.`

### Quatro pontos (BentoGrid *ou* composição equivalente, ordem fixa)

1. **Entrega ágil** — status `Ritmo`, ícone `Zap` (amber-400)
   `Da proposta ao ar com processo enxuto: poucas reuniões, pouca burocracia e fases de aprovação curtas.`

2. **Qualidade de produto** — status `Padrão`, ícone `Star` (violet-400)
   `Interface polida, código limpo e performance real — não só mock bonito, página que aguenta tráfego.`

3. **Comunicação direta** — status `Transparência`, ícone `MessageSquare` (sky-400)
   `Você acompanha cada etapa: sem sumiço no meio e sem surpresa de escopo na fatura.`

4. **Pacote completo** — status `Entrega`, ícone `PackageCheck` (emerald-400)
   `Domínio, hospedagem e código no mesmo pacote — não some só o Figma no Drive depois do handoff.`

## 3. Visual

- Container: `max-w-[1300px]` com padding lateral responsivo, hairlines top/bottom.
- **Implementação:** quadro único com **grade 2×2** (`gap-px` + fundo `white/10` para fios), cantos `rounded-3xl`, células internas rectas (sem cartões com gradiente como em Problema). Cada célula: **barra de acento** colorida no topo + ícone em quadradinho + status + título + texto.
- Ícones coloridos (`amber`, `violet`, `sky`, `emerald`) e barras correspondentes — contraste intencional com a secção Problema (timeline vertical + painéis arredondados em gradiente).
- Motion: scroll e stagger alinhados a §8 do design system.

## 4. CTA

Nenhum nesta secção.

## 5. Acessibilidade

- `<section aria-labelledby="whyus-heading">`.
- Ícones com `aria-hidden`; o título do card carrega o significado.

## 6. Não fazer

- Não subir para 6 cards. Quatro é o limite (legibilidade + densidade).
- Não usar frases da blacklist (`content-guidelines.md` §4).
