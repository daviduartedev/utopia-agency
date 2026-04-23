# Portfólio

**Componente:** `src/app/components/Portfolio.tsx` (compõe `CardSwap` + conteúdo de cases).  
**Módulo reutilizável:** `src/app/components/CardSwap/`.  
**Posição:** 7ª secção.  
**Âncora:** `#portfolio`.

## 1. Objetivo de funil

Mostrar de forma tangível **o tipo de entrega** que a Utopia faz — LP de produto, sistema interno, app de agendamento. Evidência qualitativa, sem métrica inventada.

A apresentação é uma **pilha 3D** com rotação automática em ciclo: cada “cartão” de topo representa um case; a animação revela, ao longo do tempo, a variedade de trabalhos — **não** é carrossel horizontal com slides e setas (Embla foi substituído **nesta secção**).

## 2. Comportamento

- A pilha contém **um** cartão lógico por case da tabela canónica; ordem = ordem de dados. `delay` / GSAP: intervalo entre trocas (configuração actual: **~3,5s**, ajustável).
- **Pausa ao passar o rato** (hover) **só** no rectângulo do stack (não abrange a legenda de baixo), quando a animação estiver activa, para o visitante inspeccionar sem competir com o ciclo; fora do stack, o timer mantém o ritmo.
- **`prefers-reduced-motion: reduce`:** nenhuma rotação 3D automática; a pilha permanece **estática**; o conteúdo (imagens, títulos) permanece acessível e legível. Alinhar a `usePrefersReducedMotion` / implementação de `CardSwap` ao resto do site.
- **Sem links de demo** nos cards: a acção de conversão continua a ser CTAs e WhatsApp a jusante; a legenda (título + escopo) segue o case em destaque via `onFrontIndexChange` (ou equivalente) para o título alinhado ao card da frente.
- Não auto-play além do ciclo da pilha. Não paginação por “bolinhas”.

## 3. Copy canônica (secção)

- **Eyebrow:** `Portfólio`
- **Title:** `Prova no mundo real`
- **Description:** `Seleção de entregas — de site de produto a painel que a equipe usa todo dia, sem número inventado.`

## 4. Cases (placeholders realistas)

Lista canónica. Enquanto não houver autorização dos clientes reais, mantêm-se nomes genéricos já usados no `public/` + placeholders onde indicado.

| # | Título visível | Imagem | Layout |
|---|---|---|---|
| 1 | `ERP para lojistas` | `/portfolio-movix-erp.png` | `web` |
| 2 | `LP para loja de painéis solares` | `/portfolio-emera-solar.png` | `web` |
| 3 | `App de agendamento para barbearia` | `/mobile.png` | `phone` |
| 4 | `Painel administrativo para clínica` | `[placeholder]` | `web` |
| 5 | `Site institucional com blog` | `[placeholder]` | `web` |
| 6 | `Site para jogos eletrônicos (CS2)` | `/portfolio-dr-black-skins.png` | `web` |

**Legendas (sempre visíveis, preferencialmente junto do stack):** título + 1 frase de escopo alinhada ao case **em destaque** (o cartão de topo a cada momento), sincronizados com a prop `onFrontIndexChange` do `CardSwap`. Nunca métricas inventadas (`content-guidelines.md`).

**Case 6 —** escopo canónico: `Loja premium de skins CS2 com vitrine, rifas e fluxos claros para conversão.`

## 5. Visual

- A pilha 3D usa `perspective` e offsets coerentes com a implementação (CardSwap); todos os cases (incl. `phone`) usam a **área do card** com `object-contain` em largura/altura completas, sem recorte a um “telemóvel” estreito no meio; o rótulo `phone` no dado canónico só descreve o conteúdo, não a moldura.
- Superfície, bordas, sombra: alinhar a `design-system.md` (`border-white/10`, `rounded-2xl` / equivalente, fundo alinhado à página).
- Em ecrãs < 768px, reduzir largura, altura e offsets de forma a não transbordar; manter a mesma ordem e conteúdo.
- Pode manter leves *fades* ou hachuras laterais na secção se ajudarem a ancorar o bloco, desde que não simulem “há slides horizontais” de forma falsa; não são obrigatórios pós-migração.

## 6. Acessibilidade

- Secção: `<section aria-labelledby="portfolio-heading">` (inalterado).
- Região do stack: `role="region"` (ou `group` com `aria-label`) com **rótulo** coerente com a secção, **não** forçar `aria-roledescription="carousel"` de slides horizontais se a UX for só pilha + ciclo; ver [`../../../accessibility.md`](../../../accessibility.md) §5.
- Imagens: `alt` informativo com o título do case (a legenda reforça título + escopo).
- Quando o case em frente muda, **actualizar** a legenda visível; opcional: `aria-live="polite"` com o título (curto) para anunciar a rotação — a implementação concreta vs. risco de *spam* fica a critério, preferindo o mínimo necessário.
- Foco: estados de foco visíveis alinhados ao desing system; ao foco em teclado, o fluxo de tab não fica “preso” a um widget sem equivalente a carrossel clássico.
- Não requerer setas esquerda/direita como padrão único de avanço (a pilha é outro padrão).

## 7. Não fazer

- Não reintroduzir o carrossel horizontal (Embla) **nesta secção** (outros componentes podem continuar a usar Embla no codebase).
- Não inventar métricas; não dobrar copy canónica.
- Página de demo estática separada na raiz (ex.: outra `index.html` só para CardSwap) — **não** é requisito; a secção no `/` cumpre o “demo” de produto.

## 8. Placeholders

- Cases 4 e 5: enquanto não houver `public/portfolio-placeholder-<slug>.png` ou similares, o placeholder escuro com título textual (como o código de referência) permanece canónico.

## TODO (futuros ciclos)

- Controlo “anterior/seguinte” explícito se a pesquisa com utilizadores o pedir.
- Eventos de analytics no portfólio (se aplicável) — quando `analytics.md` tiver o contrato.
