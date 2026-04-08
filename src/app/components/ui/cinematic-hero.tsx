// src/app/components/ui/cinematic-hero.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "./utils";
import { FullScreenScrollFX, FullScreenFXAPI } from "./full-screen-scroll-fx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, rgba(168, 85, 247, 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(168, 85, 247, 0.15) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 80%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 80%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Restored 3D Depth)
  ---------------------------------------------------------------------- */
  
  .text-3d-matte {
      color: #ffffff;
      text-shadow: 
          0 10px 30px rgba(255, 255, 255, 0.2), 
          0 2px 4px rgba(255, 255, 255, 0.1);
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card with PURPLE Vibe */
  .premium-depth-card {
      /* Vibrant Deep Purple Gradient */
      background: linear-gradient(145deg, #2e1065 0%, #020617 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(168, 85, 247, 0.05),
          inset 0 1px 2px rgba(192, 132, 252, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(168, 85, 247, 0.1);
      position: relative;
  }

  /* Physical Tactile Buttons */
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }

  /* Robust pointer management for layers */
  .interactable-showcase { pointer-events: auto !important; }
  .locked-showcase { pointer-events: none !important; }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({ 
  tagline1 = "Seu produto digital,",
  tagline2 = "do zero ao crescimento.",
  ctaHeading = "Produto digital pronto para vender.",
  ctaDescription = "Agência focada em landings, sistemas SaaS e aplicativos: briefing objetivo, prazos curtos e entrega eficiente — sem abrir mão de acabamento premium.",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef   = useRef<HTMLDivElement>(null);
  const mainCardRef    = useRef<HTMLDivElement>(null);
  const fxApiRef       = useRef<FullScreenFXAPI>(null);
  const lastFxIdx      = useRef(0);
  const lastShowcaseInteractive = useRef(false);
  const [fxIndex, setFxIndex] = useState(0);
  /** Synced from ScrollTrigger — do not toggle via GSAP className (React would wipe it on re-render). */
  const [showcaseInteractive, setShowcaseInteractive] = useState(false);

  // ── FX sections defined once ────────────────────────────────────────────
  const FX_SECTIONS = [
    { id: "landing",  leftLabel: "Landing pages", title: "RÁPIDO", rightLabel: "Landing pages",  background: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1600&auto=format&fit=crop" },
    { id: "sistemas", leftLabel: "Sistemas SaaS", title: "PREMIUM", rightLabel: "Sistemas SaaS", background: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop" },
    { id: "aplicativos", leftLabel: "Aplicativos", title: "EFICIENTE", rightLabel: "Aplicativos",     background: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop" },
  ] satisfies { id: string; leftLabel: string; title: string; rightLabel: string; background: string }[];
  const FX_TOTAL = FX_SECTIONS.length; // 3

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".animated-card-container", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set(".showcase-content-layer", { autoAlpha: 0 });
      gsap.set(".final-cta-layer", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // ── PHASE 1: ENTRANCE (Hero Texts) ──
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // ── SCROLL TIMELINE MAPPING ──
      // [0-2]   Phase: CARD_APPEARANCE (Emerging from bottom)
      // [2-3.5] Phase: FULL_SCREEN_EXPANSION
      // [3.5-5] Phase: CONTENT_REVEAL (Internal FX fades in)
      // [5-11]  Phase: SHOWCASE_SCROLL_HOLD (Scroll driven showcase)
      // [11-13] Phase: CTA_REVEAL_TRANSITION
      // [13-17] Phase: OUTRO_AND_EXIT
      
      const FX_TOTAL_DURATION = 17;
      const FX_START_PROG = 5  / FX_TOTAL_DURATION;
      const FX_END_PROG   = 11 / FX_TOTAL_DURATION;
      const SHOWCASE_START_PROG = 5 / FX_TOTAL_DURATION;
      const SHOWCASE_END_PROG = 11 / FX_TOTAL_DURATION;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=9000",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const prog = self.progress;
            const inShowcase = prog >= SHOWCASE_START_PROG && prog < SHOWCASE_END_PROG;
            if (inShowcase !== lastShowcaseInteractive.current) {
              lastShowcaseInteractive.current = inShowcase;
              setShowcaseInteractive(inShowcase);
            }
            if (prog >= FX_START_PROG && prog <= FX_END_PROG) {
              const range = FX_END_PROG - FX_START_PROG;
              const norm  = Math.max(0, Math.min(1, (prog - FX_START_PROG) / range));
              const next  = Math.min(FX_TOTAL - 1, Math.floor(norm * FX_TOTAL));
              
              if (next !== lastFxIdx.current) {
                lastFxIdx.current = next;
                setFxIndex(next);
              }
            }
          },
        },
      });

      scrollTl
        // ── PHASE 2: CARD_APPEARANCE ──
        .to([".entrance-text-layer", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".animated-card-container", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        
        // ── PHASE 3: FULL_SCREEN_EXPANSION ──
        .to(".animated-card-container", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        
        // ── PHASE 4: CONTENT_REVEAL ──
        .fromTo(".showcase-content-layer", { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power4.out", duration: 2 }, "-=0.5")
        
        // ── PHASE 5: SHOWCASE_SCROLL_HOLD (pointer mode toggled via React state + onUpdate)
        .to({}, { duration: 6 }) 
        
        // ── PHASE 6: CTA_REVEAL_TRANSITION ──
        .set(".entrance-text-layer", { autoAlpha: 0 })
        .set(".final-cta-layer", { autoAlpha: 1 }) 
        .to({}, { duration: 1.5 })
        
        // ── PHASE 7: OUTRO_AND_EXIT ──
        .to(".showcase-content-layer", { scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2 })
        .to(".animated-card-container", { 
          width: isMobile ? "92vw" : "85vw", 
          height: isMobile ? "92vh" : "85vh", 
          borderRadius: isMobile ? "32px" : "40px", 
          ease: "expo.inOut", 
          duration: 1.8 
        }, "pullback") 
        .to(".final-cta-layer", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".animated-card-container", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  },[]); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-transparent text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* PHASE 1 LAYER: ENTRANCE TEXTS */}
      <div className="entrance-text-layer absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-3d-matte text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tighter drop-shadow-md">
          {tagline2}
        </h1>
      </div>

      {/* PHASE 6 LAYER: FINAL CALL TO ACTION */}
      <div className="final-cta-layer absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
          {ctaHeading}
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a href="#" className="btn-modern-light flex items-center justify-center gap-3 px-10 py-5 rounded-full group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            <div className="text-xl font-bold leading-none tracking-tight">Solicitar proposta</div>
            <svg className="w-5 h-5 ml-2 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* PHASE 2-3-7 LAYER: THE ANIMATED CARD */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="animated-card-container premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          {/* PHASE 4-5 LAYER: SHOWCASE CONTENT */}
          <div
            className={cn(
              "showcase-content-layer relative w-full h-full z-10",
              showcaseInteractive ? "interactable-showcase" : "locked-showcase"
            )}
          >
            <FullScreenScrollFX
              embedded
              currentIndex={fxIndex}
              apiRef={fxApiRef}
              showProgress
              durations={{ change: 0.6 }}
              header={
                <>
                  <span style={{ fontSize: "clamp(0.55rem, 1vw, 0.9rem)", letterSpacing: "0.4em", opacity: 0.5, marginBottom: "0.5rem" }}>UTOPIA STUDIO</span>
                  <span>LANDINGS · SAAS · APPS</span>
                  <span style={{ fontSize: "clamp(0.65rem, 1.6vw, 1rem)", letterSpacing: "0.2em", opacity: 0.65, marginTop: "0.35rem" }}>ENTREGA RÁPIDA · PADRÃO ALTO</span>
                </>
              }
              sections={FX_SECTIONS}
              colors={{
                text: "rgba(245,245,245,0.93)",
                overlay: "rgba(15, 5, 40, 0.65)",
                stageBg: "#0a0520",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
