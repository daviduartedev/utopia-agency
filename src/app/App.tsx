import { Suspense } from "react";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { LazySection } from "./components/LazySection";
import { DeferredDemoOne } from "./components/DeferredDemoOne";
import {
  Problem,
  ClientLogos,
  WhyUs,
  OfferingsScrollStack,
  HowItWorks,
  Portfolio,
  Testimonials,
  Offer,
  Faq,
  CtaSection,
  ContactFormSection,
  Footer,
} from "./lazy-pages";
import "../styles/fonts.css";

function SectionFallback() {
  return (
    <div
      className="w-full min-h-[28vh] bg-page-surface"
      aria-hidden
    />
  );
}

export default function App() {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-page-surface pb-28 text-white antialiased selection:bg-white/15 sm:pb-10 md:pb-12"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* 1. Hero — chunk inicial; Plasma carrega async no próprio hero */}
      <div className="relative z-10 w-full">
        <main className="relative w-full">
          <Hero />
        </main>
      </div>

      {/* 2. Problema — reconhecimento de dor logo após o hero */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="44vh">
          <Suspense fallback={<SectionFallback />}>
            <Problem />
          </Suspense>
        </LazySection>
      </div>

      {/* 3. Prova social rápida — logos de clientes */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="32vh">
          <Suspense fallback={<SectionFallback />}>
            <ClientLogos />
          </Suspense>
        </LazySection>
      </div>

      {/* 4. Serviços (solução) */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="120vh">
          <Suspense fallback={<SectionFallback />}>
            <OfferingsScrollStack />
          </Suspense>
        </LazySection>
      </div>

      {/* 5. Diferenciais */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="48vh">
          <Suspense fallback={<SectionFallback />}>
            <WhyUs />
          </Suspense>
        </LazySection>
      </div>

      {/* 6. Como funciona */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="56vh">
          <Suspense fallback={<SectionFallback />}>
            <HowItWorks />
          </Suspense>
        </LazySection>
      </div>

      {/* 7. Portfólio */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="52vh">
          <Suspense fallback={<SectionFallback />}>
            <Portfolio />
          </Suspense>
        </LazySection>
      </div>

      {/* 8. Depoimentos */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="48vh">
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
        </LazySection>
      </div>

      {/* 9. Oferta — o que está sendo vendido, preço e condições */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="60vh">
          <Suspense fallback={<SectionFallback />}>
            <Offer />
          </Suspense>
        </LazySection>
      </div>

      {/* 10. FAQ */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="40vh">
          <Suspense fallback={<SectionFallback />}>
            <Faq />
          </Suspense>
        </LazySection>
      </div>

      {/* 11. CTA final */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="44vh">
          <Suspense fallback={<SectionFallback />}>
            <CtaSection />
          </Suspense>
        </LazySection>
      </div>

      {/* 12. Formulário de contato */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="56vh">
          <Suspense fallback={<SectionFallback />}>
            <ContactFormSection />
          </Suspense>
        </LazySection>
      </div>

      {/* 13. Rodapé */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="32vh">
          <Suspense fallback={<SectionFallback />}>
            <Footer />
          </Suspense>
        </LazySection>
      </div>

      <DeferredDemoOne />

      <div className="pointer-events-auto fixed inset-x-0 top-0 z-[200] pt-[env(safe-area-inset-top,0px)]">
        <div className="w-full px-3 pt-3 sm:px-6 sm:pt-4 md:px-12 md:pt-6">
          <div className="mx-auto max-w-[1300px]">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
}
