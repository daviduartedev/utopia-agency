# Content guidelines — tom de voz da Utopia

A copy da Utopia é o produto mais exposto: é o que o visitante julga antes de decidir se fala com a gente. Todo texto público precisa passar por este documento antes de entrar em produção.

## 1. Tom de voz

- **Sóbrio, factual, confiante.** Frase curta, verbo forte, substantivo concreto.
- Escreve como quem **entrega** — não como quem vende.
- Fala **com** o fundador solo, não **para** a empresa dele.
- Sem exclamações. Sem superlativos vazios. Sem "melhor", "incrível", "revolucionário".
- Ponto final existe. "Só isso." pode ser uma frase.

**Exemplos de registro correto:**

> "Landing page no ar em até 7 dias. Design em Figma, código entregue, domínio e hospedagem inclusos."

> "Seu site hoje recebe visita mas não gera contato. A gente resolve esse salto."

> "Paga 30% para começar, o resto em duas parcelas."

## 2. Promessas permitidas

Só prometemos o que está na `offer.md`:

- Preço inicial de Landing Page em `R$ 999` (parcelável em 3×).
- Entrega de LP em até 7 dias.
- 1 mês de suporte gratuito pós-entrega.
- SaaS e aplicativos "sob consulta" (nunca dizer preço ou prazo antes da conversa).

## 3. Nomes próprios e grafia

- Marca: **Utopia** (preferido) ou **Utopia Studio** (institucional).
- Idioma: **PT-BR de 2026** (acordo ortográfico atual).
- Moeda: **R$ 999** (espaço depois de `R$`). Nunca `R$999`.
- Números: ordinais com sufixo (`1ª parcela`). Percentuais colados (`30%`).
- Termos técnicos: **landing page** (minúsculo), **SaaS** (como no texto do request), **aplicativo** (preferir a "app" no corpo; "App" ok em título curto).

## 4. Blacklist canônica

**Proibido** em qualquer copy pública da Utopia. Em cada PR, grep pela ocorrência de cada item abaixo — se aparecer, precisa reescrever antes do merge.

### 4.1 Clichês explicitamente banidos pelo request

- `transforme seu negócio`
- `alcance resultados incríveis`

### 4.2 Extensões (adotadas pela Utopia)

- `soluções sob medida`
- `parceiro estratégico`
- `próximo nível`
- `destaque sua marca`
- `potencialize`, `potencializar`
- `entregamos o melhor`
- `alta performance e alta conversão` (quando juntos e sem métrica)
- `impressionam e convertem`
- `do zero ao lançamento sem complicação`
- `soluções digitais completas`
- `experiência única` / `experiência inesquecível`
- `vamos juntos`
- `mergulhe no futuro`
- `acelere o crescimento`

Se encontrar um clichê novo no processo, **adicione aqui** no mesmo PR em que reescreve.

## 5. Regras estruturais por tipo de texto

### Headline (hero e seções)
- Máximo duas linhas no desktop.
- Usa verbo na 3ª pessoa ou substantivo concreto (ex.: "Produto digital pronto para vender").
- Nunca usa interrogação.

### Subheadline / descrição de seção
- Uma frase só. 14–28 palavras.
- Diz **para quem** e **o que acontece**, não "o quanto é legal".

### Bullet / card
- Começa com substantivo ou verbo no infinitivo.
- Sem ponto final se for item de lista curta (≤ 6 palavras); com ponto final se for frase inteira.

### CTA
- Máximo 5 palavras.
- Começa com verbo ("Quero", "Falar", "Agendar").
- Nunca diz "Clique aqui" nem "Saiba mais".

### FAQ
- Pergunta na 1ª pessoa ("Preciso ter conteúdo pronto?"). Resposta curta e direta, em no máximo 3 frases.

### Depoimento
- Fala de **escopo entregue** e **experiência de processo**, não de resultado financeiro.
- Cita cargo + tipo de empresa ("Fundadora, estúdio de fotografia"). Sem números inventados.

## 6. Regras sobre prova

- Não inventamos métrica ("+X leads", "Y% de conversão", "+Z% receita").
- Podemos descrever **escopo**: "LP de pré-venda para lançamento de painel solar", "ERP para lojistas", "app de agendamento para barbearia".
- Logos de clientes em uso hoje são placeholders (ver `design-system.md` §9 e `features/conversion-landing/sections/problem.md`).

## 7. Checklist de revisão de copy

Antes de mergear qualquer alteração em texto público, responder **sim** a todas:

- [ ] Nenhuma frase da blacklist aparece no arquivo modificado?
- [ ] Cada seção tem um objetivo claro de funil (atenção → interesse → desejo → ação)?
- [ ] Nenhum número de resultado é afirmado sem fonte?
- [ ] CTAs são verbos, em no máximo 5 palavras?
- [ ] O tom combina com fundador solo, não com diretor de marketing corporativo?
