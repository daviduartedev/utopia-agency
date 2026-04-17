import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { SectionHeader } from "./ui/section-header";

const faqs = [
  {
    q: "Qual é o prazo médio de entrega?",
    a: "Landing page em até 7 dias. Sistemas SaaS e aplicativos ficam sob consulta — o prazo é combinado na proposta, antes de você confirmar qualquer coisa.",
  },
  {
    q: "Preciso ter todo o conteúdo pronto para começar?",
    a: "Não. Trabalhamos com o que você tem e ajudamos a estruturar o resto. Textos, imagens e materiais podem ser desenvolvidos ao longo do projeto — inclusive com apoio de copy quando necessário.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Sinal mínimo de 30% (ou 1 parcela) para iniciar. O restante é parcelado em até 3×, alinhado às entregas na proposta.",
  },
  {
    q: "Posso solicitar alterações durante o projeto?",
    a: "Sim. Existem rodadas de revisão previstas em cada etapa — design e desenvolvimento. Alterações fora do escopo acordado são tratadas como adicional, sempre com cotação transparente.",
  },
  {
    q: "Vocês fazem manutenção pós-entrega?",
    a: "Todo projeto já inclui 1 mês de suporte gratuito após o lançamento. Para manutenção contínua, atualizações e novas funcionalidades, fechamos um plano mensal ao final do projeto.",
  },
  {
    q: "Vocês atendem fora do Brasil?",
    a: "Sim. Trabalhamos 100% remoto. Atendimento em português ou inglês; pagamento em BRL ou USD.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="relative z-10 w-full scroll-mt-24 bg-page-surface py-20 md:py-24"
      aria-labelledby="faq-heading"
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
          id="faq-heading"
          eyebrow="Dúvidas frequentes"
          title="Perguntas que todo cliente faz."
          description="Se a sua dúvida não estiver aqui, é só mandar uma mensagem — respondemos rápido."
          className="mb-14"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mx-auto max-w-3xl px-4 sm:px-8 md:px-12"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-white/10"
            >
              <AccordionTrigger
                className="py-5 text-left text-[15px] font-medium text-white hover:no-underline hover:text-zinc-200 [&>svg]:text-zinc-500"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                className="text-zinc-400"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
