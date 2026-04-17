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
    text: "A landing saiu em menos de duas semanas e, pela primeira vez, o site conversa com o cliente que a gente quer atrair.",
    name: "Rafaela",
    role: "Fundadora • estúdio de design",
    gradient: "from-rose-500/60 to-amber-500/60",
  },
  {
    id: "diego",
    text: "A Utopia me entregou um painel SaaS direto, sem tela inútil. Entramos no ritmo em poucos dias — o time adotou sem atrito.",
    name: "Diego",
    role: "Fundador • SaaS de RH",
    gradient: "from-indigo-500/60 to-sky-500/60",
  },
  {
    id: "tatiana",
    text: "Pedi site em até 7 dias e foi o que aconteceu. Proposta curta, sinal e entrega em cima do cronograma.",
    name: "Tatiana",
    role: "Consultora solo",
    gradient: "from-emerald-500/60 to-teal-500/60",
  },
  {
    id: "bruno",
    text: "O que mudou foi a clareza: a gente consegue explicar o produto em uma frase e a página mostra exatamente isso.",
    name: "Bruno",
    role: "Co-founder • fintech early-stage",
    gradient: "from-violet-500/60 to-fuchsia-500/60",
  },
  {
    id: "isadora",
    text: "Depois do lançamento, eles continuaram disponíveis pelo WhatsApp. Dúvida rápida vira conversa, não chamado novo.",
    name: "Isadora",
    role: "E-commerce de nicho",
    gradient: "from-amber-500/60 to-orange-500/60",
  },
  {
    id: "pedro",
    text: "Orçamento claro, escopo enxuto e entrega rápida. Serviu exatamente para eu validar a ideia antes de escalar.",
    name: "Pedro",
    role: "Fundador solo • SaaS B2B",
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
  const headerMotion = scrollRevealMotion(prefersReducedMotion);
  const [featured, ...rest] = testimonials;

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-heading"
      className="relative z-10 w-full scroll-mt-28 bg-page-surface py-20 text-zinc-100 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-8 md:px-12">
        <motion.div {...headerMotion}>
          <SectionHeader
            id="depoimentos-heading"
            className="mb-12 md:mb-16"
            eyebrow="Depoimentos"
            title="O que dizem nossos clientes"
            description="Feedback de quem confiou na Utopia para landing pages, produtos SaaS e apps."
          />
        </motion.div>

        <motion.div
          {...scrollRevealMotion(prefersReducedMotion)}
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
                fontFamily: "var(--font-display), Georgia, serif",
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
              {...scrollRevealMotion(prefersReducedMotion, { delayIndex: i })}
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
