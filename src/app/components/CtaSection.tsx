"use client";

import { motion } from "motion/react";
import { whatsappHref } from "../lib/whatsapp";
import { WA_MSG_CTA_SECTION } from "../lib/whatsapp-messages";
import { Cta4 } from "./ui/cta-4";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

const ctaItems = [
  "Página feita pra gerar mensagem ou formulário",
  "Endereço e hospedagem no mesmo pacote",
  "1 mês de suporte depois do ar",
  "Sinal de 30% pra começar",
];

export function CtaSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative z-10 w-full bg-section-over-gradient">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 0, lateral: true })}
        className="relative w-full"
      >
        <Cta4
          title="Chega de mês sem saber de onde vem cliente"
          description="Landing a partir de R$ 999, publicada em até 7 dias. Você manda um oi no WhatsApp, a gente devolve proposta legível, sem PDF de novela."
          buttonText="Quero meu site profissional"
          buttonUrl={whatsappHref(WA_MSG_CTA_SECTION)}
          showArrowIcon
          items={ctaItems}
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>
    </div>
  );
}
