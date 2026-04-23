# CTA final

**Componente:** `src/app/components/CtaSection.tsx` → `src/app/components/ui/cta-4.tsx`.
**Posição:** 11ª secção (entre FAQ e Formulário).
**Âncora:** não tem (não aparece na navegação).

## 1. Objetivo de funil

Último empurrão antes da alternativa "formulário". Visitante que chegou aqui quer conversar — o CTA precisa ser grande, direto, WhatsApp.

## 2. Copy canônica

- **Title**: `Chega de página bonita que não vende`
- **Description**: `Landing a partir de R$ 999, no ar em até 7 dias. A conversa começa pelo WhatsApp, sem PDF de 30 páginas.`
- **Items (checklist)**:
  - `Design e código no pacote`
  - `Domínio e hospedagem configurados`
  - `1 mês de suporte gratuito`
  - `Sinal de 30% para começar`
- **Botão**: `Falar no WhatsApp` → `whatsappHref(WA_MSG_CTA_SECTION)`

## 3. Visual

- `Cta4` atual do design system (sem mudança estrutural).
- Hairlines top/bottom.
- Botão CTA branco sobre fundo escuro, ícone seta opcional.

## 4. Acessibilidade

- `<section>` com `aria-labelledby` apontando para o `<h2>` do bloco.
- Checklist com `<ul>` + ícones decorativos (`aria-hidden`).

## 5. Não fazer

- Não adicionar um segundo botão (ex.: "rolar até o formulário"). Um único CTA primário WhatsApp.
- Não reintroduzir frases da blacklist (`content-guidelines.md` §4).
