"use client";

import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";
import { useIsNarrowMobile } from "../lib/use-media-query";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";
import { cn } from "./ui/utils";

const STACK_ITEMS = [
  {
    id: "landing",
    kicker: "Onde a conversão nasce",
    title: "Site e landing que pedem contato",
    body:
      "Frase certa em cima. Prova no meio. Botão de WhatsApp ou formulário na cara. Quem busca no celular entende na hora e chama.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=85&w=1600&auto=format&fit=crop",
  },
  {
    id: "saas",
    kicker: "Quando o fluxo aperta",
    title: "Painel e sistema interno",
    body:
      "Agenda, pedido, cadastro, área do cliente: o que sua operação precisa num lugar só. Menos planilha solta, menos retrabalho.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "apps",
    kicker: "No bolso",
    title: "Aplicativo",
    body:
      "Cliente marca, paga ou acompanha pelo celular. Telas enxutas, linguagem simples, sem complicar o dia a dia de quem usa.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop",
  },
] as const;

function optimizeServiceImage(url: string, mobile: boolean): string {
  try {
    const u = new URL(url);
    u.searchParams.set("w", mobile ? "720" : "1400");
    u.searchParams.set("q", mobile ? "68" : "80");
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    return u.toString();
  } catch {
    return url;
  }
}

export function OfferingsScrollStack() {
  const narrowMobile = useIsNarrowMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="ofertas"
      className="relative z-10 w-full scroll-mt-24 bg-section-over-gradient text-white"
      aria-labelledby="ofertas-heading"
    >
      <SectionHeader
        id="ofertas-heading"
        className="pb-8 pt-12 md:pb-10 md:pt-16"
        title="O que a gente coloca no ar pra você"
        description="Primeiro a página que traz contato. Se o negócio pedir, a gente sobe pra painel ou app, sempre com escopo e prazo escritos."
        compactDescription
      />

      <div className="mx-auto flex max-w-[1300px] flex-col gap-10 px-4 pb-16 sm:px-8 md:gap-12 md:px-12">
        {STACK_ITEMS.map((item, index) => {
          const imageFirst = index % 2 === 0;
          const imageUrl = optimizeServiceImage(item.image, narrowMobile);

          return (
            <motion.article
              key={item.id}
              {...scrollRevealMotion(prefersReducedMotion, {
                delayIndex: index,
                lateral: true,
              })}
              aria-labelledby={`oferta-${item.id}-title`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <div
                className={cn(
                  "grid grid-cols-1 md:min-h-[min(22rem,52vw)] lg:min-h-[20rem]",
                  "md:grid-cols-2",
                )}
              >
                <div
                  className={cn(
                    "relative min-h-[14rem] overflow-hidden md:min-h-0",
                    imageFirst ? "md:order-1" : "md:order-2",
                  )}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-page-surface/25 to-transparent md:bg-gradient-to-r md:from-black/55 md:via-page-surface/20 md:to-transparent" />
                </div>

                <div
                  className={cn(
                    "relative z-30 flex flex-col justify-center gap-3 px-6 py-8 sm:px-8 md:py-10 md:pl-10 md:pr-12",
                    imageFirst ? "md:order-2" : "md:order-1",
                  )}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400 md:text-xs">
                    {item.kicker}
                  </p>
                  <h3
                    id={`oferta-${item.id}-title`}
                    className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl md:text-[2.1rem] md:leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="max-w-prose text-[15px] leading-relaxed text-zinc-300 md:text-base"
                    style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
