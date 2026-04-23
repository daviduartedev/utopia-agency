import { motion } from "motion/react";
import LogoLoop, { type LogoLoopItem } from "./ui/LogoLoop";
import { SectionHeader } from "./ui/section-header";
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
      className="relative z-10 w-full overflow-hidden bg-black py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="w-full"
      >
        <SectionHeader
          id="stack-heading"
          className="mb-12 pb-2"
          eyebrow="Tecnologia"
          title="Stack e ferramentas"
          description="Um conjunto moderno para landings, SaaS e apps que precisam performar e escalar com confiança."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="relative mx-auto w-full max-w-[1300px] px-4 sm:px-8 md:px-12"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-white/10 md:inset-x-12" />
        <div className="absolute inset-x-8 bottom-0 h-px bg-white/10 md:inset-x-12" />

        <div className="relative flex min-h-[200px] w-full items-center overflow-hidden rounded-2xl border border-white/10 bg-black md:min-h-[220px]">
          <LogoLoop
            logos={stackLogos}
            speed={100}
            direction="left"
            logoHeight={56}
            gap={56}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#0a0a0a"
            ariaLabel="Ferramentas e tecnologias do stack"
            className="w-full"
          />
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
