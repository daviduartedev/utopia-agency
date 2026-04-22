# Tasks — Motion Framer/Webflow + Serviços + GradualBlur

**Cycle:** `Q22026/0422-framer-webflow-servicos`  
**Plan:** [`plan.md`](plan.md) · **Scenarios:** [`scenarios.feature`](scenarios.feature) · **Request:** [`request.md`](request.md)

---

## 0. Setup do ciclo

- [x] Garantir que `cycles/Q22026/0422-framer-webflow-servicos/` contém `request.md`, `plan.md`, `tasks.md`, `scenarios.feature`.
- [x] Atualizar `cycles/request.md` na raiz para apontar para este diretório (evitar duas fontes de verdade).

---

## 1. Atualizar `spec/` (obrigatório antes do merge)

- [x] `spec/features/conversion-landing/readme.md` — motion em **toda** a LP; Serviços com layout novo; menção ao GradualBlur onde for canônico.
- [x] `spec/features/conversion-landing/sections/solution.md` — remover prescrição exclusiva de `ScrollStack`; descrever novo padrão visual/comportamental mantendo copy e `#ofertas`.
- [x] `spec/design-system.md` — registrar `GradualBlur` (caminho do componente) e regras de uso (reduce, mobile).
- [x] `spec/performance-budget.md` — contrato para blur empilhado / `backdrop-filter`; fallback em `prefers-reduced-motion`.

---

## 2. GradualBlur (React Bits)

- [x] Adicionar componente em `src/app/components/ui/gradual-blur.tsx` (ou caminho alinhado ao design system) + CSS colocalizado (ex. `gradual-blur.css`).
- [x] **Não** adicionar `mathjs` a menos que a implementação final dependa dele de fato; preferir `Math.pow` / curvas locais como no snippet de referência.
- [x] Remover duplicação desnecessária (`injectStyles` vs import CSS) — uma única fonte de estilo.
- [x] Exportar props tipadas (TypeScript) coerentes com o projeto.
- [x] Garantir `prefers-reduced-motion: reduce` → sem empilhamento pesado de blur (gradiente sólido ou blur desligado).

---

## 3. Seção “Nossos serviços”

- [x] Substituir o layout atual de `OfferingsScrollStack.tsx` por composição **nova** (pode manter nome do arquivo ou extrair subcomponente, desde que lazy em `lazy-pages.tsx` continue válido).
- [x] Reutilizar **exatamente** a copy canônica de `solution.md` (título, descrição, três kickers + corpos, ordem).
- [x] Manter `<section … id="ofertas">` (ou equivalente que preserve âncora) e `aria-labelledby` conforme spec.
- [x] Integrar **GradualBlur** em pelo menos um momento **útil** da seção (ex.: limite entre mídia e texto), com props conservadoras em mobile.
- [x] Smoke: mobile estreito (`<640px`) — leitura e rolagem sem travamentos óbvios (validar no navegador ao revisar PR).

---

## 4. Motion em toda a landing

- [x] Hero, `ClientLogos`, `Portfolio`, `Faq`, `CtaSection`, `ContactFormSection`, `Navbar` / `FloatingConsultButton`: aplicar entradas/transições coerentes com `motion-pref.ts` (incl. `lateral` onde fizer sentido), sem redesenhar copy ou ordem de seções.
- [x] Confirmar que CTAs WhatsApp e formulário **não** perdem responsividade nem área de clique.
- [x] Revisar seções já refinadas (Problema, WhyUs, etc.) para evitar **dupla animação** pesada ou conflito com novo padrão global (sem alterações adicionais necessárias).

---

## 5. Performance e QA

- [ ] `npm run dev` — percurso completo desktop + mobile; validar `scenarios.feature` deste ciclo + regressão dos cenários de conversão já existentes.
- [ ] Com `prefers-reduced-motion` ativado no SO: página utilizável, sem “efeito doente”.
- [ ] Lighthouse smoke (informativo): comparar sensação de rolagem antes/depois; investigar se FPS cai em faixa com GradualBlur.
- [x] `npm run build` — build de produção passou após as alterações.

---

## 6. Fora de escopo

- Alterar copy comercial da **Oferta** ou mensagens WhatsApp.
- Trocar `#ofertas` ou ordem das 13 seções em `App.tsx`.
- Gate formal de Lighthouse CI (permanece TODO em `performance-budget.md`).
