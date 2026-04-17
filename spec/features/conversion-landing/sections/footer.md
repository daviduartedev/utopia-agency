# Footer

**Componente:** `src/app/components/Footer.tsx`.
**Posição:** 13ª seção (última).

## 1. Objetivo

Fechar a página com navegação secundária, selos de stack (reforço qualitativo) e links legais.

## 2. Estrutura

- **Coluna esquerda**: `BrandLogo` + slogan + faixa de ícones de stack.
- **Coluna direita / navegação**: links para âncoras `#inicio`, `#ofertas`, `#como-funciona`, `#portfolio`, `#depoimentos`, `#faq` + CTA WhatsApp "Quero meu projeto" apontando para `whatsappHref(WA_MSG_FOOTER)`.
- **Linha inferior**: copyright (`© <ano atual> Utopia Studio. Todos os direitos reservados.`) + links `Termos` e `Privacidade`.

## 3. Copy canônica

- Slogan sob o logo: `Landing pages, SaaS e apps — entrega rápida com padrão premium.`
- Link persistente: `Quero meu projeto` → WhatsApp (mesma mensagem `WA_MSG_FOOTER`).

## 4. Stack icons

Linha discreta com 7 ícones (`react-icons/si`):
`SiReact`, `SiNextdotjs`, `SiTypescript`, `SiTailwindcss`, `SiSupabase`, `SiStrapi`, `SiClaude`.

Opacidade 60% no default, 100% em hover. Cores originais de cada marca (convenção Simple Icons).

## 5. Links legais

Hoje `Termos` e `Privacidade` são `href="#"` (sem destino). É **débito conhecido** — ver `spec/privacy-lgpd.md` §4.

## 6. Acessibilidade

- `<footer>` semântico, border superior `white/10`.
- `<nav aria-label="Rodapé">` para o bloco de navegação.
- Link externo (WhatsApp) tem `target="_blank" rel="noopener noreferrer"`.

## 7. Não fazer

- Não adicionar formulário de newsletter — fora do escopo e da estratégia comercial atual (WhatsApp primário).
- Não publicar o link `Termos`/`Privacidade` como `#` indefinidamente: assim que houver página real, trocar imediatamente.
