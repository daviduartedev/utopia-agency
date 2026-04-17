"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader } from "./ui/section-header";
import { cn } from "./ui/utils";

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
    image: "/portfolio-appweb-barbearia.png",
    layout: "phone",
  },
  {
    id: 4,
    title: "Painel administrativo para clínica",
    scope: "Pacientes, prontuários e financeiro num fluxo único.",
    image: null,
    layout: "web",
  },
  {
    id: 5,
    title: "Site institucional com blog",
    scope: "Home, sobre, serviços e blog editável via CMS.",
    image: null,
    layout: "web",
  },
];

function Slide({ project, index, total }: { project: PortfolioProject; index: number; total: number }) {
  const isPhone = project.layout === "phone";

  return (
    <article
      role="group"
      aria-roledescription="slide"
      aria-label={`Case ${index + 1} de ${total}: ${project.title}`}
      className={cn(
        "portfolio-slide flex shrink-0 flex-col",
        isPhone ? "portfolio-slide-phone" : "portfolio-slide-web",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[15px] border border-white/10 bg-zinc-950",
          isPhone ? "portfolio-frame-phone" : "portfolio-frame-web",
        )}
      >
        {project.image ? (
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            sizes={isPhone ? "250px" : "880px"}
            className="block h-full max-h-full min-h-0 w-full object-contain object-center"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,#1f1f22_0%,#0f0f11_70%,#09090b_100%)] px-6 text-center">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                Case em breve
              </p>
              <p
                className="text-xl font-medium tracking-tight text-zinc-200 sm:text-2xl"
                style={{ fontFamily: "var(--font-display), Georgia, serif" }}
              >
                {project.title}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 pl-0.5">
        <span
          className="mt-1.5 inline-block size-2 shrink-0 rounded-[2px] bg-zinc-500/90"
          aria-hidden
        />
        <div>
          <p
            className="text-[13px] font-medium text-zinc-300 sm:text-sm"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            {project.title}
          </p>
          <p
            className="mt-0.5 text-[11px] leading-relaxed text-zinc-500 sm:text-[12px]"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            {project.scope}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative z-10 flex w-full flex-col items-center bg-page-surface pb-28 pt-8"
    >
      <style>{`
        .portfolio-embla-viewport { overflow: hidden; width: 100%; }
        .portfolio-embla-container {
          display: flex;
          gap: 2rem;
          padding-inline: max(1rem, calc((100vw - 1300px) / 2));
          touch-action: pan-y pinch-zoom;
          --web-w: min(880px, calc(100vw - 2rem));
          --slide-h: calc(var(--web-w) * 550 / 880);
        }
        @media (min-width: 768px) {
          .portfolio-embla-container { gap: 2.5rem; }
        }
        @media (min-width: 1024px) {
          .portfolio-embla-container { gap: 3rem; }
        }
        .portfolio-slide { flex: 0 0 auto; }
        .portfolio-slide-web { width: var(--web-w); }
        .portfolio-slide-phone {
          width: min(calc(var(--slide-h) * 250 / 550), 250px);
        }
        .portfolio-frame-web,
        .portfolio-frame-phone {
          overflow: hidden;
          line-height: 0;
          height: var(--slide-h);
          max-height: var(--slide-h);
        }
        .portfolio-frame-web { width: 100%; }
        .portfolio-frame-phone { width: 100%; }
        .portfolio-carousel-edge {
          pointer-events: none;
          background: linear-gradient(
            to right,
            #0a0a0a 0%,
            rgba(10, 10, 10, 0.78) 38%,
            rgba(10, 10, 10, 0.15) 82%,
            transparent 100%
          );
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
        }
        .portfolio-carousel-edge-right {
          pointer-events: none;
          background: linear-gradient(
            to left,
            #0a0a0a 0%,
            rgba(10, 10, 10, 0.78) 38%,
            rgba(10, 10, 10, 0.15) 82%,
            transparent 100%
          );
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="w-full"
      >
        <SectionHeader
          id="portfolio-heading"
          className="pb-10 pt-16 md:pb-12 md:pt-20"
          eyebrow="Portfólio"
          title="Trabalhos selecionados"
          description="Alguns tipos de entrega — do site de produto ao app que a equipe usa no dia a dia."
        />
      </motion.div>

      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Trabalhos selecionados da Utopia"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative w-full max-w-full outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-page-surface"
        style={{ contain: "layout paint" }}
      >
        <div className="portfolio-embla-viewport" ref={emblaRef}>
          <div className="portfolio-embla-container">
            {projects.map((project, index) => (
              <Slide
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
              />
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="portfolio-carousel-edge absolute inset-y-0 left-0 z-20 w-12 sm:w-20 md:w-28"
        />
        <div
          aria-hidden
          className="portfolio-carousel-edge-right absolute inset-y-0 right-0 z-20 w-12 sm:w-20 md:w-28"
        />

        <div className="mt-8 flex items-center justify-center gap-3 md:mt-10">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Ver case anterior"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface"
          >
            <ArrowLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Ver próximo case"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface"
          >
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
