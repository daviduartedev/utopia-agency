# Problema

**Componente (novo):** `src/app/components/Problem.tsx`.
**Posição:** 2ª seção, imediatamente após o Hero.
**Âncora:** `#problema`.

## 1. Objetivo de funil

Fazer o visitante **se reconhecer** em pelo menos uma das dores. Sem reconhecimento, a próxima seção (Serviços) soa genérica.

## 2. Copy canônica

- **Eyebrow**: `O problema`
- **Title**: `Seu site hoje não está fazendo a parte dele.`
- **Description**: `Três situações que consomem oportunidade todo mês — e que a gente resolve por padrão.`

### Três pontos de dor (ordem fixa; apresentação livre)

1. **`Visita que não vira contato`**
   O tráfego chega, mas ninguém te chama. A página não diz o que você vende, não aponta um próximo passo claro e o visitante sai antes de decidir.

2. **`Orçamento caro, prazo longo, proposta burocrática`**
   Você pede um site e recebe um PDF de 30 páginas, cronograma de três meses e uma fatura que só faz sentido para uma grande empresa. O projeto nunca sai do papel.

3. **`Agência que some depois da entrega`**
   O site vai ao ar, o suporte some. Um bug pequeno vira semana parada. Qualquer evolução exige um novo contrato.

Cada card tem um ícone discreto (`lucide-react`): `ArrowDownRight`, `Hourglass`, `Ghost` (ou equivalente decidido no PR).

## 3. Visual

- `section` padrão: `bg-page-surface py-20 md:py-24`, hairlines top/bottom.
- **Intenção:** não três “cards spotlight” iguais lado a lado; preferir **um padrão com leitura própria** — por exemplo coluna editorial + lista numerada, timeline curta, painel dividido (dor / consequência) ou blocos de alturas distintas — desde que as três dores e textos canônicos permaneçam.
- Tipografia: títulos curtos em `font-sans`, peso 600; corpo `text-zinc-400`, 14–15px, line-height relaxado.
- Motion: entrada/saída ao scroll coerente com `design-system.md` §8.

## 4. CTA

Nenhum CTA explícito nesta seção. O próximo passo é a **rolagem** natural para Serviços.

## 5. Acessibilidade

- `<section aria-labelledby="problema-heading">` + `<h2 id="problema-heading">` via `SectionHeader`.
- Ícones com `aria-hidden`; texto do card carrega o significado.

## 6. Não fazer

- Não inflar para 5–6 dores. Três é o limite.
- Não escrever no tom "ISSO É UM ABSURDO!" — a Utopia fala sóbrio (ver `content-guidelines.md`).
- Não usar o verbo "transformar" nem "potencializar".

## 7. Placeholders / conteúdo aberto

- Ícones definitivos escolhidos no PR. Se nenhum dos três sugeridos casar, trocar.
