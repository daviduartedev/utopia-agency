# SEO

Este doc descreve o **estado atual** dos metadados da LP. Nenhuma alteração de SEO foi pedida para este ciclo; mudanças entram como TODO.

## 1. `<head>` canônico

Fonte: [`index.html`](../index.html).

- `<html lang="pt-BR">` — correto.
- `<title>`: `Utopia — Produto digital pronto para vender` (atualizado neste ciclo; o `#1 Agência` anterior foi removido por ser claim não comprovado).
- `<meta name="description">`: `Utopia — Landing pages a partir de R$ 999, sistemas SaaS e aplicativos. Do briefing ao deploy com prazos curtos e padrão premium.`
- `<link rel="canonical" href="https://utopia.app.br/">`.
- Favicons e `apple-touch-icon` configurados.
- `<meta name="theme-color" content="#0a0a0a">` alinhado com `--page-surface`.

## 2. Open Graph / Twitter

- `og:type = website`, `og:url`, `og:image = https://utopia.app.br/logo.png`.
- `twitter:card = summary_large_image` com title/description/image.

Tamanho da imagem OG atual é o `logo.png` — não ideal (deveria ser 1200×630). Listado como TODO.

## 3. URLs

- Canônica única: `/` (SPA). Não há rotas profundas indexáveis hoje.
- Âncoras usadas na navegação: `#inicio`, `#problema`, `#clientes`, `#ofertas`, `#como-funciona`, `#portfolio`, `#depoimentos`, `#oferta`, `#faq`, `#contato`. `scroll-mt-24` nos containers garante que o anchor não fique atrás do navbar.

## 4. Acessibilidade semântica relevante para SEO

- Um único `<h1>` na página (dentro do `CinematicHero`).
- Cada seção usa `<section aria-labelledby="...-heading">` e um `<h2>` dentro do `SectionHeader`.

## TODO (futuros ciclos)

- Trocar `og:image` por asset dedicado 1200×630 (`public/og-cover.jpg` com branding + headline).
- Adicionar JSON-LD `Organization` e `Service` (LP, SaaS, Aplicativo) em `index.html` ou injetado via React.
- Adicionar JSON-LD `FAQPage` a partir dos itens de `Faq.tsx`.
- Sitemap `sitemap.xml` + `robots.txt` (hoje o projeto não tem — SPA single-URL não precisa, mas convém para futuras páginas `/sobre`, `/termos`).
- Escolher 3–5 keywords-alvo oficiais e documentar aqui quando decidido.
