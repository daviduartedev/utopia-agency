"use client";

import { motion } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Quote } from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { SpotlightCard } from "./ui/spotlight-card";

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

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
      className="mb-5"
    >
      <SpotlightCard className="flex flex-col gap-4 p-6 sm:p-7 md:p-8">
        <Quote
          className="size-5 text-white/30"
          strokeWidth={1.75}
          aria-hidden
        />
        <blockquote
          className="m-0 border-none p-0 text-[15px] leading-relaxed text-zinc-200 sm:text-base"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          <p className="m-0">{t.text}</p>
          <div className="my-4 h-px w-full bg-white/10" aria-hidden />
          <footer className="flex items-center gap-3">
            <span
              aria-hidden
              className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white/90 ${t.gradient}`}
            >
              <Initials name={t.name} />
            </span>
            <cite className="not-italic">
              <p className="truncate text-sm font-medium text-white">{t.name}</p>
              <p className="truncate text-[12px] text-zinc-500">{t.role}</p>
            </cite>
          </footer>
        </blockquote>
      </SpotlightCard>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-heading"
      className="relative z-10 w-full scroll-mt-28 bg-page-surface py-20 text-zinc-100 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            id="depoimentos-heading"
            className="mb-12 md:mb-14"
            eyebrow="Depoimentos"
            title="O que dizem nossos clientes"
            description="Feedback real de quem confiou na Utopia — landing pages, produtos SaaS e apps."
          />
        </motion.div>

        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 700: 2, 1100: 3 }}
          gutterBreakpoints={{ 350: "16px", 700: "20px", 1100: "24px" }}
        >
          <Masonry>
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}
