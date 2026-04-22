# Tasks — `0422-gradualblur-portfolio-links`

- [x] Adicionar componente auxiliar ou props reutilizáveis para o **perfil conservador** de `GradualBlur` no rodapé de bloco (`LazySection` ou equivalente).
- [x] Ativar o véu **apenas** nas `LazySection` aplicáveis; **não** ativar em `ContactFormSection`, `Footer`, nem no Hero.
- [x] Garantir asset `public/portfolio-dr-black-skins.png` (origem aceita: cópia a partir de `dist/dr-black-skins.png`).
- [x] Atualizar `Portfolio.tsx`: sexto case, `demoUrl` nos três cases com demo, acessibilidade e `target="_blank"`.
- [x] **Atualizar `spec/`** (readme da feature, `sections/portfolio.md`, `performance-budget.md`, `design-system.md`, `sections/solution.md`) para refletir o estado canônico pós-ciclo.
- [x] QA: smoke automatizado (`npm run qa:0422` → `qa-smoke.mjs`) + `npm run build`; complemento manual recomendado — rolagem completa, carrossel (arrastar, setas com foco no carrossel), `prefers-reduced-motion` no SO, viewport `< 640px`, leitor de tela nos slides com demo.
- [x] Ciclo fechado: `tasks.md` completo; cenários em `scenarios.feature` alinhados ao comportamento implementado (validação manual pontual opcional).
