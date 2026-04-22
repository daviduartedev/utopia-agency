# Feature — Conversion-focused Landing Page

Landing page pública da Utopia, em `/`. Objetivo: transformar visitante (fundador solo) em **conversa no WhatsApp**, com formulário como caminho alternativo.

## 1. Composição final (pós-ciclo)

Ordem canônica das seções montadas em `src/app/App.tsx`:

| # | Seção | Componente | Propósito |
|---|---|---|---|
| 1 | Hero | `Hero` → `CinematicHero` | Proposta de valor + CTA primário |
| 2 | Problema | `Problem` | Nomear a dor do ICP |
| 3 | Logos de clientes | `ClientLogos` | Prova social rápida (placeholders realistas) |
| 4 | Serviços (Solução) | `OfferingsScrollStack` | Mostrar o que a Utopia faz |
| 5 | Diferenciais | `WhyUs` | Por que escolher a Utopia |
| 6 | Como funciona | `HowItWorks` | Previsibilidade de processo + BookCallWidget |
| 7 | Portfólio | `Portfolio` (novo carrossel Embla) | Prova de entregas |
| 8 | Depoimentos | `Testimonials` | Prova de experiência |
| 9 | Oferta | `Offer` | O que exatamente está sendo vendido |
| 10 | FAQ | `Faq` | Derrubar últimas objeções |
| 11 | CTA final | `CtaSection` | Último empurrão WhatsApp |
| 12 | Formulário de contato | `ContactFormSection` | Caminho alternativo assíncrono |
| 13 | Rodapé | `Footer` | Navegação + selos + legal |

Navbar e Floating button são persistentes por cima da página.

### 1.1 Diversidade de layout e motion (refinamento)

As seções **Problema**, **Diferenciais** (`WhyUs`), **Como funciona**, **Depoimentos** e **Oferta** devem usar **composições visualmente distintas** entre si. O visitante não deve ter a impressão de cinco blocos feitos com o mesmo molde de “cartões sombreados”. A **copy**, número de itens, preços, CTAs WhatsApp e mensagens associadas continuam definidos em [`sections/`](sections/); a **apresentação** pode mudar (incluindo formato da Oferta que não seja mais grid 1/1/3 de três cards).

**Motion (LP inteira):** toda a página deve poder usar o mesmo vocabulário de **entrada, laterais e transição ao rolar** em estilo moderno (referência: Webflow/Framer), **desde que** a sensação permaneça leve: sem jank perceptível na rolagem nem atraso em CTAs, conforme [`../../design-system.md`](../../design-system.md) §8 e [`../../performance-budget.md`](../../performance-budget.md). Inclui, onde fizer sentido, **Hero**, **Logos**, **Portfólio**, **FAQ**, **CTA final**, **Formulário**, **Navbar** e **Floating** — sem alterar ordem das seções nem copy, salvo ajustes mínimos de hierarquia visual.

**Serviços (Solução):** a seção “Nossos serviços” deve ter **layout e comportamento distintos** do padrão anterior baseado em `ScrollStack` empilhando cartões; ver [`sections/solution.md`](sections/solution.md).

## 2. Funil de conversão

```
Visitante → Hero (entende o que é)
         → Problema (reconhece a dor)
         → ClientLogos + Serviços (confia que tem gente fazendo)
         → Diferenciais + Como funciona (diminui risco percebido)
         → Portfólio + Depoimentos (confiança qualitativa)
         → Oferta (sabe o preço e o que vem na caixa)
         → FAQ (derruba últimas dúvidas)
         → CTA final / Formulário → WhatsApp
```

## 3. CTAs e hierarquia

- **Primário**: WhatsApp. Botão branco, texto preto, ícone seta. Presente em Hero, Navbar, HowItWorks (BookCallWidget), Offer (um CTA por produto ofertado), CTA final, Footer e Floating button.
- **Alternativo**: Formulário. Botão padrão Radix/shadcn, fundo branco, texto "Enviar e abrir WhatsApp".
- **Descarte/navegação**: itens do menu e do rodapé (links internos).

Mensagens WhatsApp canônicas listadas em [`../../integrations.md`](../../integrations.md) §1.3.

## 4. Idioma e localização

- **PT-BR de 2026**. Único idioma.
- Moeda `R$`, formato `R$ 999` (espaço obrigatório).

## 5. Docs por seção

Cada seção tem um arquivo próprio em [`sections/`](sections/) descrevendo: objetivo, copy canônica, componentes, estados, CTAs, a11y.

## 6. Estado de placeholders

Este ciclo mantém como placeholders:

- **8 logos de clientes** em `public/logos/` (SVG mono-cor `currentColor`, nomes genéricos).
- **6 cases de portfólio** — 4 com imagem em `public/`, 2 com card tipo "Case em breve"; três slides com **link de demo** em nova aba (ver [`sections/portfolio.md`](sections/portfolio.md)).
- **6 depoimentos** com primeiros nomes + papel (ex.: "Fundador solo • SaaS B2B"), sem fotos; avatar em gradiente com iniciais.

Todos estão marcados nos respectivos section docs. A troca por conteúdo real será ciclo futuro, condicional a autorização de clientes.

## 7. Definição de pronto

A feature está "pronta" (deste ciclo) quando:

- Todos os `tasks.md` do ciclo estão fechados.
- Todos os cenários de `scenarios.feature` passam em QA manual.
- Nenhuma frase da blacklist de `../../content-guidelines.md` aparece em busca da base de código.
- Os 13 componentes listados em §1 estão montados em `App.tsx` nessa exata ordem.
- As cinco seções de §1.1 são **claramente distinguíveis** em layout umas das outras; motion ao scroll está aplicado conforme o design system **e** estendido ao restante da página conforme §1.1, sem sensação de lentidão.
- A seção **Serviços** está visualmente e estruturalmente **diferente** do empilhamento scroll-driven anterior, mantendo copy e âncora `#ofertas`.
- O **Portfólio** reflete os seis cases e URLs de demo descritos em `sections/portfolio.md`.
- Este arquivo e os docs de `sections/` refletem 1:1 o que está em produção.
