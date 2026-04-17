import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SectionHeader } from "./ui/section-header";
import { SpotlightCard } from "./ui/spotlight-card";
import { whatsappHref } from "../lib/whatsapp";
import {
  WA_MSG_OFFER_APP,
  WA_MSG_OFFER_LANDING,
  WA_MSG_OFFER_SAAS,
} from "../lib/whatsapp-messages";
import { cn } from "./ui/utils";

type OfferCard = {
  id: "landing" | "saas" | "app";
  label: string;
  pricePrefix?: string;
  price: string;
  priceSuffix?: string;
  term: string;
  deadline: string;
  includes: string[];
  ctaText: string;
  ctaHref: string;
  ctaAriaLabel: string;
  featured?: boolean;
};

const offers: OfferCard[] = [
  {
    id: "landing",
    label: "Landing Page",
    pricePrefix: "a partir de",
    price: "R$ 999",
    priceSuffix: "parcelável em 3×",
    term: "Ideal para validar produto, captar contato e vender serviço.",
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
    price: "sob consulta",
    priceSuffix: "parcelável em 3×",
    term: "Painéis, CRMs e sistemas internos desenhados para a sua operação.",
    deadline: "Prazo sob consulta",
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
    price: "sob consulta",
    priceSuffix: "parcelável em 3×",
    term: "Apps mobile (iOS/Android) ou PWA para o seu produto rodar na mão do cliente.",
    deadline: "Prazo sob consulta",
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

function OfferCardView({ offer, index }: { offer: OfferCard; index: number }) {
  const titleId = `oferta-${offer.id}-title`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      aria-labelledby={titleId}
      className="h-full"
    >
      <SpotlightCard
        className={cn(
          "flex h-full flex-col gap-6 p-6 sm:p-7 md:p-8",
          offer.featured
            ? "border-white/20 bg-white/[0.04] ring-1 ring-white/5"
            : "",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            {offer.label}
          </span>
          {offer.featured ? (
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Mais procurado
            </span>
          ) : null}
        </div>

        <div>
          {offer.pricePrefix ? (
            <p className="text-[12px] uppercase tracking-[0.12em] text-zinc-500">
              {offer.pricePrefix}
            </p>
          ) : null}
          <p
            id={titleId}
            className="text-[clamp(1.75rem,4vw,2rem)] font-medium leading-none tracking-[-0.02em] text-white"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            {offer.price}
          </p>
          {offer.priceSuffix ? (
            <p className="mt-2 text-[13px] text-zinc-400">{offer.priceSuffix}</p>
          ) : null}
        </div>

        <div className="h-px w-full bg-white/10" aria-hidden />

        <div className="flex flex-col gap-3 text-sm text-zinc-300">
          <p
            className="text-[14px] leading-relaxed text-zinc-400"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            {offer.term}
          </p>
          <p
            className="text-[13px] font-medium uppercase tracking-[0.08em] text-emerald-400/90"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            {offer.deadline}
          </p>
        </div>

        <ul className="flex flex-col gap-2 text-[14px] text-zinc-200">
          {offer.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                className="mt-0.5 size-4 shrink-0 text-emerald-400"
                strokeWidth={2.25}
                aria-hidden
              />
              <span
                className="leading-relaxed"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
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
            "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-page-surface",
            offer.featured
              ? "bg-white text-zinc-900 hover:bg-white/90"
              : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
          )}
        >
          <SiWhatsapp className="size-4" aria-hidden />
          {offer.ctaText}
        </a>
      </SpotlightCard>
    </motion.article>
  );
}

export function Offer() {
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

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
      >
        <SectionHeader
          id="oferta-heading"
          eyebrow="Oferta"
          title="O que você recebe, quando e por quanto."
          description="Sem letras miúdas. Escopo e condições definidos na proposta."
          className="mb-12 md:mb-14"
        />
      </motion.div>

      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <OfferCardView key={offer.id} offer={offer} index={i} />
          ))}
        </div>

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
