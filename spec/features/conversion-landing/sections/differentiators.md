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

### Quatro pontos (BentoGrid *ou* composição equivalente, ordem fixa)

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
- **Intenção:** diferenciais legíveis como **bloco com assinatura própria** — faixas alternadas full-width, trilha com ícones grandes, rails assimétricos, etc. Evitar a sensação de “mais um grid 2×2 de cards iguais” se o restante da página já repete esse padrão.
- Ícones coloridos (`amber-400`, `violet-400`, `sky-400`, `emerald-400`) permanecem os acentos principais **desta seção**; um relaxamento leve de fundo/borda é aceitável se documentado no design system.
- Motion: scroll e stagger alinhados a §8 do design system.

## 4. CTA

Nenhum nesta seção.

## 5. Acessibilidade

- `<section aria-labelledby="whyus-heading">`.
- Ícones com `aria-hidden`; o título do card carrega o significado.

## 6. Não fazer

- Não subir para 6 cards. Quatro é o limite (legibilidade + densidade).
- Não trocar o card 4 ("Do zero ao deploy") por frase com verbo "lançamento" sozinho — perde o contraste com freelancer.
