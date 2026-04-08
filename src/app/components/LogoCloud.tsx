import { motion } from "motion/react";
import { InfiniteSlider } from "./ui/infinite-slider";
import { ProgressiveBlur } from "./ui/progressive-blur";

type Logo = {
  src: string;
  alt: string;
  /** Se false, mantém cores originais (ex.: React Native em ciano). */
  monochrome?: boolean;
};

/** Ícones (não wordmarks) — ordem do carrossel */
const logos: Logo[] = [
  {
    src: "https://svgl.app/library/cursor_light.svg",
    alt: "Cursor",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude",
  },
  {
    src: "https://svgl.app/library/supabase.svg",
    alt: "Supabase",
  },
  {
    src: "https://svgl.app/library/strapi.svg",
    alt: "Strapi",
  },
  {
    src: "https://cdn.simpleicons.org/react/61DAFB",
    alt: "React",
    monochrome: false,
  },
  {
    src: "https://cdn.simpleicons.org/reactnative/61DAFB",
    alt: "React Native",
    monochrome: false,
  },
];

export function LogoCloud() {
  return (
    <section
      id="stack"
      className="relative z-10 w-full py-20 overflow-hidden"
    >
      {/* Subtle radial glow behind the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Header */}
      <div className="w-full max-w-[1300px] mx-auto px-8 md:px-12 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-zinc-500 uppercase tracking-[0.25em] text-xs mb-3"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Stack produtiva
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Ferramentas para entregar rápido e com qualidade
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Usamos um stack moderno para landings, SaaS e apps que precisam performar,
          escalar e passar confiança — sem reinventar a roda a cada projeto.
        </motion.p>
      </div>

      {/* Logo strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative w-full"
      >
        {/* Top border line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Bottom border line */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="py-8 md:py-9 bg-zinc-950/40 min-h-[4.5rem] md:min-h-[5rem]">
          <InfiniteSlider
            gap={56}
            duration={90}
            durationOnHover={160}
            reverse={false}
          >
            {logos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={
                  logo.monochrome === false
                    ? "h-8 md:h-9 w-9 md:w-10 shrink-0 object-contain select-none pointer-events-none opacity-80 hover:opacity-100 transition-opacity duration-300"
                    : "h-8 md:h-9 w-auto max-w-[7.5rem] shrink-0 object-contain object-left select-none pointer-events-none brightness-0 invert opacity-50 hover:opacity-85 transition-opacity duration-300"
                }
                loading="lazy"
              />
            ))}
          </InfiniteSlider>
        </div>

        {/* Desfoque progressivo nas laterais + vinheta suave */}
        <ProgressiveBlur
          blurIntensity={1.35}
          blurLayers={10}
          className="pointer-events-none absolute top-0 left-0 z-[1] h-full w-[min(28vw,220px)]"
          direction="left"
        />
        <ProgressiveBlur
          blurIntensity={1.35}
          blurLayers={10}
          className="pointer-events-none absolute top-0 right-0 z-[1] h-full w-[min(28vw,220px)]"
          direction="right"
        />
      </motion.div>

      {/* Bottom separator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}