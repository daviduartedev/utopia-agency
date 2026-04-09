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
    name: "Fernanda Costa",
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
  {
    text:
      "Entregaram um produto que reflete nossa marca e converteu melhor que a versão anterior.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Mariana Duarte",
    role: "CMO",
  },
  {
    text:
      "Comunicação objetiva e entregas semana a semana. A equipe comercial parou de depender de planilhas soltas.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "André Nascimento",
    role: "Diretor Comercial",
  },
  {
    text:
      "Site institucional e página de vendas no ar com performance excelente. Recomendo para quem precisa de resultado.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Beatriz Lima",
    role: "Growth Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative z-10 w-full scroll-mt-28 bg-page-surface py-20 text-zinc-100 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1300px] px-8 md:px-12">
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

        <div className="flex max-h-[min(72vh,680px)] justify-center gap-5 overflow-hidden sm:gap-6 md:max-h-[740px] md:gap-8">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
