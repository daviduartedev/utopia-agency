import ScrollStack, { ScrollStackItem } from "./ui/ScrollStack";

const STACK_ITEMS = [
  {
    id: "landing",
    kicker: "Landing pages",
    title: "Conversão e clareza",
    body:
      "Landing pages e sites de produto para converter visita em lead. Mensagem clara, layout objetivo e performance real.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "saas",
    kicker: "Sistemas SaaS",
    title: "Operação e escala",
    body:
      "Sistemas SaaS e painéis sob medida para o time operar e medir. Integrações sólidas e escala sem gargalo técnico.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "apps",
    kicker: "Aplicativos",
    title: "Mobile & PWA",
    body:
      "Aplicativos mobile e PWA com fluxos simples e onboarding inteligente. Experiência pensada para o uso no dia a dia.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop",
  },
] as const;

/**
 * Substitui o showcase FullScreenScrollFX do hero: stack com scroll (Lenis) + cards Landings / SaaS / Apps.
 */
export function OfferingsScrollStack() {
  return (
    <section
      id="ofertas"
      className="relative z-10 w-full bg-black text-white scroll-mt-24"
      aria-labelledby="ofertas-heading"
    >
      <div className="max-w-[1300px] mx-auto px-8 md:px-12 pt-16 pb-8 text-center">
        <p
          className="text-zinc-500 uppercase tracking-[0.25em] text-xs mb-3"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Utopia
        </p>
        <h2
          id="ofertas-heading"
          className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Landings · SaaS · Apps
        </h2>
        <p
          className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Entrega rápida · Padrão alto — o que fazemos, em cartões que acompanham o scroll.
        </p>
      </div>

      <div className="w-full min-h-[130vh] pb-28">
        <ScrollStack
          useWindowScroll
          className="!h-auto min-h-[150vh] w-full block"
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
              itemClassName="!border !border-white/10 !shadow-2xl !shadow-black/40 overflow-hidden !p-0 w-full max-w-7xl !h-[min(34rem,92vw)] md:!h-[40rem] lg:!h-[44rem] mx-auto bg-zinc-950"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
              <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-10 lg:p-12 text-left">
                <p
                  className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-purple-300/90 mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.kicker}
                </p>
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-prose"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.body}
                </p>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
