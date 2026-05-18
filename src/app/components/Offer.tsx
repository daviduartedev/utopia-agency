"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SectionHeader } from "./ui/section-header";
import { cn } from "./ui/utils";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";
import { whatsappHref } from "../lib/whatsapp";
import {
  WA_MSG_OFFER_APP,
  WA_MSG_OFFER_LANDING,
  WA_MSG_OFFER_SAAS,
} from "../lib/whatsapp-messages";

type OfferId = "landing" | "saas" | "app";

type Offer = {
  id: OfferId;
  label: string;
  shortLabel: string;
  tagline: string;
  description: string;
  pricePrefix: string;
  price: string;
  priceSuffix: string;
  delivery: string;
  badge?: string;
  features: ReadonlyArray<string>;
  ctaLabel: string;
  ctaAriaLabel: string;
  ctaHref: string;
};

const offers: ReadonlyArray<Offer> = [
  {
    id: "landing",
    label: "Landing Page",
    shortLabel: "Landing",
    tagline: "Perfeito para negócios locais e validação",
    description:
      "Tudo que você precisa pra colocar uma página no ar, gerar contato e parar de depender só de indicação.",
    pricePrefix: "a partir de",
    price: "R$ 999",
    priceSuffix: "/ projeto · parcelável em 3×",
    delivery: "Entrega em até 7 dias",
    badge: "Mais procurado",
    features: [
      "Página no ar com layout aprovado por você antes da publicação",
      "Endereço do site e hospedagem configurados",
      "Base pra Google indexar direito e te achar na busca",
      "Contagem de visitas ligada pra você ver o movimento",
      "1 mês de suporte gratuito depois do lançamento",
      "Revisões dentro do que combinamos na proposta",
    ],
    ctaLabel: "Quero meu site profissional",
    ctaAriaLabel: "Falar sobre landing page no WhatsApp",
    ctaHref: whatsappHref(WA_MSG_OFFER_LANDING),
  },
  {
    id: "saas",
    label: "Sistema online",
    shortLabel: "Sistema",
    tagline: "Pra operação que já não cabe em planilha",
    description:
      "Painel feito pro seu fluxo: agenda, pedido, cadastro, área restrita. Combinado por escrito antes de codar.",
    pricePrefix: "valor",
    price: "sob consulta",
    priceSuffix: "parcelável em 3×",
    delivery: "Sob consulta",
    features: [
      "Telas e fluxo fechados na proposta antes de codar",
      "Login e área restrita pra equipe ou cliente",
      "Dados guardados com rotina de backup",
      "Publicação com atualização segura quando mudar algo",
      "1 mês de suporte gratuito depois do lançamento",
      "Revisões dentro do que combinamos na proposta",
    ],
    ctaLabel: "Quero meu sistema online",
    ctaAriaLabel: "Falar sobre sistema online no WhatsApp",
    ctaHref: whatsappHref(WA_MSG_OFFER_SAAS),
  },
  {
    id: "app",
    label: "Aplicativo",
    shortLabel: "App",
    tagline: "Quando o uso real é no celular",
    description:
      "App pensado primeiro pro celular, com telas enxutas e linguagem simples — sem complicar o dia a dia.",
    pricePrefix: "valor",
    price: "sob consulta",
    priceSuffix: "parcelável em 3×",
    delivery: "Sob consulta",
    features: [
      "Telas pensadas primeiro pro uso no celular",
      "Versão pra instalar nas lojas ou abrir pelo navegador no telefone",
      "Aviso pro cliente e números básicos de uso",
      "1 mês de suporte gratuito depois do lançamento",
      "Revisões dentro do que combinamos na proposta",
    ],
    ctaLabel: "Quero falar sobre app",
    ctaAriaLabel: "Falar sobre aplicativo no WhatsApp",
    ctaHref: whatsappHref(WA_MSG_OFFER_APP),
  },
];

/**
 * Offer estilo Jax Orion pricing — toggle entre 3 ofertas + card grande com features.
 */
export function Offer() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<OfferId>("landing");
  const current = offers.find((o) => o.id === activeId) ?? offers[0];

  return (
    <section
      id="oferta"
      aria-labelledby="oferta-heading"
      className="relative w-full bg-section-over-gradient py-24 md:py-32"
    >
      <SectionHeader
        eyebrow="Oferta"
        title="Planos sob medida pra cada ambição"
        description="Escolha o que combina com sua meta. Sinal de 30% pra iniciar e o resto combinado por escrito."
        id="oferta-heading"
      />

      <div className="mx-auto mt-12 flex w-full max-w-md items-center justify-center px-4">
        <div
          role="tablist"
          aria-label="Selecionar tipo de plano"
          className="inline-flex w-full items-center gap-1 rounded-full border border-white/10 bg-zinc-950/80 p-1 backdrop-blur"
        >
          {offers.map((offer) => {
            const active = offer.id === activeId;
            return (
              <button
                key={offer.id}
                role="tab"
                aria-selected={active}
                aria-controls={`offer-panel-${offer.id}`}
                id={`offer-tab-${offer.id}`}
                type="button"
                onClick={() => setActiveId(offer.id)}
                className={cn(
                  "relative flex-1 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                  active
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-300 hover:text-white",
                )}
              >
                {offer.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 1 })}
        className="mx-auto mt-10 w-full max-w-3xl px-4 sm:px-8 md:px-12"
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            id={`offer-panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`offer-tab-${current.id}`}
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-7 backdrop-blur-sm md:p-10"
          >
            {current.badge ? (
              <span className="absolute right-6 top-6 inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                {current.badge}
              </span>
            ) : null}

            <div className="mb-6">
              <h3
                className="text-[1.7rem] font-semibold tracking-tight text-white md:text-[2rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {current.label}
              </h3>
              <p className="mt-2 text-[14px] text-zinc-400">{current.tagline}</p>
            </div>

            <p className="border-y border-white/10 py-5 text-[14.5px] leading-relaxed text-zinc-300">
              {current.description}
            </p>

            <ul className="mt-6 space-y-3.5">
              {current.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-[14.5px] leading-relaxed text-zinc-200"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-7 md:flex-row md:items-end">
              <div>
                <p className="text-[12px] uppercase tracking-[0.14em] text-zinc-500">
                  {current.pricePrefix}
                </p>
                <p
                  className="mt-1 text-[2.6rem] font-bold leading-none tracking-tight text-white md:text-[3rem]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {current.price}
                </p>
                <p className="mt-2 text-[12px] text-zinc-400">
                  {current.priceSuffix}
                </p>
                <p className="mt-3 text-[13px] font-medium text-emerald-300">
                  {current.delivery}
                </p>
              </div>

              <a
                href={current.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={current.ctaAriaLabel}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-black px-6 py-3.5 text-[14.5px] font-medium text-white transition-all duration-200 hover:border-white/30 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:w-auto"
              >
                <SiWhatsapp className="h-4 w-4" />
                {current.ctaLabel}
              </a>
            </div>
          </motion.article>
        </AnimatePresence>

        <p className="mt-6 text-center text-[12.5px] leading-relaxed text-zinc-500">
          Para iniciar: sinal mínimo de 30% (ou 1 parcela). O restante é
          combinado na proposta, sem surpresa depois.
        </p>
      </motion.div>
    </section>
  );
}
