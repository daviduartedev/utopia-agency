# Como funciona

**Componente:** `src/app/components/HowItWorks.tsx`.
**Posição:** 6ª seção.
**Âncora:** `#como-funciona`.

## 1. Objetivo de funil

Reduzir risco percebido. Mostrando um processo de **5 etapas numeradas**, o fundador solo entende que não vai pagar para navegar no escuro.

## 2. Copy canônica

- **Eyebrow**: `Como funciona`
- **Title**: `Do briefing ao lançamento.`
- **Description**: `Um processo claro em cinco etapas — para você saber o que esperar em cada fase.`

### Cinco passos (ordem fixa)

1. **01 · Briefing** — `Entendemos seu negócio, público e objetivos. Uma chamada rápida ou formulário detalhado — sem burocracia.`
2. **02 · Proposta** — `Escopo detalhado, prazo e valor fixo. Você sabe exatamente o que vai receber e quando, antes de confirmar qualquer coisa.`
3. **03 · Design** — `Layout aprovado por você antes do código começar. Iterações rápidas em Figma com foco em conversão e identidade.`
4. **04 · Desenvolvimento** — `Código limpo, stack moderno e links de pré-visualização para acompanhar ao vivo. Você vê o progresso a cada entrega.`
5. **05 · Entrega e suporte** — `Produto no ar com domínio, CI/CD e documentação incluídos. Um mês de suporte gratuito para garantir um lançamento sem sustos.`

> A cópia atual fala "Suporte nos primeiros dias". A partir deste ciclo, alinha-se ao compromisso comercial: **1 mês de suporte gratuito** (ver `offer.md` e `product.md`).

## 3. Visual

- **Intenção:** cinco etapas reconhecíveis em sequência com **ritmo próprio** — timeline vertical com linha, passos horizontais com conectores, ou colunas progressivas — não obrigatoriamente cinco `SpotlightCard` idênticas.
- Número em destaque por etapa (water-mark ou badge) permanece viável; semântica `ol` preservada.
- Abaixo dos passos, `BookCallWidget` centralizado (max-w-xl), inalterado em copy e CTA.
- Motion: transições ao rolar entre etapas ou stagger dos itens, sem atrapalhar leitura.

## 4. CTA

**BookCallWidget** após os 5 passos:
- Título: `Marcar uma conversa`
- Subtítulo: `15 minutos gratuitos com nossa equipe para falarmos sobre o seu projeto.`
- Botão: `Quero agendar agora` → `whatsappHref(WA_MSG_BOOK_CALL)`.

Sem Cal.com/Calendly: a conversa é iniciada por WhatsApp (decisão confirmada neste ciclo).

## 5. Acessibilidade

- `<section aria-labelledby="howitworks-heading">`.
- Lista com `<ol>` mantendo semântica de ordem.
- Número water-mark é `aria-hidden`; o rótulo numérico visível (`01 · …`) é real no DOM.

## 6. Não fazer

- Não remover o passo 5 ("Entrega e suporte") — ele amarra a promessa de suporte.
- Não trocar o avatar do `BookCallWidget` (`public/avatar.png`) por foto stock; é foto real do operador.
