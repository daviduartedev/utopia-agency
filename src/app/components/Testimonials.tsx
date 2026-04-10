import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";

const testimonials = [
  {
    text:
      "A landing page entregou conversão acima do que esperávamos. Processo rápido e comunicação clara em todas as etapas.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Ricardo Almeida",
    role: "Head de Marketing",
  },
  {
    text:
      "O painel SaaS ficou sob medida para o nosso fluxo. Treinamento rápido e a equipe adotou sem atrito.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Fernando Costa",
    role: "COO",
  },
  {
    text:
      "Equipe técnica atenciosa, da descoberta ao deploy. Sentimos que entendiam de verdade o nosso negócio.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Juliana Martins",
    role: "Fundadora",
  },
  {
    text:
      "O app mobile saiu com UX polida e prazos cumpridos. O retorno dos usuários foi muito positivo.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Pedro Henrique",
    role: "Product Lead",
  },
  {
    text:
      "Integrações com sistemas legados foram bem resolvidas. Hoje operamos com muito mais previsibilidade.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Camila Rocha",
    role: "Diretora de Operações",
  },
  {
    text:
      "Implementação sem drama: documentação, repasse técnico e suporte pós-entrega impecáveis.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Lucas Ferreira",
    role: "CTO",
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative z-10 w-full scroll-mt-28 bg-page-surface py-20 text-zinc-100 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            id="depoimentos-heading"
            className="mb-12 md:mb-14"
            eyebrow="Depoimentos"
            title="O que dizem nossos clientes"
            description="Feedback de quem confiou na Utopia para landing pages, produtos SaaS e apps."
          />
        </motion.div>

        <div className="flex max-h-[min(64vh,620px)] justify-center gap-4 overflow-hidden sm:gap-5 md:max-h-[min(68vh,680px)] md:gap-7">
          <TestimonialsColumn testimonials={firstColumn} duration={16} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={20}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={18}
          />
        </div>
      </div>
    </section>
  );
}
