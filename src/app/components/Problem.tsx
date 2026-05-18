"use client";

import { Search, Share2, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

type PainIcon = typeof Search;

const painPoints: ReadonlyArray<{
  num: string;
  title: string;
  body: string;
  Icon: PainIcon;
}> = [
  {
    num: "01",
    title: "Busca no Google, você não aparece",
    body: "Cliente digita o serviço na cidade. Aparece mapa, foto, avaliação do outro. Você nem entra na briga. O orçamento nasce ali, e não no seu WhatsApp.",
    Icon: Search,
  },
  {
    num: "02",
    title: "Só indicação e post não enchem agenda",
    body: "Feed some. Grupo esfria. Indicação vem quando vem. Sem página séria, você fica refém de sorte e não sabe quanto entra no mês.",
    Icon: Share2,
  },
  {
    num: "03",
    title: "Sem presença clara, não fecha",
    body: "Gente nova abre o link e desconfia. Sem prova, sem texto direto e sem chamada óbvia, ela chama quem parece mais estabelecido. Você perde na primeira impressão.",
    Icon: Wallet,
  },
];

export function Problem() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="relative w-full bg-section-over-gradient py-24 md:py-32"
    >
      <SectionHeader
        eyebrow="O problema"
        title="Se sua empresa não tem um site, ela praticamente não existe."
        description="Não é preguiça sua. É falta de lugar na internet que explica, prova e pede contato. Três jeitos de perder cliente sem perceber:"
        id="problema-heading"
      />

      <div className="mx-auto mt-14 grid w-full max-w-5xl gap-4 px-4 sm:gap-5 sm:px-8 md:mt-20 md:grid-cols-3 md:px-12">
        {painPoints.map((p, i) => (
          <motion.article
            key={p.num}
            {...scrollRevealMotion(prefersReducedMotion, { delayIndex: i })}
            className="group relative flex flex-col rounded-3xl border border-white/10 bg-zinc-950/60 p-7 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-zinc-900/70 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <span
                className="text-[12px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
              >
                / {p.num}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300">
                <p.Icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
            </div>
            <h3
              className="mb-3 text-[1.25rem] font-semibold leading-snug tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {p.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-zinc-400">{p.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
