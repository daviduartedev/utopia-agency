# Acessibilidade

Este ciclo **não adiciona** requisitos novos de acessibilidade. O doc descreve o baseline atual e TODOs.

## 1. Nível-alvo

Informal: **WCAG 2.2 AA** em contraste e navegação por teclado. Sem auditoria formal ou gate automatizado ainda.

## 2. Convenções em vigor

- Todas as seções usam `<section aria-labelledby="...-heading">` com o `<h2>` do `SectionHeader` referenciado.
- `aria-hidden="true"` nas hairlines decorativas (`h-px bg-white/10`) e nos fundos (Plasma, gradientes).
- `alt=""` em imagens decorativas (ex.: avatar do `BookCallWidget`); `alt` descritivo nas imagens de conteúdo (portfólio).
- Foco visível via `focus-visible:ring-white/50` + `ring-offset-page-surface`.
- Menu mobile com `aria-expanded`, `aria-controls`, `aria-label` dinâmico.
- `Esc` fecha o menu mobile (listener em `Navbar.tsx`).
- `role="alert"` em mensagens de erro de formulário; `role="status"` em confirmação de envio.

## 3. Contraste

Texto principal sobre `--page-surface #0a0a0a`:
- `text-white` (`#FFF`): contraste >18:1 ✔.
- `text-zinc-300` (`#d4d4d8`): ~13:1 ✔.
- `text-zinc-400` (`#a1a1aa`): ~7.5:1 ✔.
- `text-zinc-500` (`#71717a`): ~4.4:1 — usar apenas em **legenda** (≥ 18px bold ou ≥ 24px regular). Não usar em parágrafo base.

## 4. Motion

- `prefers-reduced-motion: reduce` já cancela marquees e coluna infinita de testimonials (ver `theme.css`).
- Entradas `motion` de seção continuam ativas — impacto leve, aceitável.

## 5. Carrossel de portfólio (após ciclo)

Quando o Portfolio migrar para Embla neste ciclo:

- Container com `role="region"` + `aria-roledescription="carousel"` + `aria-label`.
- Botões prev/next com `aria-label` explícito ("Ver case anterior", "Ver próximo case").
- Navegação por teclado: setas esquerda/direita movem um slot.
- Slides com `aria-roledescription="slide"` e `aria-label` com posição (ex.: "Case 2 de 5").

## TODO (futuros ciclos)

- Rodar axe-core em CI.
- Auditar navegação por teclado com Tab-only do topo ao rodapé (sem mouse).
- Adicionar `skip to content` link no topo.
- Verificar leitor de tela em hero (Plasma não deve vazar como conteúdo).
- Revisar labels de formulário para equivalência visual + programática (hoje OK, reconfirmar após qualquer mexida).
