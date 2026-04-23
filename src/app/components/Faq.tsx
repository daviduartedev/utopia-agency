"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { SectionHeader } from "./ui/section-header";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

const faqs = [
  {
    q: "Quanto tempo demora?",
    a: "Landing no ar em até 7 dias depois do combinado. Painel maior ou app: prazo e valor só na proposta, antes de você pagar qualquer sinal.",
  },
  {
    q: "Preciso ter tudo escrito antes de começar?",
    a: "Não. A gente parte do que você tem e monta o resto junto. Texto e imagem podem ir amadurecendo, o importante é começar com meta clara.",
  },
  {
    q: "Como é o pagamento?",
    a: "Sinal de 30% (ou uma parcela) pra iniciar. O resto em até 3×, amarrado às entregas que estão na proposta.",
  },
  {
    q: "Posso mudar coisa no meio?",
    a: "Sim, dentro das rodadas combinadas. Fora disso a gente cota à parte, sempre com número na mesa.",
  },
  {
    q: "Depois que publica, vocês somem?",
    a: "Não. Vai 1 mês de suporte no pacote. Depois, se quiser manutenção contínua, a gente fecha valor mensal separado.",
  },
  {
    q: "Atendem fora do Brasil?",
    a: "Sim, 100% remoto. Português ou inglês. Pagamento em real ou dólar, como combinar.",
  },
];

export function Faq() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="faq"
      className="relative z-10 w-full scroll-mt-24 bg-section-over-gradient py-12 md:py-16"
      aria-labelledby="faq-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 0, lateral: true })}>
        <SectionHeader
          id="faq-heading"
          eyebrow="Dúvidas frequentes"
          title="O que segura a decisão"
          description="Não achou? Chama no WhatsApp. A gente responde."
          className="mb-8 md:mb-10"
        />
      </motion.div>

      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 1, lateral: true })}
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
