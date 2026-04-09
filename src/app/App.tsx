import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { OfferingsScrollStack } from "./components/OfferingsScrollStack";
import { Portfolio } from "./components/Portfolio";
import { LogoCloud } from "./components/LogoCloud";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import DemoOne from "./components/DemoOne";
import "../styles/fonts.css";

export default function App() {
  return (
    <div
      className="min-h-screen bg-page-surface text-white antialiased selection:bg-white/15 overflow-x-hidden"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Hero — header está no fim do App para ficar acima de todas as secções (mesmo z-index) */}
      <div className="relative z-10 w-full">
        <main className="relative w-full">
          <Hero />
        </main>
      </div>

      <div className="relative z-10 w-full">
        <OfferingsScrollStack />
      </div>

      {/* Portfolio lives OUTSIDE the max-width container so it can be truly full-width */}
      <div className="relative z-10 w-full">
        <Portfolio />
      </div>

      {/* Logo Cloud — technologies & stack */}
      <div className="relative z-10 w-full">
        <LogoCloud />
      </div>

      {/* Depoimentos */}
      <div className="relative z-10 w-full">
        <Testimonials />
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating UI Elements */}
      <DemoOne />

      {/* Navbar por último no DOM + z-index alto: secções abaixo não cobrem os cliques */}
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