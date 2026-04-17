import { motion } from "motion/react";
import { ArrowDownRight, Hourglass, Ghost } from "lucide-react";
import { SectionHeader } from "./ui/section-header";
import { SpotlightCard } from "./ui/spotlight-card";

type PainPoint = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const painPoints: PainPoint[] = [
  {
    title: "Visita que não vira contato",
    body: "O tráfego chega, mas ninguém te chama. A página não diz o que você vende, não aponta um próximo passo claro e o visitante sai antes de decidir.",
    icon: <ArrowDownRight className="size-4 text-amber-400" strokeWidth={1.75} />,
  },
  {
    title: "Orçamento caro, prazo longo, proposta burocrática",
    body: "Você pede um site e recebe um PDF de 30 páginas, cronograma de três meses e uma fatura que só faz sentido para uma grande empresa. O projeto nunca sai do papel.",
    icon: <Hourglass className="size-4 text-violet-400" strokeWidth={1.75} />,
  },
  {
    title: "Agência que some depois da entrega",
    body: "O site vai ao ar, o suporte some. Um bug pequeno vira semana parada. Qualquer evolução exige um novo contrato.",
    icon: <Ghost className="size-4 text-sky-400" strokeWidth={1.75} />,
  },
];

export function Problem() {
  return (
    <section
      id="problema"
      className="relative z-10 w-full scroll-mt-24 bg-page-surface py-20 md:py-24"
      aria-labelledby="problema-heading"
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
          id="problema-heading"
          eyebrow="O problema"
          title="Seu site hoje não está fazendo a parte dele."
          description="Três situações que consomem oportunidade todo mês — e que a gente resolve por padrão."
          className="mb-10 md:mb-14"
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <ul
          className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-5"
          aria-label="Problemas que a Utopia resolve"
        >
          {painPoints.map((pain, i) => (
            <motion.li
              key={pain.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="list-none"
            >
              <SpotlightCard className="flex h-full flex-col gap-3 p-6 sm:p-7 md:p-8">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5"
                  >
                    {pain.icon}
                  </span>
                </div>
                <h3
                  className="text-base font-semibold text-white sm:text-[17px]"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {pain.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-zinc-400 sm:text-[15px]"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {pain.body}
                </p>
              </SpotlightCard>
            </motion.li>
          ))}
        </ul>
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
