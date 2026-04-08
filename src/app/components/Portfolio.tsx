import React, { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

const projects = [
  {
    id: 1,
    title: "Financial Dashboard",
    category: "Web Application",
    image:
      "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBkYXJrfGVufDF8fHx8MTc3NTI5NTA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Analytics Platform",
    category: "SaaS Dashboard",
    image:
      "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBVSXxlbnwxfHx8fDE3NzUzNTU3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Banking App",
    category: "Mobile Interface",
    image:
      "https://images.unsplash.com/photo-1645226880663-81561dcab0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1MzU1NzkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Project Manager",
    category: "Web Application",
    image:
      "https://images.unsplash.com/photo-1770368787779-8472da646193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzUzNTU3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "E-Commerce Store",
    category: "Landing Page",
    image:
      "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3NTMwNzUxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    title: "SaaS Platform",
    category: "Marketing Site",
    image:
      "https://images.unsplash.com/photo-1648134859175-78b41b4db186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwbGFuZGluZyUyMHBhZ2UlMjBkZXNpZ258ZW58MXx8fHwxNzc1MzU1NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    title: "Design System",
    category: "UI/UX",
    image:
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 8,
    title: "CRM Dashboard",
    category: "Enterprise App",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

// Duplicate for seamless infinite loop (2 copies → animate -50%)
const allItems = [...projects, ...projects];

export function Portfolio() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="portfolio"
      className="relative z-10 w-full bg-transparent flex flex-col items-center pt-12 pb-32"
    >
      {/* Keyframe styles injected directly */}
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

      {/* Section header */}
      <div className="w-full max-w-[1300px] mx-auto px-8 md:px-12 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Nosso Portfólio
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Experiências Visuais
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Conheça nossos últimos protótipos de landing pages e sistemas modernos
          desenvolvidos com foco em conversão e design premium.
        </motion.p>
      </div>

      {/*
        Carousel container:
        - overflow-hidden clips cards outside the viewport
        - width 100vw ensures it's truly edge-to-edge
        - No padding, no max-width, no margins
      */}
      <div
        className="overflow-hidden w-full"
        style={{ width: "100vw" }}
      >
        <div
          className={`marquee-track flex gap-8${paused ? " is-paused" : ""}`}
          style={{ width: "max-content" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {allItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[400px] md:w-[480px] group"
            >
              <div className="border border-white/10 p-3 bg-[#0a0a0a]/95 backdrop-blur-xl rounded-2xl shadow-2xl h-full transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="flex flex-col mb-3 px-2">
                  <h3
                    className="text-xl font-bold text-white tracking-wide"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 font-medium text-sm">
                    {item.category}
                  </p>
                </div>

                <div className="h-[280px] md:h-[340px] w-full bg-black rounded-xl overflow-hidden relative border border-white/5">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}