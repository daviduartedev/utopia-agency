"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

type Testimonial = {
  id: string;
  text: string;
  name: string;
  role: string;
  gradient: string;
};

const testimonials: Testimonial[] = [
  {
    id: "rafaela",
    text: "Antes o link era bonito e vazio. Hoje a página diz o serviço em uma frase e o WhatsApp enche. Pela primeira vez o Google virou canal de verdade.",
    name: "Rafaela",
    role: "Dona de serviço local",
    gradient: "from-rose-500/60 to-amber-500/60",
  },
  {
    id: "diego",
    text: "A gente vivia de indicação. Com a página certa, cliente novo chega sabendo o que quer. O time parou de perder tempo explicando o básico.",
    name: "Diego",
    role: "Prestador de serviço B2B",
    gradient: "from-indigo-500/60 to-sky-500/60",
  },
  {
    id: "tatiana",
    text: "Pedi prazo curto na proposta e foi o que aconteceu. Sinal pago, site no ar na data. Sem desculpa técnica no meio.",
    name: "Tatiana",
    role: "Empreendedora solo",
    gradient: "from-emerald-500/60 to-teal-500/60",
  },
  {
    id: "bruno",
    text: "Hoje a busca no celular mostra nosso nome com cara de empresa séria. Antes era só Instagram e sorte.",
    name: "Bruno",
    role: "Negócio local em expansão",
    gradient: "from-violet-500/60 to-fuchsia-500/60",
  },
  {
    id: "isadora",
    text: "Depois do ar continuaram no WhatsApp. Ajuste pequeno não virou cobrança absurda. Isso compra paz.",
    name: "Isadora",
    role: "Loja de nicho",
    gradient: "from-amber-500/60 to-orange-500/60",
  },
  {
    id: "pedro",
    text: "Orçamento legível, escopo curto. Serviu pra validar se fazia sentido investir maior depois.",
    name: "Pedro",
    role: "Dono de pequeno negócio",
    gradient: "from-sky-500/60 to-cyan-500/60",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Testimonials estilo Jax Orion — cluster de fotos no topo + card único navegável.
 */
export function Testimonials() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const goNext = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  const current = testimonials[index];

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-heading"
      className="relative w-full bg-section-over-gradient py-24 md:py-32"
    >
      <SectionHeader
        eyebrow="Depoimentos"
        title="Vozes de confiança e resultado"
        description="Negócios que precisavam de página clara, prazo cumprido e alguém que respondesse depois do ar."
        id="depoimentos-heading"
      />

      {/* Cluster decorativo de avatares */}
      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 0 })}
        className="mt-10 flex items-center justify-center"
      >
        <div className="flex -space-x-3">
          {testimonials.slice(0, 5).map((t) => (
            <div
              key={t.id}
              className={`relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-gradient-to-br ${t.gradient} text-[12px] font-semibold text-white shadow-lg`}
            >
              {getInitials(t.name)}
            </div>
          ))}
          <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-zinc-800 text-[11px] font-medium text-zinc-300 shadow-lg">
            +20
          </div>
        </div>
      </motion.div>

      <p className="mt-5 text-center text-[12px] font-medium uppercase tracking-[0.16em] text-zinc-500">
        Aprovado por quem confia · feito pra inspirar
      </p>

      {/* Card único com setas */}
      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 1 })}
        className="mx-auto mt-12 w-full max-w-3xl px-4 sm:px-8 md:px-12"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 p-8 backdrop-blur-sm md:p-12">
          <Quote
            className="absolute right-6 top-6 h-12 w-12 text-white/[0.04]"
            strokeWidth={1.5}
            aria-hidden
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${current.gradient} text-[14px] font-semibold text-white shadow`}
                >
                  {getInitials(current.name)}
                </div>
                <div className="flex flex-col leading-tight">
                  <span
                    className="text-[15px] font-semibold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {current.name}
                  </span>
                  <span className="text-[13px] text-zinc-400">
                    {current.role}
                  </span>
                </div>
              </div>

              <blockquote
                className="text-[1.05rem] italic leading-relaxed text-zinc-200 md:text-[1.18rem]"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                “{current.text}”
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Depoimento anterior"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/80 text-zinc-300 transition-colors hover:border-white/25 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="min-w-[3rem] text-center text-[12px] font-medium uppercase tracking-[0.16em] text-zinc-500">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Próximo depoimento"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/80 text-zinc-300 transition-colors hover:border-white/25 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
