import { motion } from "motion/react";
import {
  MessageSquare,
  PackageCheck,
  Star,
  Zap,
} from "lucide-react";
import { BentoGrid, type BentoItem } from "./ui/bento-grid";
import { SectionHeader } from "./ui/section-header";

const bentoItems: BentoItem[] = [
  {
    title: "Entrega ágil",
    description:
      "Da proposta ao ar com processo enxuto, sem reuniões desnecessárias e sem fases de aprovação intermináveis.",
    icon: <Zap className="size-4 text-amber-400" strokeWidth={1.75} />,
    status: "Ritmo",
  },
  {
    title: "Qualidade de produto",
    description:
      "UI polida, código limpo e performance real — não só bonito na apresentação, funciona de verdade no ar.",
    icon: <Star className="size-4 text-violet-400" strokeWidth={1.75} />,
    status: "Padrão",
  },
  {
    title: "Comunicação direta",
    description:
      "Você acompanha cada etapa: sem surpresas de escopo e sem respostas que nunca chegam.",
    icon: <MessageSquare className="size-4 text-sky-400" strokeWidth={1.75} />,
    status: "Transparência",
  },
  {
    title: "Do zero ao deploy",
    description:
      "Não entregamos só telas ou só repositório: produto no ar com domínio, hospedagem e apoio nos primeiros dias.",
    icon: <PackageCheck className="size-4 text-emerald-400" strokeWidth={1.75} />,
    status: "Entrega",
  },
];

export function WhyUs() {
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

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
      >
        <SectionHeader
          id="whyus-heading"
          eyebrow="Por que a Utopia"
          title="Feito para quem não quer perder tempo."
          description="Cada projeto é tratado como se fosse o produto principal do nosso portfólio. Porque é."
          className="mb-10 md:mb-14"
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <BentoGrid items={bentoItems} />
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
