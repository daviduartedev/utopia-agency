# Ciclo — GradualBlur entre seções + portfólio (links e CS2)

**Fonte detalhada:** `cycles/request.md` (prompt React Bits + intent).

## Intent

- Véu `GradualBlur` no **rodapé visual** de cada bloco de seção lazy, **exceto** Hero, `ContactFormSection` e `Footer`.
- Portfólio: **novo** case com print em `public/portfolio-dr-black-skins.png`, link para [Dr. Black Skins](https://drblack-skins.vercel.app/); cases **LP solar** e **App barbearia** com links para demos públicas.
- **Sem** mudança em âncoras, WhatsApp, analytics ou compliance (confirmado pelo stakeholder).

## Decisões (2026-04-22)

| # | Decisão |
|---|--------|
| 1 | Ciclo documentado **apenas** nesta pasta (sem fundir com `0422-framer-webflow-servicos`). |
| 2 | Blur: **não** em Hero, Footer, Formulário; demais seções via `LazySection`. |
| 3 | Parâmetros de blur não prescritos pelo stakeholder: adotar **perfil conservador** (ver `plan.md`). |
| 4 | Performance: sem gate numérico novo; revisão manual em device médio + `prefers-reduced-motion`. |
| 5 | Portfólio: 6º slide novo; solar → [Emera Solar](https://emerasolar.vercel.app/); barbearia → [Sua Barbearia](https://sua-barbearia-sistema.vercel.app/); CS2 → [Dr. Black Skins](https://drblack-skins.vercel.app/). |
