# Design system

## 1. Stack visual

- **Tailwind CSS v4** com tokens via `@theme inline` em `src/styles/theme.css`.
- **Radix UI** + wrappers locais em `src/app/components/ui/`.
- Animação: `motion` (Framer Motion v12), `gsap`, `lenis` para smooth-scroll.
- Efeitos de fundo: `Plasma` (OGL/WebGL) no hero; `DarkVeil`, `Iridescence`, `Orb` disponíveis mas não usados na LP principal.

## 2. Paleta

Fonte da verdade: [`src/styles/theme.css`](../src/styles/theme.css).

- **Fundo global da LP**: `--page-surface: #0a0a0a` (quase preto, um degrau acima de `#000`).
- **Texto principal**: `#FFFFFF` sobre `page-surface`.
- **Texto secundário**: escala `zinc-300 → zinc-400 → zinc-500` (tailwind).
- **Hairlines/bordas**: `border-white/10`.
- **Hero**: gradiente radial escuro + WebGL Plasma (`#52525b`, `opacity 0.72`).

Não usar cores de acento fortes na LP principal. Acentos pontuais em ícones (`amber-400`, `violet-400`, `sky-400`, `emerald-400`) exclusivamente na `WhyUs`.

## 3. Tipografia

- **Display (`--font-display`)**: `Fraunces`, fallback `Georgia, serif`. Usado em H1/H2/H3 grandes, especialmente hero e títulos de seção.
- **Sans (`--font-sans`)**: `DM Sans`, fallback `system-ui`. Usado em corpo, botões, labels.
- Fonte-base: `16px` em `html`.
- Tamanhos grandes do hero: `clamp(2.6rem, 6.5vw, 5rem)`; demais seções seguem a escala nativa do Tailwind.
- Tracking padrão dos displays: `-0.02em` (títulos de seção) a `-0.03em` (hero).

## 4. Espaçamento e container

- Container da LP: `max-w-[1300px]` centralizado.
- Padding lateral responsivo: `px-4 sm:px-8 md:px-12`.
- Seções: `py-20 md:py-24` (seções densas) ou `py-24 md:py-32` (seções com headline grande).
- Hairlines top/bottom em praticamente toda seção (`bg-white/10 h-px`) como selo de ritmo vertical.

## 5. Componentes canônicos

Componentes reutilizáveis que são a "base" da LP:

| Componente | Caminho | Uso |
|---|---|---|
| `SectionHeader` | `ui/section-header.tsx` | Eyebrow + title + description. Obrigatório em toda seção. |
| `BrandLogo` | `components/BrandLogo.tsx` | Logo + wordmark. Usar no Navbar e Footer. |
| `BookCallWidget` | `components/BookCallWidget.tsx` | Cartão branco com CTA WhatsApp para conversa de 15 min. |
| `FloatingConsultButton` | `ui/floating-consult-button.tsx` | Botão flutuante fixo. Ícone = logo WhatsApp oficial. |
| `SpotlightCard` | `ui/spotlight-card.tsx` | Card com efeito spotlight, usado em `HowItWorks`. |
| `BentoGrid` | `ui/bento-grid.tsx` | Grid de cards para `WhyUs`. |
| `Cta4` | `ui/cta-4.tsx` | Bloco de CTA final com checklist. |
| `ScrollStack` | `ui/ScrollStack.tsx` | Cards que empilham no scroll — usado em Serviços. |

## 6. Botões — hierarquia

- **Primário (conversão)**: fundo branco, texto preto, ícone seta. Sempre aponta para WhatsApp.
- **Secundário**: borda `white/15`, texto `white`, fundo transparente. Usado para alternativas (ex.: rolar para Oferta).
- **Terciário**: texto puro `zinc-300 hover:text-white`, usado no menu.
- Raio padrão: `rounded-full` para CTA; `rounded-2xl` para cards.

## 7. Ícones

- Biblioteca principal: `lucide-react`.
- Logos de tecnologia e marca (incluindo WhatsApp): `react-icons/si` (Simple Icons).
- **WhatsApp floating**: sempre `SiWhatsapp` (logo oficial).

## 8. Motion

- Entrada padrão de seção: `initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}`, `duration: 0.45`.
- Animações pesadas (marquee, colunas infinitas) pausam fora de viewport via `section-anim-paused` (ver `theme.css`).
- Respeitar `prefers-reduced-motion`: marquees e colunas já têm fallback em `theme.css`.

## 9. Imagens

- Avatar pessoal: `public/avatar.png` (mesma foto usada em `BookCallWidget` e Floating).
- Logos de clientes: `public/logos/<slug>.svg` — mono-cor `zinc-400`, sem halo, ~120×32.
- Screenshots de portfólio: `public/portfolio-*.png`, otimizados em build.

## 10. Responsividade

Breakpoints tailwind padrão. Dois hooks em `src/app/lib/use-media-query.ts`:
- `useIsNarrowMobile()` → `< 640px`. Usado para desabilitar Plasma e trocar o Navbar para modo hamburguer.

Alvo: funcionar limpo em `320px` até `1920px`.

## TODO (futuros ciclos)

- Documentar tokens de focus-ring e estado disabled de forma explícita.
- Consolidar variantes de card (SpotlightCard vs BentoGrid item vs Offer card) sob uma convenção única.
