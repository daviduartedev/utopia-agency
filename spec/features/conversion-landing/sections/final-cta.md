# CTA final

**Componente:** `src/app/components/CtaSection.tsx` → `src/app/components/ui/cta-4.tsx`.
**Posição:** 11ª seção (entre FAQ e Formulário).
**Âncora:** não tem (não aparece na navegação).

## 1. Objetivo de funil

Último empurrão antes da alternativa "formulário". Visitante que chegou aqui quer conversar — o CTA precisa ser grande, direto, WhatsApp.

## 2. Copy canônica

- **Title**: `Seu site no ar em até 7 dias.`
- **Description**: `Landing page a partir de R$ 999. A gente começa pela conversa, sem proposta de 30 páginas.`
- **Items (checklist)**:
  - `Design e código entregues`
  - `Domínio e hospedagem inclusos`
  - `1 mês de suporte gratuito`
  - `Sinal mínimo de 30% para iniciar`
- **Botão**: `Falar com a Utopia agora` → `whatsappHref(WA_MSG_CTA_SECTION)`

> Reescrita vs. versão antiga: saem os clichês `"Seu site pronto, rápido e do jeito certo"` e `"sites profissionais que não só impressionam, mas convertem"`. A nova copy reforça o compromisso comercial real (7 dias, R$ 999, suporte de 1 mês, sinal de 30%) para fechar coerência com `offer.md`.

## 3. Visual

- `Cta4` atual do design system (sem mudança estrutural).
- Hairlines top/bottom.
- Botão CTA branco sobre fundo escuro, ícone seta opcional.

## 4. Acessibilidade

- `<section>` com `aria-labelledby` apontando para o `<h2>` do bloco.
- Checklist com `<ul>` + ícones decorativos (`aria-hidden`).

## 5. Não fazer

- Não adicionar um segundo botão (ex.: "rolar até o formulário"). Um único CTA primário WhatsApp.
- Não reintroduzir as frases "impressionam e convertem" ou "do zero ao lançamento sem complicação" (blacklist).
