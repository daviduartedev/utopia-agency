# Diferenciais

**Componente:** `src/app/components/WhyUs.tsx`.
**Posição:** 5ª seção (depois de Serviços).
**Âncora:** `#diferenciais`.

## 1. Objetivo de funil

Responder à pergunta "por que você e não outra agência/freelancer?" em até 4 pontos objetivos, todos orientados a **entrega real**, não a slogan.

## 2. Copy canônica

- **Eyebrow**: `Por que a Utopia`
- **Title**: `Feito para quem não quer perder tempo.`
- **Description**: `Cada projeto é tratado como se fosse o produto principal do nosso portfólio. Porque é.`

### Quatro cards (BentoGrid, ordem fixa)

1. **Entrega ágil** — status `Ritmo`, ícone `Zap` (amber-400)
   `Da proposta ao ar com processo enxuto, sem reuniões desnecessárias e sem fases de aprovação intermináveis.`

2. **Qualidade de produto** — status `Padrão`, ícone `Star` (violet-400)
   `UI polida, código limpo e performance real — não só bonito na apresentação, funciona de verdade no ar.`

3. **Comunicação direta** — status `Transparência`, ícone `MessageSquare` (sky-400)
   `Você acompanha cada etapa: sem surpresas de escopo e sem respostas que nunca chegam.`

4. **Do zero ao deploy** — status `Entrega`, ícone `PackageCheck` (emerald-400)
   `Não entregamos só telas ou só repositório: produto no ar com domínio, hospedagem e apoio nos primeiros dias.`

## 3. Visual

- Container: `max-w-[1300px]` com padding lateral responsivo, hairlines top/bottom.
- `BentoGrid` do design system.
- Ícones coloridos são **os únicos acentos cromáticos** da seção — não usar outros em cópia, bordas ou fundos.

## 4. CTA

Nenhum nesta seção.

## 5. Acessibilidade

- `<section aria-labelledby="whyus-heading">`.
- Ícones com `aria-hidden`; o título do card carrega o significado.

## 6. Não fazer

- Não subir para 6 cards. Quatro é o limite (legibilidade + densidade).
- Não trocar o card 4 ("Do zero ao deploy") por frase com verbo "lançamento" sozinho — perde o contraste com freelancer.
