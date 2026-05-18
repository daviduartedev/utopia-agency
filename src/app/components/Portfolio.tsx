"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader } from "./ui/section-header";
import { cn } from "./ui/utils";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

type PortfolioLayout = "web" | "phone";

type PortfolioProject = {
  id: number;
  slug: string;
  title: string;
  scope: string;
  image: string | null;
  layout: PortfolioLayout;
};

const projects: PortfolioProject[] = [
  {
    id: 1,
    slug: "erp",
    title: "ERP para lojistas",
    scope: "Catálogo, estoque e pedidos num painel único.",
    image: "/portfolio-movix-erp.png",
    layout: "web",
  },
  {
    id: 2,
    slug: "emera",
    title: "LP para loja de painéis solares",
    scope: "Site de produto com simulador e captação de contato.",
    image: "/portfolio-emera-solar.png",
    layout: "web",
  },
  {
    id: 3,
    slug: "barbearia",
    title: "App de agendamento para barbearia",
    scope: "Agenda, clientes e lembretes em uma interface enxuta.",
    image: "/mobile.png",
    layout: "phone",
  },
  {
    id: 4,
    slug: "atelier-arq",
    title: "Portfólio de arquitetura residencial (ATELIER)",
    scope:
      "Hero com headline “Onde arquitetura encontra emoção”, narrativa de residências atemporais, CTA para explorar projetos e visual noturno com tipografia serifada e alto contraste.",
    image: "/portfolio-atelier-arquitetura.png",
    layout: "web",
  },
  {
    id: 5,
    slug: "atelier-eco",
    title: "Landing de eco design e permacultura (ATELIER)",
    scope:
      "Proposta “viva em equilíbrio com a natureza”: copy sobre projetos sustentáveis e design consciente, CTA para soluções sustentáveis e identidade minimalista sobre fotografia da casa de madeira.",
    image: "/portfolio-atelier-eco-design.png",
    layout: "web",
  },
  {
    id: 6,
    slug: "cs2",
    title: "Site para jogos eletrônicos (CS2)",
    scope:
      "Loja premium de skins CS2 com vitrine, rifas e fluxos claros para conversão.",
    image: "/portfolio-dr-black-skins.png",
    layout: "web",
  },
];

/**
 * Portfolio em lista vertical estilo Jax Orion — cada projeto é um card grande
 * com mockup à esquerda + título/scope/CTA à direita, alternando layout.
 */
export function Portfolio() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative w-full bg-section-over-gradient py-24 md:py-32"
    >
      <SectionHeader
        eyebrow="Trabalhos"
        title="Páginas e painéis que já estão no ar"
        description="Seleção de trabalhos reais, de landing que pede contato a painel que a equipe usa todo dia."
        id="portfolio-heading"
      />

      <div className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-8 md:mt-20 md:gap-8 md:px-12">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            {...scrollRevealMotion(prefersReducedMotion, { delayIndex: i })}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/80 md:flex-row md:items-stretch",
              i % 2 === 1 && "md:flex-row-reverse",
            )}
          >
            {/* Mockup */}
            <div
              className={cn(
                "relative aspect-[16/10] w-full overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,#1f1f22_0%,#0f0f11_70%,#09090b_100%)] md:aspect-auto md:w-3/5",
              )}
            >
              {project.image ? (
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 767px) 92vw, 720px"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center px-4 text-center">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                    Case em breve
                  </p>
                </div>
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent"
              />
            </div>

            {/* Descrição */}
            <div className="flex flex-1 flex-col justify-between gap-6 p-7 md:p-10">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Case {String(project.id).padStart(2, "0")}
                </p>
                <h3
                  className="mb-4 text-[1.45rem] font-semibold leading-snug tracking-tight text-white md:text-[1.7rem]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-zinc-400">
                  {project.scope}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                  {project.layout === "phone" ? "Mobile" : "Web"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-200 transition-colors group-hover:text-white">
                  Ver detalhes
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
