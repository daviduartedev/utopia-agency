// src/app/components/ui/cinematic-hero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "./utils";
import Orb from "./Orb";

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .text-3d-matte {
      color: #ffffff;
      text-shadow:
          0 10px 30px rgba(255, 255, 255, 0.2),
          0 2px 4px rgba(255, 255, 255, 0.1);
  }

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
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  tagline1 = "Produto digital",
  tagline2 = "pronto para vender.",
  ctaDescription = "Agência focada em landings, sistemas SaaS e aplicativos: briefing objetivo, prazos curtos e entrega eficiente — sem abrir mão de acabamento premium.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".text-track", {
        autoAlpha: 0,
        y: 60,
        scale: 0.85,
        filter: "blur(20px)",
        rotationX: -20,
      });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".final-cta-layer", {
        autoAlpha: 0,
        y: 40,
        filter: "blur(16px)",
      });

      const tl = gsap.timeline({ delay: 0.35, defaults: { ease: "power3.out" } });
      tl.to(".text-track", {
        duration: 1.6,
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        rotationX: 0,
        ease: "expo.out",
      })
        .to(
          ".text-days",
          {
            duration: 1.2,
            clipPath: "inset(0 0% 0 0)",
            ease: "power4.inOut",
          },
          "-=0.9"
        )
        .to(
          ".entrance-text-layer",
          {
            autoAlpha: 0,
            y: -28,
            filter: "blur(12px)",
            duration: 0.85,
            ease: "power2.inOut",
          },
          "+=0.35"
        )
        .fromTo(
          ".final-cta-layer",
          { autoAlpha: 0, y: 36, filter: "blur(16px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-transparent text-foreground font-sans antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex min-h-[100dvh] w-full flex-col items-center overflow-hidden bg-black pb-4 pt-[clamp(5rem,12vh,7.5rem)] md:pt-[clamp(5.5rem,11vh,8rem)]">
        <div className="relative mx-auto h-[min(94vw,calc(100dvh-8rem))] w-[min(94vw,calc(100dvh-8rem))] shrink-0 bg-black pointer-events-auto">
          <Orb
            hoverIntensity={2}
            rotateOnHover
            hue={0}
            forceHoverState={false}
            backgroundColor="#000000"
          />
        </div>
      </div>
      <div className="film-grain" aria-hidden="true" />

      <div className="entrance-text-layer absolute inset-0 z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform transform-style-3d">
        <div className="flex flex-col items-center justify-center -translate-y-[min(3.5vh,2rem)] sm:-translate-y-[4vh]">
          <h1 className="text-track gsap-reveal text-3d-matte text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight mb-2">
            {tagline1}
          </h1>
          <h1 className="text-days gsap-reveal text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tighter drop-shadow-md">
            {tagline2}
          </h1>
        </div>
      </div>

      <div className="final-cta-layer absolute inset-0 z-10 flex w-full flex-col items-center justify-center px-4 text-center gsap-reveal pointer-events-auto will-change-transform">
        <div className="flex flex-col items-center justify-center w-full max-w-4xl -translate-y-[min(3.5vh,2rem)] sm:-translate-y-[4vh]">
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="block">{tagline1}</span>
            <span className="block">{tagline2}</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="#contato"
              className="btn-modern-light flex items-center justify-center gap-3 px-10 py-5 rounded-full group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black/80"
            >
              <div className="text-xl font-bold leading-none tracking-tight">
                Solicitar proposta
              </div>
              <svg
                className="w-5 h-5 ml-2 text-purple-600 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
