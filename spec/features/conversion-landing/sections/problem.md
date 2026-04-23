# Problema

**Componente (novo):** `src/app/components/Problem.tsx`.
**Posição:** 2ª seção, imediatamente após o Hero.
**Âncora:** `#problema`.

## 1. Objetivo de funil

Fazer o visitante **se reconhecer** em pelo menos uma das dores — com **consequência** explícita para o negócio, em tom de conversa (não relatório). Sem reconhecimento, a secção de Serviços soa genérica.

## 2. Copy canônica

- **Eyebrow**: `O problema`
- **Title**: `Seu produto existe. Sua página não fecha.`
- **Description**: `Três padrões que a gente vê toda semana quando um fundador abre o site no celular.`

### Três pontos de dor (ordem fixa; apresentação livre)

1. **`Tráfego que morre na página`**
   O link ou o anúncio até trazem gente. Só que ninguém entende em dez segundos o que você vende, não tem botão óbvio e o visitante sai antes de te chamar.

2. **`Orçamento que não cabe no bolso`**
   Você pede um site e volta um PDF enorme, prazo de trimestre e valor de empresa grande. Na prática o projeto nunca começa.

3. **`Suporte que some depois do ar`**
   O deploy passa, o WhatsApp esfria. Ajuste pequeno vira fila. Qualquer evolução vira novo contrato do zero.

Cada card tem um ícone discreto (`lucide-react`): `ArrowDownRight`, `Hourglass`, `Ghost` (ou equivalente decidido no PR).

## 3. Visual

- `section` padrão: `bg-page-surface py-20 md:py-24`, hairlines top/bottom.
- **Intenção:** não três “cards spotlight” iguais lado a lado; preferir **um padrão com leitura própria** — por exemplo coluna editorial + lista numerada, timeline curta, painel dividido (dor / consequência) ou blocos de alturas distintas — desde que as três dores e textos canônicos permaneçam.
- Tipografia: títulos curtos em `font-sans`, peso 600; corpo `text-zinc-400`, 14–15px, line-height relaxado.
- Motion: entrada/saída ao scroll coerente com `design-system.md` §8.

## 4. CTA

Nenhum CTA explícito nesta secção. O próximo passo é a **rolagem** natural para logos e Serviços.

## 5. Acessibilidade

- `<section aria-labelledby="problema-heading">` + `<h2 id="problema-heading">` via `SectionHeader`.
- Ícones com `aria-hidden`; texto do card carrega o significado.

## 6. Não fazer

- Não inflar para 5–6 dores. Três é o limite.
- Não escrever no tom "ISSO É UM ABSURDO!" — a Utopia fala sóbrio (ver `content-guidelines.md`).
- Não usar o verbo "transformar" nem "potencializar".

## 7. Placeholders / conteúdo aberto

- Ícones definitivos escolhidos no PR. Se nenhum dos três sugeridos casar, trocar.
