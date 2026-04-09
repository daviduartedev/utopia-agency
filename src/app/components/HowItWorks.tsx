import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";

const steps = [
  {
    number: "01",
    title: "Briefing",
    body: "Entendemos seu negócio, público e objetivos. Uma chamada rápida ou formulário detalhado — sem burocracia.",
  },
  {
    number: "02",
    title: "Proposta",
    body: "Escopo detalhado, prazo e valor fixo. Você sabe exatamente o que vai receber e quando, antes de confirmar qualquer coisa.",
  },
  {
    number: "03",
    title: "Design",
    body: "Layout aprovado por você antes do código começar. Iterações rápidas em Figma com foco em conversão e identidade.",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    body: "Código limpo, stack moderno e links de pré-visualização para acompanhar ao vivo. Você vê o progresso a cada entrega.",
  },
  {
    number: "05",
    title: "Entrega e suporte",
    body: "Produto no ar com domínio, CI/CD e documentação incluídos. Suporte nos primeiros dias para garantir um lançamento sem sustos.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative z-10 w-full scroll-mt-24 bg-page-surface py-20 md:py-24"
      aria-labelledby="howitworks-heading"
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
          id="howitworks-heading"
          eyebrow="Como funciona"
          title="Do briefing ao lançamento."
          description="Um processo claro em cinco etapas — para você saber o que esperar em cada fase."
          className="mb-16"
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <ol className="grid grid-cols-1 gap-px border border-white/10 rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative flex flex-col justify-between gap-10 border-white/10 bg-page-surface p-7 md:p-8
                [&:nth-child(1)]:border-b [&:nth-child(2)]:border-b [&:nth-child(3)]:border-b [&:nth-child(4)]:border-b
                sm:[&:nth-child(1)]:border-r sm:[&:nth-child(3)]:border-r
                lg:[&:nth-child(1)]:border-r lg:[&:nth-child(2)]:border-r lg:[&:nth-child(3)]:border-r lg:[&:nth-child(4)]:border-r
                lg:[&:nth-child(1)]:border-b-0 lg:[&:nth-child(2)]:border-b-0 lg:[&:nth-child(3)]:border-b-0 lg:[&:nth-child(4)]:border-b-0"
            >
              {/* large faded number */}
              <span
                aria-hidden
                className="absolute right-5 top-4 select-none text-[4rem] font-bold leading-none tabular-nums text-white/[0.04]"
              >
                {step.number}
              </span>

              <div>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                  {step.number}
                </p>
                <p
                  className="mb-2 text-base font-semibold text-white"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {step.title}
                </p>
                <p
                  className="text-sm leading-relaxed text-zinc-400"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
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
