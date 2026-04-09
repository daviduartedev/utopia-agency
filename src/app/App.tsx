import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhyUs } from "./components/WhyUs";
import { OfferingsScrollStack } from "./components/OfferingsScrollStack";
import { HowItWorks } from "./components/HowItWorks";
import { Portfolio } from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { CtaSection } from "./components/CtaSection";
import { ContactFormSection } from "./components/ContactFormSection";
import { Footer } from "./components/Footer";
import DemoOne from "./components/DemoOne";
import "../styles/fonts.css";

export default function App() {
  return (
    <div
      className="min-h-screen bg-page-surface text-white antialiased selection:bg-white/15 overflow-x-hidden"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* 1. Hero */}
      <div className="relative z-10 w-full">
        <main className="relative w-full">
          <Hero />
        </main>
      </div>

      {/* 2. Por que a Utopia */}
      <div className="relative z-10 w-full">
        <WhyUs />
      </div>

      {/* 3. Serviços */}
      <div className="relative z-10 w-full">
        <OfferingsScrollStack />
      </div>

      {/* 4. Como funciona */}
      <div className="relative z-10 w-full">
        <HowItWorks />
      </div>

      {/* 5. Portfólio */}
      <div className="relative z-10 w-full">
        <Portfolio />
      </div>

      {/* 6. Depoimentos */}
      <div className="relative z-10 w-full">
        <Testimonials />
      </div>

      {/* 7. FAQ */}
      <div className="relative z-10 w-full">
        <Faq />
      </div>

      {/* 8. CTA — após prova social máxima */}
      <div className="relative z-10 w-full">
        <CtaSection />
      </div>

      {/* 9. Formulário de contato (#contato) */}
      <div className="relative z-10 w-full">
        <ContactFormSection />
      </div>

      {/* 10. Footer */}
      <Footer />

      {/* Floating UI Elements */}
      <DemoOne />

      {/* Navbar por último no DOM + z-index alto */}
      <div className="pointer-events-auto fixed inset-x-0 top-0 z-[200]">
        <div className="w-full px-8 pt-5 md:px-12 md:pt-6">
          <div className="mx-auto max-w-[1300px]">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
}
