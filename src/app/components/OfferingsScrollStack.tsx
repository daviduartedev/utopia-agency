"use client";

import { motion } from "motion/react";
import { Globe, LayoutDashboard, Smartphone } from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { useIsNarrowMobile } from "../lib/use-media-query";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";
import { cn } from "./ui/utils";

type SiteOffering = {
  id: "landing" | "saas" | "apps";
  kicker: string;
  title: string;
  body: string;
  image: string;
  Icon: typeof Globe;
};

const STACK_ITEMS: ReadonlyArray<SiteOffering> = [
  {
    id: "landing",
    kicker: "Onde a conversão nasce",
    title: "Site e landing que pedem contato",
    body:
      "Frase certa em cima. Prova no meio. Botão de WhatsApp ou formulário na cara. Quem busca no celular entende na hora e chama.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=85&w=1200&auto=format&fit=crop",
    Icon: Globe,
  },
  {
    id: "saas",
    kicker: "Quando o fluxo aperta",
    title: "Painel e sistema interno",
    body:
      "Agenda, pedido, cadastro, área do cliente: o que sua operação precisa num lugar só. Menos planilha solta, menos retrabalho.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    Icon: LayoutDashboard,
  },
  {
    id: "apps",
    kicker: "No bolso",
    title: "Aplicativo",
    body:
      "Cliente marca, paga ou acompanha pelo celular. Telas enxutas, linguagem simples, sem complicar o dia a dia de quem usa.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    Icon: Smartphone,
  },
];

function optimizeServiceImage(url: string, narrowMobile: boolean): string {
  if (!narrowMobile) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("w", "720");
    u.searchParams.set("q", "70");
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Serviços oferecidos — grid de 3 cards estilo "folder" Jax.
 * Mantém o id `ofertas` pra ancoragem do menu.
 */
export function OfferingsScrollStack() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const narrowMobile = useIsNarrowMobile();

  return (
    <section
      id="ofertas"
      aria-labelledby="ofertas-heading"
      className="relative w-full bg-section-over-gradient py-24 md:py-32"
    >
      <SectionHeader
        eyebrow="Serviços"
        title="O que a gente coloca no ar pra você"
        description="Primeiro a página que traz contato. Se o negócio pedir, a gente sobe pra painel ou app, sempre com escopo e prazo escritos."
        id="ofertas-heading"
      />

      <div className="mx-auto mt-14 grid w-full max-w-6xl gap-5 px-4 sm:gap-6 sm:px-8 md:mt-20 md:grid-cols-3 md:px-12">
        {STACK_ITEMS.map((item, i) => (
          <motion.article
            key={item.id}
            {...scrollRevealMotion(prefersReducedMotion, { delayIndex: i })}
            aria-labelledby={`oferta-${item.id}-title`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900/80"
          >
            {/* Mockup com efeito folder */}
            <div className="relative aspect-[5/3] overflow-hidden">
              <div className="absolute inset-x-6 top-3 h-3 rounded-t-xl bg-zinc-800/80 [transform:perspective(600px)_rotateX(8deg)]" />
              <div className="absolute inset-3 overflow-hidden rounded-2xl border border-white/5">
                <img
                  src={optimizeServiceImage(item.image, narrowMobile)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300">
                  <item.Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {item.kicker}
                </span>
              </div>
              <h3
                id={`oferta-${item.id}-title`}
                className="mb-3 text-[1.2rem] font-semibold leading-snug tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.title}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-zinc-400">
                {item.body}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
