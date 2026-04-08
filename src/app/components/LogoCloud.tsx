import { motion } from "motion/react";
import { InfiniteSlider } from "./ui/infinite-slider";
import { ProgressiveBlur } from "./ui/progressive-blur";

type Logo = {
  src: string;
  alt: string;
};

const logos: Logo[] = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso",
  },
  {
    src: "https://svgl.app/library/nextjs_wordmark_light.svg",
    alt: "Next.js",
  },
  {
    src: "https://svgl.app/library/tailwindcss_wordmark.svg",
    alt: "Tailwind CSS",
  },
  {
    src: "https://svgl.app/library/typescript_wordmark.svg",
    alt: "TypeScript",
  },
  {
    src: "https://svgl.app/library/react_wordmark.svg",
    alt: "React",
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

        <div className="py-7 bg-white/[0.02]">
          <InfiniteSlider
            gap={72}
            duration={120}
            durationOnHover={200}
            reverse={false}
          >
            {logos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-5 md:h-6 w-auto select-none pointer-events-none brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            ))}
          </InfiniteSlider>
        </div>

        {/* Progressive blur masks on both sides */}
        <ProgressiveBlur
          blurIntensity={0.8}
          className="pointer-events-none absolute top-0 left-0 h-full w-[140px]"
          direction="left"
        />
        <ProgressiveBlur
          blurIntensity={0.8}
          className="pointer-events-none absolute top-0 right-0 h-full w-[140px]"
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