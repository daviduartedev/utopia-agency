import { motion } from "motion/react";
import { whatsappHref } from "../lib/whatsapp";
import { WA_MSG_CTA_SECTION } from "../lib/whatsapp-messages";
import { Cta4 } from "./ui/cta-4";

const ctaItems = [
  "Design e código entregues",
  "Domínio e hospedagem inclusos",
  "1 mês de suporte gratuito",
  "Sinal mínimo de 30% para iniciar",
];

export function CtaSection() {
  return (
    <div className="relative z-10 w-full">
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
        className="relative w-full"
      >
        <Cta4
          title="Seu site no ar em até 7 dias."
          description="Landing page a partir de R$ 999. A gente começa pela conversa, sem proposta de 30 páginas."
          buttonText="Falar com a Utopia agora"
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
