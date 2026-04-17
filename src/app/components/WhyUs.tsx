import { motion } from "motion/react";
import {
  MessageSquare,
  PackageCheck,
  Star,
  Zap,
} from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

type FeatureCell = {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: string;
  barClass: string;
};

const features: FeatureCell[] = [
  {
    title: "Entrega ágil",
    description:
      "Da proposta ao ar com processo enxuto, sem reuniões desnecessárias e sem fases de aprovação intermináveis.",
    icon: <Zap className="size-5 text-amber-300" strokeWidth={1.75} />,
    status: "Ritmo",
    barClass: "bg-amber-400/85",
  },
  {
    title: "Qualidade de produto",
    description:
      "UI polida, código limpo e performance real — não só bonito na apresentação, funciona de verdade no ar.",
    icon: <Star className="size-5 text-violet-300" strokeWidth={1.75} />,
    status: "Padrão",
    barClass: "bg-violet-400/85",
  },
  {
    title: "Comunicação direta",
    description:
      "Você acompanha cada etapa: sem surpresas de escopo e sem respostas que nunca chegam.",
    icon: <MessageSquare className="size-5 text-sky-300" strokeWidth={1.75} />,
    status: "Transparência",
    barClass: "bg-sky-400/85",
  },
  {
    title: "Do zero ao deploy",
    description:
      "Não entregamos só telas ou só repositório: produto no ar com domínio, hospedagem e apoio nos primeiros dias.",
    icon: <PackageCheck className="size-5 text-emerald-300" strokeWidth={1.75} />,
    status: "Entrega",
    barClass: "bg-emerald-400/85",
  },
];

export function WhyUs() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerMotion = scrollRevealMotion(prefersReducedMotion);

  return (
    <section
      id="diferenciais"
      className="relative z-10 w-full scroll-mt-24 bg-page-surface py-20 md:py-24"
      aria-labelledby="whyus-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div {...headerMotion}>
        <SectionHeader
          id="whyus-heading"
          eyebrow="Por que a Utopia"
          title="Feito para quem não quer perder tempo."
          description="Cada projeto é tratado como se fosse o produto principal do nosso portfólio. Porque é."
          className="mb-10 md:mb-14"
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2">
            {features.map((item, index) => (
              <article
                key={item.title}
                className="bg-page-surface p-6 sm:p-8 md:p-9"
              >
                <motion.div
                  {...scrollRevealMotion(prefersReducedMotion, {
                    delayIndex: index,
                  })}
                  className="flex h-full flex-col"
                >
                  <div
                    className={`mb-5 h-1 w-11 shrink-0 rounded-full ${item.barClass}`}
                    aria-hidden
                  />
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] sm:size-12">
                      {item.icon}
                    </span>
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                      style={{
                        fontFamily: "var(--font-sans), system-ui, sans-serif",
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3
                    className="mb-3 text-lg font-semibold tracking-[-0.02em] text-white md:text-xl"
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-zinc-400 md:text-[15px]"
                    style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
