import { BrandLogo } from "./BrandLogo";
import { whatsappHref } from "../lib/whatsapp";
import { WA_MSG_FOOTER } from "../lib/whatsapp-messages";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiStrapi,
  SiClaude,
} from "react-icons/si";

const stackItems = [
  { node: <SiReact className="text-[#61DAFB]" aria-hidden />, title: "React" },
  { node: <SiNextdotjs className="text-white" aria-hidden />, title: "Next.js" },
  { node: <SiTypescript className="text-[#3178C6]" aria-hidden />, title: "TypeScript" },
  { node: <SiTailwindcss className="text-[#06B6D4]" aria-hidden />, title: "Tailwind CSS" },
  { node: <SiSupabase className="text-[#3FCF8E]" aria-hidden />, title: "Supabase" },
  { node: <SiStrapi className="text-[#8E75FF]" aria-hidden />, title: "Strapi" },
  { node: <SiClaude className="text-[#CC785C]" aria-hidden />, title: "Claude" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-page-surface">
      <div className="mx-auto max-w-[1300px] px-4 py-12 sm:px-8 sm:py-14 md:px-12">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <BrandLogo
              className="justify-center md:justify-start"
              imgClassName="size-10 md:size-11"
              wordmarkClassName="text-[22px] font-semibold md:text-[23px]"
            />
            <p
              className="max-w-sm text-center text-sm leading-relaxed text-zinc-500 md:text-left"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              Landing pages, SaaS e apps — entrega rápida com padrão premium.
            </p>

            {/* Stack logos */}
            <div
              className="mt-1 flex flex-wrap items-center gap-3"
              aria-label="Tecnologias utilizadas"
            >
              {stackItems.map((item) => (
                <span
                  key={item.title}
                  title={item.title}
                  className="text-lg opacity-60 transition-opacity hover:opacity-100"
                >
                  {item.node}
                </span>
              ))}
            </div>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] font-medium text-zinc-300"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            aria-label="Rodapé"
          >
            <a href="#inicio" className="transition-colors hover:text-white">
              Início
            </a>
            <a href="#ofertas" className="transition-colors hover:text-white">
              Serviços
            </a>
            <a href="#como-funciona" className="transition-colors hover:text-white">
              Como funciona
            </a>
            <a href="#portfolio" className="transition-colors hover:text-white">
              Trabalhos
            </a>
            <a href="#oferta" className="transition-colors hover:text-white">
              Oferta
            </a>
            <a href="#faq" className="transition-colors hover:text-white">
              FAQ
            </a>
            <a
              href={whatsappHref(WA_MSG_FOOTER)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Quero meu projeto
            </a>
          </nav>
        </div>

        <div
          className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          <p className="text-center md:text-left">
            © {currentYear} Utopia Studio. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
            <a href="#" className="transition-colors hover:text-zinc-300">
              Termos
            </a>
            <a href="#" className="transition-colors hover:text-zinc-300">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
