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

type PortfolioLayout = "default" | "phone";

type PortfolioProject = {
  id: number;
  title: string;
  category: string;
  image: string;
  layout?: PortfolioLayout;
};

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "Dashboard financeiro",
    category: "SaaS · Web",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=85&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Plataforma de analytics",
    category: "SaaS · Dashboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1080&q=85&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "App bancário",
    category: "App · Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1080&q=85&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "ERP para Lojistas",
    category: "ERP · Web",
    image: "/portfolio-erp-lojistas.png",
  },
  {
    id: 5,
    title: "LP - Loja de Painel Solar",
    category: "Landing · Conversão",
    image: "/portfolio-lp-painel-solar.png",
  },
  {
    id: 6,
    title: "APPWEB - Barbearia",
    category: "App · Web mobile",
    image: "/portfolio-appweb-barbearia.png",
    layout: "phone",
  },
];

const allItems = [...projects, ...projects];

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
          animation: marquee 48s linear infinite;
        }
        .marquee-track.is-paused {
          animation-play-state: paused;
        }
        @media (max-width: 767px) {
          .marquee-track {
            animation-duration: 64s;
          }
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

      <div
        className="w-full max-w-full overflow-hidden"
        style={{ contain: "layout paint" }}
      >
        <div
          className={`marquee-track flex gap-3 sm:gap-6 md:gap-8${marqueePaused ? " is-paused" : ""}`}
          style={{ width: "max-content" }}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
        >
          {allItems.map((item, index) => {
            const isPhone = item.layout === "phone";
            return (
            <div
              key={`${item.id}-${index}`}
              className={cn(
                "group shrink-0",
                isPhone
                  ? "w-[min(46vw,12.5rem)] sm:w-[min(42vw,14rem)] md:w-[248px]"
                  : "w-[min(82vw,20rem)] sm:w-[min(88vw,22rem)] md:w-[400px]",
              )}
            >
              <div className="h-full rounded-2xl border border-white/10 bg-page-surface p-2.5 sm:p-3">
                <div className="mb-2 flex flex-col px-1.5 sm:mb-3 sm:px-2">
                  <h3
                    className="text-lg font-medium tracking-[-0.02em] text-white sm:text-xl"
                    style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs font-normal text-zinc-500 sm:text-sm"
                    style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                  >
                    {item.category}
                  </p>
                </div>

                {isPhone ? (
                  <div className="flex justify-center">
                    <div
                      className="relative w-[min(100%,220px)] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/15 bg-zinc-950 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/5"
                      style={{ aspectRatio: "9 / 19" }}
                    >
                      <ImageWithFallback
                        src={portfolioImageUrl(item.image)}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        sizes="220px"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative h-[180px] w-full overflow-hidden rounded-xl border border-white/5 bg-page-surface sm:h-[240px] md:h-[280px]">
                    <ImageWithFallback
                      src={portfolioImageUrl(item.image)}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 82vw, 400px"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
