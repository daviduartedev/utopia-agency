import { motion } from "motion/react";
import LogoLoop, { type LogoLoopItem } from "./ui/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiStrapi,
  SiClaude,
} from "react-icons/si";

const stackLogos: LogoLoopItem[] = [
  {
    node: <SiReact className="text-[#61DAFB]" aria-hidden />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiNextdotjs className="text-white" aria-hidden />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiTypescript className="text-[#3178C6]" aria-hidden />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss className="text-[#06B6D4]" aria-hidden />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiSupabase className="text-[#3FCF8E]" aria-hidden />,
    title: "Supabase",
    href: "https://supabase.com",
  },
  {
    node: <SiStrapi className="text-[#8E75FF]" aria-hidden />,
    title: "Strapi",
    href: "https://strapi.io",
  },
  {
    src: "https://svgl.app/library/cursor_light.svg",
    alt: "Cursor",
    title: "Cursor",
    href: "https://cursor.com",
  },
  {
    node: <SiClaude className="text-[#CC785C]" aria-hidden />,
    title: "Claude",
    href: "https://claude.ai",
  },
];

export function LogoCloud() {
  return (
    <section
      id="stack"
      className="relative z-10 w-full py-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative w-full max-w-[1300px] mx-auto px-4 sm:px-8 md:px-12"
      >
        <div className="absolute top-0 inset-x-8 md:inset-x-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-8 md:inset-x-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative flex min-h-[200px] md:min-h-[220px] w-full items-center overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950/80">
          <LogoLoop
            logos={stackLogos}
            speed={100}
            direction="left"
            logoHeight={56}
            gap={56}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Ferramentas e tecnologias do stack"
            className="w-full"
          />
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
