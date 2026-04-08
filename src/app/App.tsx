import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
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

      {/* Navbar constrained */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-12 w-full relative z-20">
        <Navbar />
      </div>

      {/* Cinematic Hero full width */}
      <main className="w-full relative z-10">
        <Hero />
      </main>

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