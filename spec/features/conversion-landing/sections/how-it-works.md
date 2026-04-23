# Como funciona

**Componente:** `src/app/components/HowItWorks.tsx`.
**Posição:** 6ª secção.
**Âncora:** `#como-funciona`.

## 1. Objetivo de funil

Reduzir risco percebido. Mostrando um processo de **5 etapas numeradas**, o fundador solo entende que não vai pagar para navegar no escuro.

## 2. Copy canônica

- **Eyebrow**: `Como funciona`
- **Title**: `Cinco passos. Zero surpresa.`
- **Description**: `Do primeiro contato à página no ar, você sabe o que vem em cada fase.`

### Cinco passos (ordem fixa)

1. **01 · Briefing** — `Entendemos negócio, público e meta. Uma chamada curta ou formulário — sem burocracia.`
2. **02 · Proposta** — `Escopo fechado, prazo e valor na mesma página. Você aprova ou não antes de pagar sinal.`
3. **03 · Design** — `Layout aprovado em Figma antes do código. Iterações curtas, foco em conversão e identidade.`
4. **04 · Desenvolvimento** — `Código limpo, stack moderna e links de pré-visualização para acompanhar ao vivo.`
5. **05 · Entrega e suporte** — `Produto no ar com domínio, CI/CD e documentação. Um mês de suporte gratuito para o lançamento não virar susto.`

> O passo 5 alinha-se ao compromisso comercial: **1 mês de suporte gratuito** (ver `offer.md` e `product.md`).

## 3. Visual

- **Intenção:** cinco etapas reconhecíveis em sequência com **ritmo próprio** — timeline vertical com linha, passos horizontais com conectores, ou colunas progressivas — não obrigatoriamente cinco `SpotlightCard` idênticas.
- Número em destaque por etapa (water-mark ou badge) permanece viável; semântica `ol` preservada.
- Abaixo dos passos, `BookCallWidget` centralizado (max-w-xl), inalterado em estrutura.
- Motion: transições ao rolar entre etapas ou stagger dos itens, sem atrapalhar leitura.

## 4. CTA

**BookCallWidget** após os 5 passos:
- Título: `Bater um papo rápido`
- Subtítulo: `15 minutos no WhatsApp para alinhar dor, prazo e tipo de projeto — sem compromisso.`
- Botão: `Quero agendar agora` → `whatsappHref(WA_MSG_BOOK_CALL)`.

Sem Cal.com/Calendly: a conversa é iniciada por WhatsApp (decisão confirmada neste ciclo).

## 5. Acessibilidade

- `<section aria-labelledby="howitworks-heading">`.
- Lista com `<ol>` mantendo semântica de ordem.
- Número water-mark é `aria-hidden`; o rótulo numérico visível (`01 · …`) é real no DOM.

## 6. Não fazer

- Não remover o passo 5 ("Entrega e suporte") — ele amarra a promessa de suporte.
- Não trocar o avatar do `BookCallWidget` (`public/avatar.png`) por foto stock; é foto real do operador.
