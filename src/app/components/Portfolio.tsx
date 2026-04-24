"use client";

import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader } from "./ui/section-header";
import { Card, CardSwap } from "./CardSwap";
import { cn } from "./ui/utils";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";
import { useIsNarrowMobile } from "../lib/use-media-query";
import { motion } from "motion/react";

type PortfolioLayout = "web" | "phone";

type PortfolioProject = {
  id: number;
  title: string;
  scope: string;
  image: string | null;
  layout: PortfolioLayout;
};

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "ERP para lojistas",
    scope: "Catálogo, estoque e pedidos num painel único.",
    image: "/portfolio-movix-erp.png",
    layout: "web",
  },
  {
    id: 2,
    title: "LP para loja de painéis solares",
    scope: "Site de produto com simulador e captação de contato.",
    image: "/portfolio-emera-solar.png",
    layout: "web",
  },
  {
    id: 3,
    title: "App de agendamento para barbearia",
    scope: "Agenda, clientes e lembretes em uma interface enxuta.",
    image: "/mobile.png",
    layout: "phone",
  },
  {
    id: 4,
    title: "Portfólio de arquitetura residencial (ATELIER)",
    scope:
      "Hero com headline “Onde arquitetura encontra emoção”, narrativa de residências atemporais, CTA para explorar projetos e visual noturno com tipografia serifada e alto contraste.",
    image: "/portfolio-atelier-arquitetura.png",
    layout: "web",
  },
  {
    id: 5,
    title: "Landing de eco design e permacultura (ATELIER)",
    scope:
      "Proposta “viva em equilíbrio com a natureza”: copy sobre projetos sustentáveis e design consciente, CTA para soluções sustentáveis e identidade minimalista sobre fotografia da casa de madeira.",
    image: "/portfolio-atelier-eco-design.png",
    layout: "web",
  },
  {
    id: 6,
    title: "Site para jogos eletrônicos (CS2)",
    scope: "Loja premium de skins CS2 com vitrine, rifas e fluxos claros para conversão.",
    image: "/portfolio-dr-black-skins.png",
    layout: "web",
  },
];

function CasePreview({ project }: { project: PortfolioProject }) {
  return (
    <div
      className={cn(
        "relative h-full min-h-0 w-full min-w-0 overflow-hidden border border-white/10 bg-zinc-950",
        "rounded-2xl",
      )}
    >
      {project.image ? (
        <div className="absolute inset-0 min-h-0 min-w-0">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 767px) 92vw, 640px"
            className="h-full w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,#1f1f22_0%,#0f0f11_70%,#09090b_100%)] px-4 text-center">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Case em breve
            </p>
            <p
              className="text-xl font-medium tracking-tight text-zinc-200 sm:text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function Portfolio() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const narrow = useIsNarrowMobile();
  const [frontIndex, setFrontIndex] = useState(0);
  const w = narrow ? 340 : 640;
  const h = Math.max(212, Math.round((w * 550) / 880));

  const current = projects[frontIndex] ?? projects[0];

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative z-10 flex w-full flex-col items-center bg-section-over-gradient pb-16 pt-6"
    >
      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 0, lateral: true })}
        className="w-full"
      >
        <SectionHeader
          id="portfolio-heading"
          className="pb-10 pt-10 md:pb-14 md:pt-14"
          eyebrow="Portfólio"
          title="Páginas e painéis que já estão no ar"
          description="Seleção de trabalhos reais, de landing que pede contato a painel que a equipe usa todo dia."
        />
      </motion.div>

      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 1, lateral: true })}
        className="relative mt-20 flex w-full max-w-full flex-col items-center px-4 md:mt-28 lg:mt-36"
      >
        <div className="relative flex w-full max-w-[min(100%,1300px)] flex-col items-center">
          <div className="flex min-h-[min(560px,72vw)] w-full flex-col items-center justify-start sm:min-h-[600px]">
            <CardSwap
              width={w}
              height={h}
              cardDistance={60}
              verticalDistance={70}
              delay={3500}
              pauseOnHover={false}
              skewAmount={6}
              easing="linear"
              onFrontIndexChange={setFrontIndex}
              className="outline-none"
            >
              {projects.map((p) => (
                <Card key={p.id}>
                  <div className="h-full w-full p-0.5">
                    <CasePreview project={p} />
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>

          <div
            key={frontIndex}
            className="mx-auto mt-8 max-w-xl px-2 text-center sm:mt-10 sm:px-0"
            role="status"
            aria-live="polite"
            aria-atomic
          >
            <p
              id={`portfolio-active-case-title-${current.id}`}
              className="text-sm font-medium text-zinc-300 sm:text-base"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              {current.title}
            </p>
            <p
              className="mt-1.5 text-xs leading-relaxed text-zinc-500 sm:text-sm"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              {current.scope}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
