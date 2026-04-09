import { motion } from "motion/react";
import { Zap, Star, MessageSquare, PackageCheck } from "lucide-react";
import { SectionHeader } from "./ui/section-header";

const items = [
  {
    icon: Zap,
    title: "Entrega ágil",
    body: "Da proposta ao ar em semanas, não meses. Processo enxuto, sem reuniões desnecessárias e sem fase de aprovação que nunca termina.",
  },
  {
    icon: Star,
    title: "Qualidade de produto",
    body: "UI polida, código limpo e performance real. Não apenas bonito na apresentação — funciona de verdade em produção.",
  },
  {
    icon: MessageSquare,
    title: "Comunicação direta",
    body: "Você acompanha cada etapa. Sem intermediários, sem surpresas no escopo, sem \"vou verificar com o time\" que nunca volta.",
  },
  {
    icon: PackageCheck,
    title: "Do zero ao deploy",
    body: "Não entregamos só design ou só código. O produto vai ao ar com domínio, hospedagem e suporte nos primeiros dias online.",
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
          className="mb-14"
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 gap-px border border-white/10 sm:grid-cols-2 rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex flex-col gap-4 border-white/10 bg-page-surface p-8 md:p-10 [&:nth-child(1)]:border-b [&:nth-child(2)]:border-b sm:[&:nth-child(1)]:border-r sm:[&:nth-child(3)]:border-r"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <item.icon className="size-5 text-zinc-300" strokeWidth={1.5} />
              </div>
              <div>
                <p
                  className="mb-2 text-base font-semibold text-white"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-sm leading-relaxed text-zinc-400"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {item.body}
                </p>
              </div>
            </motion.div>
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
