import React, { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";

const projects = [
  {
    id: 1,
    title: "Dashboard financeiro",
    category: "SaaS · Web",
    image:
      "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBkYXJrfGVufDF8fHx8MTc3NTI5NTA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Plataforma de analytics",
    category: "SaaS · Dashboard",
    image:
      "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBVSXxlbnwxfHx8fDE3NzUzNTU3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "App bancário",
    category: "App · Mobile",
    image:
      "https://images.unsplash.com/photo-1645226880663-81561dcab0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1MzU1NzkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Gestão de projetos",
    category: "SaaS · Web",
    image:
      "https://images.unsplash.com/photo-1770368787779-8472da646193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzUzNTU3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Loja e-commerce",
    category: "Landing · Conversão",
    image:
      "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3NTMwNzUxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    title: "Site de produto SaaS",
    category: "Landing · Marketing",
    image:
      "https://images.unsplash.com/photo-1648134859175-78b41b4db186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwbGFuZGluZyUyMHBhZ2UlMjBkZXNpZ258ZW58MXx8fHwxNzc1MzU1NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    title: "Design system",
    category: "UI · Produto",
    image:
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 8,
    title: "CRM interno",
    category: "SaaS · Enterprise",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const allItems = [...projects, ...projects];

export function Portfolio() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="portfolio"
      className="relative z-10 flex w-full flex-col items-center bg-page-surface pb-32 pt-8"
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 38s linear infinite;
        }
        .marquee-track.is-paused {
          animation-play-state: paused;
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
          description="Alguns tipos de entrega — do site de produto ao app que o time usa no dia a dia."
        />
      </motion.div>

      <div className="w-full overflow-hidden" style={{ width: "100vw" }}>
        <div
          className={`marquee-track flex gap-8${paused ? " is-paused" : ""}`}
          style={{ width: "max-content" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {allItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group w-[400px] flex-shrink-0 md:w-[480px]"
            >
              <div className="h-full rounded-2xl border border-white/10 bg-page-surface p-3">
                <div className="mb-3 flex flex-col px-2">
                  <h3
                    className="text-xl font-medium tracking-[-0.02em] text-white"
                    style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm font-normal text-zinc-500"
                    style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                  >
                    {item.category}
                  </p>
                </div>

                <div className="relative h-[280px] w-full overflow-hidden rounded-xl border border-white/5 bg-page-surface md:h-[340px]">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-page-surface/50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
