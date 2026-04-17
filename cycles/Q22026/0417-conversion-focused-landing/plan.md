# Plan — Conversion-focused Landing Page (delta)

**Cycle:** `Q22026/0417-conversion-focused-landing`
**Feature canonical spec:** [`spec/features/conversion-landing/`](../../../spec/features/conversion-landing/readme.md)
**Tipo de entrega:** rework incremental da LP existente em `src/app/`.

---

## 1. Objetivo do ciclo

Reestruturar a landing da Utopia para cumprir, de ponta a ponta, a estrutura de funil exigida em `request.md`:

> Hero → **Problema** → Solução → Diferenciais → Prova → **Oferta** → CTA

…fechando duas lacunas estruturais (Problema e Oferta), refazendo dois blocos de prova (Portfólio e Depoimentos) e auditando a copy para remover clichês de marketing.

O visitante-alvo deste ciclo é o **fundador solo** (pequeno negócio/SaaS nascente) — tom e preço calibrados para essa persona.

---

## 2. Delta contra o estado atual

### 2.1 Ordem de seções (novo)

```
Hero → Problema → Serviços (Solução) → Diferenciais → Como funciona
  → Portfólio → Depoimentos → Oferta → FAQ → CTA final → Formulário → Footer
```

Hoje, em `src/app/App.tsx`, faltam `Problema` e `Oferta`; os demais blocos existem e serão mantidos (exceto Portfólio/Depoimentos, refeitos — ver 2.4).

### 2.2 Nova seção: Problema

- Componente novo: `src/app/components/Problem.tsx`.
- Identifica três dores do fundador solo, em cards/bullets curtos:
  1. **Site que não converte visita em contatos** — tráfego existe, mas não chega mensagem.
  2. **Orçamento caro, prazo longo e entrega burocrática** — proposta cheia de etapas, reuniões intermináveis, preço opaco.
  3. **Agência que desaparece pós-entrega** — nada de suporte, bugs esquecidos, evolução travada.
- Copy: descritiva, sem vitimização. Cada dor encerra numa frase-gancho que antecipa a solução da próxima seção.
- Visual: alinhado ao resto da página (bg `page-surface`, hairline top/bottom, `SectionHeader`). Sem ilustração — texto + ícone `lucide-react`.

### 2.3 Nova seção: Oferta

- Componente novo: `src/app/components/Offer.tsx`.
- Três cards (ou um card destaque + dois secundários) mostrando exatamente o que é vendido:
  - **Landing Page** — **a partir de R$ 999** (parcelável em até 3×), entrega em **até 7 dias**.
  - **Sistema SaaS** — **sob consulta** (parcelável em até 3×).
  - **Aplicativo** — **sob consulta** (parcelável em até 3×).
- Inclusões fixas em cada card:
  - design no Figma + código-fonte entregue,
  - domínio + hospedagem configurados,
  - SEO técnico básico e analytics,
  - **1 mês de suporte gratuito pós-entrega**,
  - revisões inclusas na proposta.
- Condição comercial explícita no rodapé do bloco: **sinal mínimo de 30% (ou 1 parcela) para iniciar**.
- CTA por card: WhatsApp pré-preenchido (texto novo em `whatsapp-messages.ts`).

### 2.4 Seções refeitas

**Portfólio** (`src/app/components/Portfolio.tsx`)
- Substituir o marquee atual por **carrossel horizontal** com snap e controles (prev/next + drag + teclado).
- Lib: `embla-carousel-react` (já instalada, v8).
- Cases atuais permanecem como placeholders realistas com descrição qualitativa curta (sem métrica inventada) — ver `spec/features/conversion-landing/sections/portfolio.md`.

**Depoimentos** (`src/app/components/Testimonials.tsx`)
- Substituir as colunas em marquee vertical por um layout distinto do resto da página: **grid masonry estático** com `react-responsive-masonry` (já instalada).
- 6 depoimentos placeholders com cargo + contexto de projeto; nomes e avatares fictícios sinalizados como tal em `spec/features/conversion-landing/sections/testimonials.md`.

### 2.5 Logos de clientes (novo na composição)

- Incluir `LogoCloud` (componente já existente em `src/app/components/LogoCloud.tsx`) na página, entre Problema e Serviços, reforçando prova social acima da dobra longa.
- Criar 6–8 SVGs de logo placeholder em `public/logos/` (nomes fictícios plausíveis: `acme`, `northwind`, `helix-labs`, `umbra`, `tessera`, `lumen`, `paraglide`, `vantage`). SVG mono-cor (zinc-400) para manter o tom premium.

### 2.6 Hierarquia de CTA

CTA primário em toda a página: **WhatsApp**. Formulário fica como alternativa explícita para quem prefere escrita assíncrona.

- Todos os botões "Quero meu projeto / Falar agora / Agendar" permanecem apontando para `whatsappHref(...)`.
- O formulário em `ContactFormSection` continua gravando em `contact_submissions` e abrindo WhatsApp no submit (sem alteração no back).
- Texto de apoio ao formulário reforça: *"Prefere escrever? Envie pelo formulário — respondemos e continuamos no WhatsApp."*

### 2.7 Floating WhatsApp button

- `src/app/components/ui/floating-consult-button.tsx`: trocar o ícone atual pelo **logo oficial do WhatsApp** (`react-icons/si` já instalada → `SiWhatsapp`) mantendo aria-label e contraste.

### 2.8 Auditoria de copy

Remoção/ reescrita de frases de marketing genérico. Exemplos já detectados:

- `CtaSection`: *"Criamos sites profissionais que não só impressionam, mas convertem."* → reescrever para algo factual, ex.: *"Sites rápidos, claros e no ar em até 7 dias."*
- `cta-4` items como *"Integração completa"*, *"Do zero ao lançamento sem complicação"* → reescrever com substantivos concretos.
- Depoimentos genéricos (*"muito mais previsibilidade"*) → substituir por frases plausíveis citando escopo entregue, não resultado inventado.
- Verificar o resto da página contra a blacklist definida em `spec/content-guidelines.md`.

### 2.9 Fora de escopo deste ciclo

O usuário confirmou **sem alteração** em:
- Captura extra no lead (sem UTM/referrer/user-agent) — tabela permanece como está.
- Webhook Discord para leads — fica para próximo ciclo (será acionado com dados separados).
- CRM.
- Deploy/domínio (já configurado).
- Analytics e SEO (G) — não introduzir GA4/Plausible/JSON-LD agora; manter o que há em `index.html`.
- LGPD/legal (H) — não criar páginas de Termos/Privacidade nem banner de cookies.
- Testes automatizados e budgets de performance (I) — manter QA manual, budgets atuais implícitos.

---

## 3. Estrutura do hub `spec/` a fundar

Este ciclo inaugura o hub canônico (ver tarefa em `tasks.md`):

```
spec/
  README.md
  product.md
  design-system.md
  content-guidelines.md
  integrations.md
  seo.md
  analytics.md
  performance-budget.md
  accessibility.md
  privacy-lgpd.md
  features/
    conversion-landing/
      readme.md
      sections/
        hero.md
        problem.md
        solution.md
        differentiators.md
        how-it-works.md
        portfolio.md
        testimonials.md
        offer.md
        faq.md
        final-cta.md
        contact-form.md
        footer.md
```

Os docs transversais descrevem o **estado-alvo pós-ciclo**. Os que fotografam áreas fora do escopo (`analytics.md`, `seo.md`, `privacy-lgpd.md`, `performance-budget.md`, `accessibility.md`) documentam o **estado atual** e marcam explicitamente o que fica como TODO de ciclos futuros.

---

## 4. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Copy nova cair em novos clichês | Usar `spec/content-guidelines.md` como checklist obrigatório em PR (mini-review manual antes do merge). |
| Nova seção Oferta virar "tabela de preços genérica" | Manter cards com foco em **o que você recebe** e **como começa**, não em comparar planos. |
| Carrossel de portfólio não-acessível | Embla já tem suporte a teclado; garantir `aria-label` nos botões e `aria-roledescription="carousel"` no container. |
| Masonry de depoimentos quebrar em mobile | Fallback: em `< 640px` virar coluna simples. |
| Preço exibido (R$999) abrir discussão comercial fora de escopo | Copy explícito "a partir de" + CTA imediato para WhatsApp resolve caso-a-caso. |

---

## 5. Critério de pronto do ciclo

- Todas as tarefas em `tasks.md` concluídas (inclusive atualização do `spec/`).
- Cenários em `scenarios.feature` validados manualmente no navegador (desktop + mobile).
- Nenhuma das frases da blacklist de `spec/content-guidelines.md` aparece no código.
- Hierarquia de CTA consistente: WhatsApp é o botão primário em Hero, Navbar, HowItWorks, Portfólio, Depoimentos, Oferta, CTA final e Floating.
- `spec/features/conversion-landing/readme.md` descreve a LP como ela realmente ficou (sem divergência com o código).
