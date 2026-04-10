import { Suspense } from "react";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { LazySection } from "./components/LazySection";
import { DeferredDemoOne } from "./components/DeferredDemoOne";
import {
  WhyUs,
  OfferingsScrollStack,
  HowItWorks,
  Portfolio,
  Testimonials,
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

      {/* 2–10: JS pesado só quando perto do viewport */}
      <div className="relative z-10 w-full">
        <LazySection minHeight="48vh">
          <Suspense fallback={<SectionFallback />}>
            <WhyUs />
          </Suspense>
        </LazySection>
      </div>

      <div className="relative z-10 w-full">
        <LazySection minHeight="120vh">
          <Suspense fallback={<SectionFallback />}>
            <OfferingsScrollStack />
          </Suspense>
        </LazySection>
      </div>

      <div className="relative z-10 w-full">
        <LazySection minHeight="56vh">
          <Suspense fallback={<SectionFallback />}>
            <HowItWorks />
          </Suspense>
        </LazySection>
      </div>

      <div className="relative z-10 w-full">
        <LazySection minHeight="52vh">
          <Suspense fallback={<SectionFallback />}>
            <Portfolio />
          </Suspense>
        </LazySection>
      </div>

      <div className="relative z-10 w-full">
        <LazySection minHeight="48vh">
          <Suspense fallback={<SectionFallback />}>
            <Testimonials />
          </Suspense>
        </LazySection>
      </div>

      <div className="relative z-10 w-full">
        <LazySection minHeight="40vh">
          <Suspense fallback={<SectionFallback />}>
            <Faq />
          </Suspense>
        </LazySection>
      </div>

      <div className="relative z-10 w-full">
        <LazySection minHeight="44vh">
          <Suspense fallback={<SectionFallback />}>
            <CtaSection />
          </Suspense>
        </LazySection>
      </div>

      <div className="relative z-10 w-full">
        <LazySection minHeight="56vh">
          <Suspense fallback={<SectionFallback />}>
            <ContactFormSection />
          </Suspense>
        </LazySection>
      </div>

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
