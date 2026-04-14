"use client";

import React, { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";
import { useSectionAnimationActive } from "../hooks/use-section-animation-active";
import { cn } from "./ui/utils";

function portfolioImageUrl(src: string): string {
  try {
    const u = new URL(src);
    u.searchParams.set("w", "640");
    u.searchParams.set("q", "70");
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    return u.toString();
  } catch {
    return src;
  }
}

type PortfolioLayout = "web" | "phone";

type PortfolioProject = {
  id: number;
  title: string;
  image: string;
  layout: PortfolioLayout;
};

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "ERP para Lojistas",
    image: "/portfolio-movix-erp.png",
    layout: "web",
  },
  {
    id: 2,
    title: "LP - Loja de Painel Solar",
    image: "/portfolio-emera-solar.png",
    layout: "web",
  },
  {
    id: 3,
    title: "AppWeb para Barbearia",
    image: "/portfolio-appweb-barbearia.png",
    layout: "phone",
  },
];

const allItems = [...projects, ...projects];

/** Altura comum derivada dos slides web (880×550); AppWeb usa largura 250 na mesma altura. */
export function Portfolio() {
  const [hoverPaused, setHoverPaused] = useState(false);
  const { ref, active } = useSectionAnimationActive();
  const marqueePaused = hoverPaused || !active;

  return (
    <section
      ref={ref}
      id="portfolio"
      className={cn(
        "relative z-10 flex w-full flex-col items-center bg-page-surface pb-32 pt-8",
        !active && "section-anim-paused",
      )}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        .marquee-track {
          animation: marquee 56s linear infinite;
        }
        .marquee-track.is-paused {
          animation-play-state: paused;
        }
        @media (max-width: 767px) {
          .marquee-track {
            animation-duration: 72s;
          }
        }
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
        .portfolio-marquee-inner {
          --web-w: min(880px, calc(100vw - 2rem));
          --slide-h: calc(var(--web-w) * 550 / 880);
        }
        .portfolio-frame-web,
        .portfolio-frame-phone {
          flex-shrink: 0;
          overflow: hidden;
          line-height: 0;
        }
        .portfolio-frame-web {
          width: var(--web-w);
          height: var(--slide-h);
          max-height: var(--slide-h);
        }
        .portfolio-frame-phone {
          box-sizing: border-box;
          height: var(--slide-h);
          max-height: var(--slide-h);
          width: min(calc(var(--slide-h) * 250 / 550), 250px);
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
          className="pb-12 pt-16 md:pb-14 md:pt-20"
          eyebrow="Portfólio"
          title="Trabalhos selecionados"
          description="Alguns tipos de entrega — do site de produto ao app que a equipe usa no dia a dia."
        />
      </motion.div>

      <div className="relative w-full max-w-full" style={{ contain: "layout paint" }}>
        <div className="portfolio-marquee-inner relative overflow-hidden">
          <div
            className={`marquee-track flex items-start gap-8 md:gap-10 lg:gap-12${marqueePaused ? " is-paused" : ""}`}
            style={{ width: "max-content" }}
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
          >
            {allItems.map((item, index) => {
              const isPhone = item.layout === "phone";
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="flex min-h-0 shrink-0 flex-col items-stretch pb-1"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[15px]",
                      isPhone ? "portfolio-frame-phone" : "portfolio-frame-web",
                    )}
                  >
                    <ImageWithFallback
                      src={portfolioImageUrl(item.image)}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      sizes={isPhone ? "250px" : "880px"}
                      className="block h-full max-h-full min-h-0 w-full rounded-[15px] border-[0.5px] border-transparent object-contain object-center"
                    />
                  </div>

                  <div className="mt-3 flex items-center gap-2 pl-0.5">
                    <span
                      className="inline-block size-2 shrink-0 rounded-[2px] bg-zinc-500/90"
                      aria-hidden
                    />
                    <p
                      className="text-[10px] font-normal leading-none tracking-[0.04em] text-zinc-500 sm:text-[11px]"
                      style={{
                        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
                      }}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          aria-hidden
          className="portfolio-carousel-edge absolute inset-y-0 left-0 z-20 w-16 sm:w-24 md:w-36"
        />
        <div
          aria-hidden
          className="portfolio-carousel-edge-right absolute inset-y-0 right-0 z-20 w-16 sm:w-24 md:w-36"
        />
      </div>
    </section>
  );
}
