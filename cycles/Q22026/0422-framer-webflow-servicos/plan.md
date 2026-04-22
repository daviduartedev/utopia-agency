# Plan — Motion estilo Framer/Webflow + Serviços refeitos + GradualBlur (delta)

**Cycle:** `Q22026/0422-framer-webflow-servicos`  
**Feature canônica:** [`spec/features/conversion-landing/readme.md`](../../../spec/features/conversion-landing/readme.md)  
**Request + decisões:** [`request.md`](request.md)

---

## 1. Objetivo do ciclo

Elevar a sensação **“produção Framer/Webflow”** em **toda** a landing: entradas laterais, transições ao scroll e microinterações mais marcantes, **sem** que o visitante perceba o site como lento ou pesado.

Em paralelo, **refazer apenas a apresentação** da seção **“Nossos serviços”** (4ª seção, âncora `#ofertas`): novo arranjo visual e comportamental **claramente distinto** do `ScrollStack` atual, mantendo a **copy canônica** dos três serviços.

Integração opcional porém desejada do componente **GradualBlur** (referência [React Bits](https://reactbits.dev/)), usada com **moderação** e mitigação de custo de GPU (vide §4).

---

## 2. Delta contra o spec anterior

| Área | Antes | Depois (acordado) |
|------|--------|-------------------|
| Motion — escopo | Ênfase nas cinco seções centrais + restante “onde for natural” | **Toda** a página pode receber o mesmo vocabulário de motion (Hero, Logos, Portfólio, FAQ, CTA, Form, Navbar/Floating onde fizer sentido), sempre respeitando performance e `prefers-reduced-motion` |
| Serviços — layout | `OfferingsScrollStack` + `ScrollStack` (cards empilhando no scroll) + fallback mobile | **Outro** padrão de layout/composição; **não** depender do empilhamento scroll-driven atual; copy da seção e dos três itens **inalteradas** (textos em `solution.md`) |
| Serviços — âncora | `#ofertas` | **Permanece** `#ofertas`; Navbar/Footer **não** mudam de destino |
| Efeitos | — | **GradualBlur** permitido como camada de profundidade (ex.: bordas de leitura, transição entre mídia e texto), com contrato de performance em `performance-budget.md` |
| Dependências | `motion` + GSAP/Lenis onde já existem | **Sem** `mathjs` obrigatório para o port do GradualBlur enquanto a implementação for matematicamente trivial no próprio componente; qualquer lib nova deve ser justificada no PR |

---

## 3. Diretrizes de implementação (não prescritivas)

- **Motion global:** reutilizar `usePrefersReducedMotion` + `scrollRevealMotion(..., { lateral: true })` ou padrões equivalentes em `motion-pref.ts`; evitar animar propriedades caras em loop (layout thrash, `filter` em elementos grandes em movimento).
- **Serviços:** explorar composições tipo faixas horizontais, painéis alternados, bento assimétrico, ou “featured + secundários” — desde que os **três** serviços permaneçam na ordem Landing → SaaS → App e com a mesma copy.
- **GradualBlur:** preferir `target="parent"` em containers com **altura limitada**; limitar `divCount` e `strength` em mobile; com `prefers-reduced-motion: reduce`, **desligar** empilhamento de `backdrop-filter` ou substituir por véu sólido/gradiente simples.

---

## 4. Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Vários `backdrop-filter` (GradualBlur) derrubam FPS | Poucas instâncias; `divCount` baixo em mobile; pausar/fora do viewport quando aplicável; fallback sem blur em `reduce` |
| Motion em excesso atrapalha conversão | CTAs e links permanecem clicáveis sem delay artificial; nada cobre botões de WhatsApp |
| Regressão de LCP/INP | Manter lazy de seções; não importar GradualBlur no chunk inicial do hero se não necessário |
| Confusão entre “Serviços” e “Oferta” | Spec já separa `solution.md` vs `offer.md`; implementação não mistura copy comercial de preço na seção de serviços |

---

## 5. Critério de pronto

- `spec/features/conversion-landing/readme.md`, `sections/solution.md`, `spec/design-system.md` §8/componentes e `spec/performance-budget.md` refletem escopo de motion **em toda a página**, novo layout de Serviços e uso de GradualBlur.
- Implementação: seção Serviços **visualmente distinta** do ciclo anterior; `#ofertas` preservado.
- QA manual de `scenarios.feature` deste ciclo; smoke de rolagem e clique em CTAs sem jank perceptível.
- Nenhuma frase da blacklist em `content-guidelines.md`.
