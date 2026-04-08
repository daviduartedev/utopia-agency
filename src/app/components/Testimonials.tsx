import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "motion/react";

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
      "O painel SaaS ficou sob medida para o nosso fluxo. Treinamento rápido e o time adotou sem atrito.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Fernanda Costa",
    role: "COO",
  },
  {
    text:
      "Equipe técnica atenciosa, do discovery ao deploy. Sentimos que entendiam de verdade o nosso negócio.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces&q=80",
    name: "Juliana Martins",
    role: "Fundadora",
  },
  {
    text:
      "O app mobile saiu com UX polida e prazos cumpridos. O feedback dos usuários foi muito positivo.",
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
      "Implementação sem drama: documentação, handoff e suporte pós-entrega impecáveis.",
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
      "Comunicação objetiva e entregas semana a semana. O time comercial parou de depender de planilhas soltas.",
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
      className="relative z-10 w-full bg-black py-20 md:py-28 scroll-mt-28 text-zinc-100"
    >
      <div className="w-full max-w-[1300px] mx-auto px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-10 md:mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-white/15 py-1.5 px-4 rounded-lg text-sm text-zinc-400">
              Depoimentos
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-4 md:mt-5 text-white">
            O que dizem nossos clientes
          </h2>
          <p className="text-center mt-4 md:mt-5 text-zinc-400 max-w-md text-base leading-relaxed">
            Feedback de quem confiou em landings, produtos SaaS e apps com a Utopia.
          </p>
        </motion.div>

        <div className="flex justify-center gap-5 sm:gap-6 md:gap-8 [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)] max-h-[min(72vh,680px)] md:max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
