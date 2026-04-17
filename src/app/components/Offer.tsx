import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { SectionHeader } from "./ui/section-header";
import { whatsappHref } from "../lib/whatsapp";
import {
  WA_MSG_OFFER_APP,
  WA_MSG_OFFER_LANDING,
  WA_MSG_OFFER_SAAS,
} from "../lib/whatsapp-messages";
import { cn } from "./ui/utils";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";

type OfferRow = {
  id: "landing" | "saas" | "app";
  label: string;
  priceDisplay: {
    prefix?: string;
    main: string;
    suffix?: string;
  };
  deadline: string;
  includes: string[];
  ctaText: string;
  ctaHref: string;
  ctaAriaLabel: string;
  featured?: boolean;
};

const offers: OfferRow[] = [
  {
    id: "landing",
    label: "Landing Page",
    priceDisplay: {
      prefix: "a partir de",
      main: "R$ 999",
      suffix: "parcelável em 3×",
    },
    deadline: "Entrega em até 7 dias",
    includes: [
      "Design em Figma + código-fonte entregue",
      "Domínio e hospedagem configurados",
      "SEO técnico básico",
      "Analytics instalado",
      "1 mês de suporte gratuito",
      "Revisões inclusas na proposta",
    ],
    ctaText: "Quero minha landing",
    ctaHref: whatsappHref(WA_MSG_OFFER_LANDING),
    ctaAriaLabel: "Falar sobre landing page no WhatsApp",
    featured: true,
  },
  {
    id: "saas",
    label: "Sistema SaaS",
    priceDisplay: {
      main: "sob consulta",
      suffix: "parcelável em 3×",
    },
    deadline: "Sob consulta",
    includes: [
      "Design em Figma + código-fonte entregue",
      "Banco e backend configurados",
      "Autenticação + painel administrativo",
      "Deploy com CI/CD",
      "1 mês de suporte gratuito",
      "Revisões inclusas na proposta",
    ],
    ctaText: "Falar sobre meu SaaS",
    ctaHref: whatsappHref(WA_MSG_OFFER_SAAS),
    ctaAriaLabel: "Falar sobre sistema SaaS no WhatsApp",
  },
  {
    id: "app",
    label: "Aplicativo",
    priceDisplay: {
      main: "sob consulta",
      suffix: "parcelável em 3×",
    },
    deadline: "Sob consulta",
    includes: [
      "Design em Figma + código-fonte entregue",
      "Build mobile (iOS/Android) ou PWA",
      "Integrações de push/analytics",
      "1 mês de suporte gratuito",
      "Revisões inclusas na proposta",
    ],
    ctaText: "Falar sobre meu app",
    ctaHref: whatsappHref(WA_MSG_OFFER_APP),
    ctaAriaLabel: "Falar sobre aplicativo no WhatsApp",
  },
];

export function Offer() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const headerMotion = scrollRevealMotion(prefersReducedMotion);
  const [openOffer, setOpenOffer] = useState<OfferRow["id"]>("landing");

  return (
    <section
      id="oferta"
      aria-labelledby="oferta-heading"
      className="relative z-10 w-full scroll-mt-24 bg-page-surface py-20 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div {...headerMotion}>
        <SectionHeader
          id="oferta-heading"
          eyebrow="Oferta"
          title="O que você recebe, quando e por quanto."
          description="Sem letras miúdas. Escopo e condições definidos na proposta."
          className="mb-10 md:mb-14"
        />
      </motion.div>

      <div className="mx-auto max-w-[720px] px-4 sm:px-8 md:px-12">
        <motion.div {...scrollRevealMotion(prefersReducedMotion)}>
          <Accordion
            type="single"
            collapsible={false}
            value={openOffer}
            onValueChange={(v: string) => {
              if (v === "landing" || v === "saas" || v === "app") {
                setOpenOffer(v);
              }
            }}
            className="w-full space-y-3"
          >
            {offers.map((offer) => {
              const titleId = `oferta-${offer.id}-title`;
              return (
                <AccordionItem
                  key={offer.id}
                  value={offer.id}
                  className={cn(
                    "!my-0 overflow-hidden rounded-2xl !border !border-white/12 !border-b bg-white/[0.02] px-1 last:border-b sm:px-2",
                    offer.featured &&
                      "!border-emerald-500/35 bg-gradient-to-br from-emerald-500/[0.07] to-transparent ring-1 ring-emerald-500/15",
                  )}
                >
                  <AccordionTrigger className="items-center px-4 py-5 text-left hover:no-underline sm:px-5 sm:py-6 [&[data-state=open]>svg]:text-zinc-300">
                    <div className="flex w-full flex-col gap-2 pr-2 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500"
                          style={{
                            fontFamily: "var(--font-sans), system-ui, sans-serif",
                          }}
                        >
                          {offer.label}
                        </span>
                        {offer.featured ? (
                          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-200/90">
                            Mais procurado
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-1">
                        {offer.priceDisplay.prefix ? (
                          <p className="text-[12px] uppercase tracking-[0.12em] text-zinc-500">
                            {offer.priceDisplay.prefix}
                          </p>
                        ) : null}
                        <p
                          id={titleId}
                          className="text-[clamp(1.5rem,4vw,2rem)] font-medium leading-none tracking-[-0.02em] text-white"
                          style={{
                            fontFamily: "var(--font-display), Georgia, serif",
                          }}
                        >
                          {offer.priceDisplay.main}
                        </p>
                        {offer.priceDisplay.suffix ? (
                          <p className="text-[13px] text-zinc-400">
                            {offer.priceDisplay.suffix}
                          </p>
                        ) : null}
                        <p
                          className="text-[13px] font-medium uppercase tracking-[0.08em] text-emerald-400/90"
                          style={{
                            fontFamily: "var(--font-sans), system-ui, sans-serif",
                          }}
                        >
                          {offer.deadline}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 sm:px-5">
                    <article aria-labelledby={titleId}>
                      <ul className="flex flex-col gap-2.5 text-[14px] text-zinc-200">
                        {offer.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-emerald-400"
                              strokeWidth={2.25}
                              aria-hidden
                            />
                            <span
                              className="leading-relaxed"
                              style={{
                                fontFamily:
                                  "var(--font-sans), system-ui, sans-serif",
                              }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={offer.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={offer.ctaAriaLabel}
                        className={cn(
                          "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface sm:w-auto",
                          offer.featured
                            ? "bg-white text-zinc-900 hover:bg-white/90"
                            : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
                        )}
                      >
                        <SiWhatsapp className="size-4" aria-hidden />
                        {offer.ctaText}
                      </a>
                    </article>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>

        <p
          className="mx-auto mt-10 max-w-2xl text-center text-[13px] leading-relaxed text-zinc-400 md:text-sm"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          Para iniciar: sinal mínimo de 30% (ou 1 parcela). O restante é combinado na proposta — sem surpresa depois.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
