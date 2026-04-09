import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { OfferingsScrollStack } from "./components/OfferingsScrollStack";
import { Portfolio } from "./components/Portfolio";
import { LogoCloud } from "./components/LogoCloud";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import DemoOne from "./components/DemoOne";
import DarkVeil from "./components/DarkVeil";
import "../styles/fonts.css";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-[#d946ef]/30 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* DarkVeil Background effect - fixed to viewport so it doesn't stretch and distort */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DarkVeil 
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.65}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      {/* Hero + header sobreposto (mesma linguagem visual do Iridescence) */}
      <div className="relative z-10 w-full">
        <main className="w-full relative">
          <Hero />
        </main>
        <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
          <div className="pointer-events-auto max-w-[1300px] mx-auto px-8 md:px-12 pt-5 md:pt-6">
            <Navbar />
          </div>
        </div>
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
    </div>
  );
}