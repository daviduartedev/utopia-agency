import { motion } from "motion/react";
import {
  MessageSquare,
  PackageCheck,
  Star,
  Zap,
} from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { cn } from "./ui/utils";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

type Rail = {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: string;
};

const rails: Rail[] = [
  {
    title: "Entrega ágil",
    description:
      "Da proposta ao ar com processo enxuto, sem reuniões desnecessárias e sem fases de aprovação intermináveis.",
    icon: <Zap className="size-5 text-amber-400" strokeWidth={1.75} />,
    status: "Ritmo",
  },
  {
    title: "Qualidade de produto",
    description:
      "UI polida, código limpo e performance real — não só bonito na apresentação, funciona de verdade no ar.",
    icon: <Star className="size-5 text-violet-400" strokeWidth={1.75} />,
    status: "Padrão",
  },
  {
    title: "Comunicação direta",
    description:
      "Você acompanha cada etapa: sem surpresas de escopo e sem respostas que nunca chegam.",
    icon: <MessageSquare className="size-5 text-sky-400" strokeWidth={1.75} />,
    status: "Transparência",
  },
  {
    title: "Do zero ao deploy",
    description:
      "Não entregamos só telas ou só repositório: produto no ar com domínio, hospedagem e apoio nos primeiros dias.",
    icon: <PackageCheck className="size-5 text-emerald-400" strokeWidth={1.75} />,
    status: "Entrega",
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
        <div className="flex flex-col border-y border-white/10">
          {rails.map((item, index) => (
            <motion.article
              key={item.title}
              {...scrollRevealMotion(prefersReducedMotion, {
                delayIndex: index,
              })}
              className={cn(
                "grid gap-8 border-b border-white/10 py-10 last:border-b-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] md:items-center md:gap-12 md:py-12",
                index % 2 === 1 &&
                  "rounded-2xl border border-white/5 bg-white/[0.03] md:px-8 md:py-12",
              )}
            >
              <div
                className={cn(
                  "flex items-start gap-4 md:flex-col md:items-start md:gap-3",
                  index % 2 === 1 && "md:order-2 md:items-end md:text-right",
                )}
              >
                <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] md:size-14">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500"
                    style={{
                      fontFamily: "var(--font-sans), system-ui, sans-serif",
                    }}
                  >
                    {item.status}
                  </span>
                  <h3
                    className="text-lg font-semibold tracking-[-0.02em] text-white md:text-xl"
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
              <p
                className={cn(
                  "text-sm leading-relaxed text-zinc-400 md:text-[15px]",
                  index % 2 === 1 && "md:order-1",
                )}
                style={{
                  fontFamily: "var(--font-sans), system-ui, sans-serif",
                }}
              >
                {item.description}
              </p>
            </motion.article>
          ))}
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
