# Acessibilidade

Este ciclo **não adiciona** requisitos novos de acessibilidade. O doc descreve o baseline atual e TODOs.

## 1. Nível-alvo

Informal: **WCAG 2.2 AA** em contraste e navegação por teclado. Sem auditoria formal ou gate automatizado ainda.

## 2. Convenções em vigor

- Todas as seções usam `<section aria-labelledby="...-heading">` com o `<h2>` do `SectionHeader` referenciado.
- `aria-hidden="true"` nas hairlines decorativas (`h-px bg-white/10`) e nos fundos (Plasma, gradientes, canvas `ShapeGrid` no corpo da LP).
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
- **ShapeGrid:** com `reduce`, a animação da grelha fica **parada** (frame estático ou componente sem loop).
- Entradas `motion` de seção continuam ativas — impacto leve, aceitável.

## 5. Pilha 3D de portfólio (CardSwap)

A secção de portfólio usa a pilha animada `CardSwap` (GSAP) em cima de uma **região** de trabalhos selecionados, não o padrão de carrossel horizontal com setas (Embla foi usado noutro contexto, não no stack actual).

- Região com rótulo coerente (ex. “Trabalhos selecionados”); não impor `aria-roledescription="carousel"` se a UX for só rotação em pilha.
- A legenda visível (título + escopo) acompanha o case **em frente**; anúncio para tecnologias assistivas conforme o contrato em [`features/conversion-landing/sections/portfolio.md`](features/conversion-landing/sections/portfolio.md) §6 (incl. `aria-live` opcional e cuidado com *spam*). Os cards **não** têm link de demo; o rótulo e `alt` das imagens alinham com o título do case.
- `prefers-reduced-motion: reduce` → rotação automática desligada, pilha estática.
- Navegação por setas **não** é o contrato principal; Tab/foco evitam armadilhas.

## TODO (futuros ciclos)

- Rodar axe-core em CI.
- Auditar navegação por teclado com Tab-only do topo ao rodapé (sem mouse).
- Adicionar `skip to content` link no topo.
- Verificar leitor de tela em hero (Plasma não deve vazar como conteúdo).
- Revisar labels de formulário para equivalência visual + programática (hoje OK, reconfirmar após qualquer mexida).
