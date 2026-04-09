import React, { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";

const projects = [
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
    title: "Gestão de projetos",
    category: "SaaS · Web",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1080&q=85&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Loja e-commerce",
    category: "Landing · Conversão",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1080&q=85&fit=crop&auto=format",
  },
  {
    id: 6,
    title: "Site de produto SaaS",
    category: "Landing · Marketing",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1080&q=85&fit=crop&auto=format",
  },
  {
    id: 7,
    title: "Design system",
    category: "UI · Produto",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1080&q=85&fit=crop&auto=format",
  },
  {
    id: 8,
    title: "CRM interno",
    category: "SaaS · Enterprise",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1080&q=85&fit=crop&auto=format",
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
          description="Alguns tipos de entrega — do site de produto ao app que a equipe usa no dia a dia."
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
