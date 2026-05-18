"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { whatsappHref } from "../../lib/whatsapp";
import { WA_MSG_HERO } from "../../lib/whatsapp-messages";
import { usePrefersReducedMotion } from "../../lib/motion-pref";
import { cn } from "./utils";

const HERO_CASES: ReadonlyArray<{ src: string; alt: string; label: string }> = [
  { src: "/portfolio-movix-erp.png", alt: "Painel ERP para lojistas", label: "Painel ERP" },
  { src: "/portfolio-emera-solar.png", alt: "Landing page para loja de paineis solares", label: "Landing page" },
  { src: "/portfolio-appweb-barbearia.png", alt: "App web de agendamento para barbearia", label: "App web" },
];

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  ctaDescription?: string;
  primaryCtaLabel?: string;
  footnote?: string;
}

export function CinematicHero({
  tagline1 = "Entrega r\u00e1pida. Produto premium. Resultado real.",
  tagline2,
  ctaDescription = "Execu\u00e7\u00e3o de alto n\u00edvel para a sua marca aparecer como merece.",
  primaryCtaLabel = "Quero meu projeto",
  footnote = "Utopia Studio",
  className,
  ...props
}: CinematicHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const titleLines = tagline1
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `${part}.`);

  const entrance = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.65,
      delay: prefersReducedMotion ? 0 : delay,
      ease: [0.22, 0.65, 0.36, 1] as const,
    },
  });

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[100svh] w-full flex-col items-center overflow-hidden bg-[var(--utopia-paper)] px-4 pb-10 pt-24 text-[var(--utopia-ink)] sm:px-6 md:pt-28",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] z-0 h-[56vw] max-h-[620px] min-h-[360px] w-[110vw] max-w-[1180px] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(92,255,0,0.92)_0%,rgba(121,255,45,0.62)_24%,rgba(171,255,105,0.28)_46%,rgba(246,242,233,0)_72%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.42),rgba(255,255,255,0)_24%,rgba(255,255,255,0.44)_46%,rgba(255,255,255,0)_67%,rgba(255,255,255,0.38))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 bg-gradient-to-b from-transparent to-[var(--utopia-paper)]"
      />

      <motion.div
        {...entrance(0.08)}
        className="relative z-10 mx-auto mt-9 flex w-full max-w-[920px] flex-col items-center text-center md:mt-12"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-black/70 shadow-[0_12px_40px_rgba(24,24,24,0.08)] backdrop-blur-xl">
          <Sparkles className="size-3" />
          Oficial Utopia Content
        </div>

        <h1
          className="max-w-[1040px] text-[clamp(2.35rem,6.35vw,4.7rem)] font-black uppercase leading-[0.9] text-black"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0" }}
        >
          {titleLines.length > 1
            ? titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))
            : tagline1}
          {tagline2?.trim() ? <span className="block">{tagline2}</span> : null}
        </h1>

        {ctaDescription?.trim() ? (
          <p className="mt-5 max-w-[520px] text-[15px] font-medium leading-tight text-black/70 sm:text-base">
            {ctaDescription}
          </p>
        ) : null}

        <a
          href={whatsappHref(WA_MSG_HERO)}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-[13px] font-bold text-white shadow-[0_16px_38px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--utopia-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
        >
          {primaryCtaLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>

        {footnote ? (
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45">
            {footnote}
          </p>
        ) : null}
      </motion.div>

      <motion.div
        {...entrance(0.18)}
        className="relative z-10 mx-auto mt-5 w-full max-w-[1120px] md:mt-7"
      >
        <div className="relative mx-auto aspect-[1.36/1] w-full max-w-[880px] overflow-visible sm:aspect-[1.78/1]">
          <div className="absolute left-1/2 top-[6%] z-20 w-[82%] -translate-x-1/2 overflow-hidden rounded-[24px] border border-black/10 bg-white p-2 shadow-[0_30px_90px_rgba(24,24,24,0.22)] sm:rounded-[30px]">
            <div className="flex items-center justify-between rounded-t-[18px] bg-[#ececec] px-3 py-2">
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-[#ff5f57]" />
                <span className="size-2 rounded-full bg-[#ffbd2e]" />
                <span className="size-2 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[10px] font-bold text-black/45">utopia.app.br</span>
              <span className="size-2" />
            </div>
            <img
              src={HERO_CASES[0].src}
              alt={HERO_CASES[0].alt}
              width={960}
              height={540}
              decoding="async"
              className="aspect-[16/9] w-full rounded-b-[18px] object-cover"
            />
          </div>

          {HERO_CASES.slice(1).map((item, index) => (
            <div
              key={item.src}
              className={cn(
                "absolute top-[34%] z-10 hidden w-[30%] overflow-hidden rounded-[18px] border border-black/10 bg-white p-1.5 shadow-[0_18px_55px_rgba(24,24,24,0.16)] sm:block",
                index === 0 ? "left-0 -rotate-3" : "right-0 rotate-3",
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                width={360}
                height={240}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[13px] object-cover"
              />
              <p className="px-2 py-2 text-[10px] font-bold text-black/60">{item.label}</p>
            </div>
          ))}

          <div className="absolute bottom-[3%] left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-black/10 bg-white/80 p-2 shadow-[0_18px_50px_rgba(24,24,24,0.16)] backdrop-blur-xl">
            {["Design", "Web", "App", "Brand"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[10px] font-bold text-black/60"
              >
                <Check className="size-3 text-[var(--utopia-green)]" />
                {label}
              </span>
            ))}
          </div>

          <a
            href={whatsappHref(WA_MSG_HERO)}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-[5%] top-[54%] z-40 hidden items-center gap-2 rounded-full bg-black px-3 py-2 text-[11px] font-bold text-white shadow-[0_14px_34px_rgba(0,0,0,0.28)] md:inline-flex"
          >
            <MessageCircle className="size-3.5" />
            Falar agora
          </a>
        </div>
      </motion.div>
    </section>
  );
}
