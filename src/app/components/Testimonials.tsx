"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
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

function Initials({ name }: { name: string }) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerMotion = scrollRevealMotion(prefersReducedMotion, {
    delayIndex: 0,
    lateral: true,
  });
  const [featured, ...rest] = testimonials;

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-heading"
      className="relative z-10 w-full scroll-mt-28 bg-section-over-gradient py-12 text-zinc-100 md:py-16"
    >
      <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-8 md:px-12">
        <motion.div {...headerMotion}>
          <SectionHeader
            id="depoimentos-heading"
            className="mb-8 md:mb-10"
            eyebrow="Prova"
            title="Quem já saiu da invisibilidade"
            description="Negócios que precisavam de página clara, prazo cumprido e alguém que respondesse depois do ar."
          />
        </motion.div>

        <motion.div
          {...scrollRevealMotion(prefersReducedMotion, {
            delayIndex: 0,
            lateral: true,
          })}
          className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-page-surface to-page-surface p-8 md:p-12"
        >
          <Quote
            className="absolute right-6 top-6 size-16 text-emerald-400/10 md:size-24"
            strokeWidth={1.25}
            aria-hidden
          />
          <figure className="relative max-w-3xl">
            <blockquote
              className="m-0 border-none p-0 text-[clamp(1.125rem,2.4vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-white"
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              <p className="m-0">{featured.text}</p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span
                aria-hidden
                className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white/95 ${featured.gradient}`}
              >
                <Initials name={featured.name} />
              </span>
              <cite className="not-italic">
                <p className="text-base font-semibold text-white">{featured.name}</p>
                <p className="text-sm text-zinc-500">{featured.role}</p>
              </cite>
            </figcaption>
          </figure>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-7">
          {rest.map((t, i) => (
            <motion.figure
              key={t.id}
              {...scrollRevealMotion(prefersReducedMotion, {
                delayIndex: i + 1,
                lateral: true,
              })}
              className="group relative m-0 border-l-2 border-white/15 pl-6 transition-colors hover:border-emerald-400/40"
            >
              <blockquote
                className="m-0 border-none p-0 text-[15px] leading-relaxed text-zinc-300"
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                <p className="m-0">{t.text}</p>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden
                  className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white/90 ${t.gradient}`}
                >
                  <Initials name={t.name} />
                </span>
                <cite className="not-italic">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-[12px] text-zinc-500">{t.role}</p>
                </cite>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
