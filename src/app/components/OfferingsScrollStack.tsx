"use client";

import ScrollStack, { ScrollStackItem } from "./ui/ScrollStack";
import { SectionHeader } from "./ui/section-header";
import { useIsNarrowMobile } from "../lib/use-media-query";

const STACK_ITEMS = [
  {
    id: "landing",
    kicker: "Conversão e clareza",
    title: "Landing pages",
    body:
      "Landing pages e sites de produto para converter visita em contato. Mensagem clara, layout objetivo e performance real.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=85&w=1600&auto=format&fit=crop",
  },
  {
    id: "saas",
    kicker: "Operação e escala",
    title: "Sistemas SaaS",
    body:
      "Sistemas SaaS e painéis customizados para sua equipe operar e medir. Integrações sólidas e escala sem gargalo técnico.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "apps",
    kicker: "Mobile & PWA",
    title: "Aplicativos",
    body:
      "Aplicativos mobile e PWA com fluxos simples e onboarding inteligente. Experiência pensada para o uso no dia a dia.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop",
  },
] as const;

function optimizeServiceImage(url: string, mobile: boolean): string {
  try {
    const u = new URL(url);
    u.searchParams.set("w", mobile ? "720" : "1400");
    u.searchParams.set("q", mobile ? "68" : "80");
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    return u.toString();
  } catch {
    return url;
  }
}

function OfferingServiceCard({
  item,
  imageUrl,
}: {
  item: (typeof STACK_ITEMS)[number];
  imageUrl: string;
}) {
  return (
    <article className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-page-surface !p-0 shadow-none h-[min(30rem,88vw)] md:h-[40rem] lg:h-[44rem]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-page-surface/45" />
      <div className="relative z-10 flex h-full flex-col justify-end p-7 text-left md:p-10 lg:p-12">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400 md:text-xs">
          {item.kicker}
        </p>
        <h3
          className="mb-3 text-3xl font-medium tracking-[-0.02em] text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          {item.title}
        </h3>
        <p
          className="max-w-prose text-base leading-relaxed text-zinc-300 md:text-lg"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          {item.body}
        </p>
      </div>
    </article>
  );
}

export function OfferingsScrollStack() {
  const narrowMobile = useIsNarrowMobile();

  return (
    <section
      id="ofertas"
      className="relative z-10 w-full scroll-mt-24 bg-page-surface text-white"
      aria-labelledby="ofertas-heading"
    >
      <SectionHeader
        id="ofertas-heading"
        className="pb-6 pt-12 md:pb-8 md:pt-16"
        title="Nossos serviços"
        description="Landing pages, sistemas SaaS e aplicativos — três formatos, um mesmo padrão de entrega."
        compactDescription
      />

      {narrowMobile ? (
        <div className="flex flex-col gap-8 px-4 pb-14">
          {STACK_ITEMS.map((item) => (
            <OfferingServiceCard
              key={item.id}
              item={item}
              imageUrl={optimizeServiceImage(item.image, true)}
            />
          ))}
        </div>
      ) : (
        <div className="min-h-[130vh] w-full pb-16">
          <ScrollStack
            useWindowScroll
            className="!h-auto block min-h-[150vh] w-full"
            innerClassName="flex flex-col items-center !px-4 sm:!px-6 md:!px-10"
            itemDistance={128}
            itemStackDistance={24}
            baseScale={0.88}
            itemScale={0.038}
            blurAmount={0}
            stackPosition="21%"
            scaleEndPosition="17%"
          >
            {STACK_ITEMS.map((item) => (
              <ScrollStackItem
                key={item.id}
                itemClassName="!border !border-white/10 overflow-hidden !p-0 w-full max-w-7xl !h-[min(34rem,92vw)] md:!h-[40rem] lg:!h-[44rem] mx-auto bg-page-surface"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${optimizeServiceImage(item.image, false)})`,
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-page-surface/45" />
                <div className="relative z-10 flex h-full flex-col justify-end p-7 text-left md:p-10 lg:p-12">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400 md:text-xs">
                    {item.kicker}
                  </p>
                  <h3
                    className="mb-3 text-3xl font-medium tracking-[-0.02em] text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight"
                    style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="max-w-prose text-base leading-relaxed text-zinc-300 md:text-lg"
                    style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                  >
                    {item.body}
                  </p>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      )}
    </section>
  );
}
