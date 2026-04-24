"use client";

/**
 * Preloader — inspiração KPR.
 *
 * Fases:
 *  1) "booting": fundo branco + HUD técnico (LOADING 0→100%, URL scroller,
 *     crosshair, CLICK TO ENABLE SOUND, SCROLL indicador).
 *  2) "reveal":  logotipo UTOPIA entra por filtro goo (metaball leve em SVG)
 *     + stroke draw; letras se condensam até ficarem sólidas.
 *  3) "portal":  uma faixa vertical central se abre, revelando o hero atrás.
 *  4) "done":    preloader desmonta.
 *
 * A lógica de progresso é sintética (animação time-based com easing),
 * independente do carregamento real de assets — o objetivo é cinemático.
 * Respeita prefers-reduced-motion e tem sessionStorage opt-out.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/motion-pref";

type Phase = "booting" | "reveal" | "portal" | "done";

const URL_SEGMENTS = [
  "KAI-14/REACTOR/ISOTOPE-C/43LK2L",
  "KAI-14/REACTOR/ISOTOPE-B/4GHBZ",
  "AREA-SCAN/MOUNTAIN/DATA/",
  "CORE/BRANDS/UTOPIA/SHIP-01",
  "PIPELINE/RENDER/PASS-02",
  "BUILD/PROD/CHUNK-7F2A",
  "DEPLOY/REGION/BR-SA/EDGE",
];

const DURATION_MS = 3800; // 0→100% load fake
const REVEAL_HOLD_MS = 900; // tempo do reveal do logo antes do portal
const PORTAL_MS = 900; // duração da abertura do portal

interface PreloaderProps {
  /** Se true, ignora sessionStorage e força exibir (útil pra debug). */
  force?: boolean;
  /** Texto do wordmark revelado. Default "UTOPIA". */
  wordmark?: string;
  onDone?: () => void;
}

export function Preloader({ force = false, wordmark = "UTOPIA", onDone }: PreloaderProps) {
  const reduced = usePrefersReducedMotion();

  // Se reduced-motion, pula direto para "done" sem render.
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === "undefined") return "booting";
    if (reduced) return "done";
    if (!force && sessionStorage.getItem("utopia.preloader.shown") === "1") return "done";
    return "booting";
  });

  const [progress, setProgress] = useState(0);
  const [urlIndex, setUrlIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Respeita reduced-motion: se o flag mudar depois de montar, finaliza.
  useEffect(() => {
    if (reduced && phase !== "done") {
      setPhase("done");
    }
  }, [reduced, phase]);

  // Loop principal de progresso (fase booting).
  useEffect(() => {
    if (phase !== "booting") return;

    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const raw = Math.min(1, elapsed / DURATION_MS);
      // easeOutExpo — rápido no início, segura no final
      const eased = raw === 1 ? 1 : 1 - Math.pow(2, -10 * raw);
      setProgress(Math.floor(eased * 100));

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("reveal");
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  // Rotação do URL scroller (mais rápido no começo, desacelera).
  useEffect(() => {
    if (phase !== "booting") return;
    let alive = true;
    const rotate = (delay: number) => {
      if (!alive) return;
      window.setTimeout(() => {
        if (!alive) return;
        setUrlIndex((i) => (i + 1) % URL_SEGMENTS.length);
        // delay cresce conforme progresso sobe
        const next = 180 + Math.min(400, progress * 6);
        rotate(next);
      }, delay);
    };
    rotate(200);
    return () => {
      alive = false;
    };
  }, [phase, progress]);

  // Transição reveal → portal → done
  useEffect(() => {
    if (phase === "reveal") {
      const t = window.setTimeout(() => setPhase("portal"), REVEAL_HOLD_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === "portal") {
      const t = window.setTimeout(() => setPhase("done"), PORTAL_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === "done") {
      try {
        sessionStorage.setItem("utopia.preloader.shown", "1");
      } catch {}
      onDone?.();
    }
  }, [phase, onDone]);

  if (phase === "done") return null;

  return (
    <PreloaderView
      phase={phase}
      progress={progress}
      urlLabel={URL_SEGMENTS[urlIndex]}
      wordmark={wordmark}
      soundEnabled={soundEnabled}
      onToggleSound={() => setSoundEnabled((s) => !s)}
    />
  );
}

function PreloaderView(props: {
  phase: Phase;
  progress: number;
  urlLabel: string;
  wordmark: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
}) {
  const { phase, progress, urlLabel, wordmark, soundEnabled, onToggleSound } = props;
  const progressLabel = String(progress).padStart(3, "0");
  const showWordmark = phase === "reveal" || phase === "portal";
  const portalOpen = phase === "portal";

  // Build a random cluster of blob offsets used during reveal (stable per mount).
  const blobSeeds = useMemo(
    () => Array.from({ length: 14 }, () => ({
      x: (Math.random() * 2 - 1) * 48,
      y: (Math.random() * 2 - 1) * 24,
      s: 0.5 + Math.random() * 0.9,
      d: Math.random() * 0.35,
    })),
    [],
  );

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-white text-black"
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        // fade-out do container como um todo já foi terminado pelo phase "done"
      }}
      aria-hidden={phase !== "booting"}
      role="status"
    >
      {/* PORTAL — duas metades que se abrem para cima/baixo */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-x-0 top-0 bg-white transition-transform duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
          style={{
            height: "50%",
            transform: portalOpen ? "translateY(-100%)" : "translateY(0)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 bg-white transition-transform duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
          style={{
            height: "50%",
            transform: portalOpen ? "translateY(100%)" : "translateY(0)",
          }}
        />
      </div>

      {/* Conteúdo técnico da fase booting fica "escondido atrás" do portal
          mas como bg do portal é branco puro, só precisamos escondê-lo no reveal/portal. */}
      {phase === "booting" && (
        <BootingHUD
          progress={progress}
          progressLabel={progressLabel}
          urlLabel={urlLabel}
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
        />
      )}

      {/* REVEAL do wordmark — aparece a partir do fim do booting */}
      {showWordmark && (
        <WordmarkReveal word={wordmark} blobSeeds={blobSeeds} animating={phase === "reveal"} />
      )}

      {/* SVG filtro goo */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="utopia-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function BootingHUD(props: {
  progress: number;
  progressLabel: string;
  urlLabel: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
}) {
  const { progress, progressLabel, urlLabel, soundEnabled, onToggleSound } = props;

  return (
    <>
      {/* Crosshair esquerdo (meio vertical) */}
      <div
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2"
        aria-hidden
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="14" cy="14" r="3" />
          <path d="M14 0v8M14 20v8M0 14h8M20 14h28" />
        </svg>
      </div>

      {/* Botão CLICK TO ENABLE SOUND (canto superior direito) */}
      <button
        onClick={onToggleSound}
        className="absolute right-6 top-6 flex flex-col items-center gap-1 text-[10px] tracking-[0.22em] text-black/70 hover:text-black"
        type="button"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/50">
          {soundEnabled ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4l5-4v24l-5-4H6z" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </span>
        <span>{soundEnabled ? "SOUND ON" : "CLICK TO ENABLE SOUND"}</span>
      </button>

      {/* Barra de loading centralizada */}
      <div className="absolute left-1/2 top-1/2 w-[min(720px,78vw)] -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-px w-full bg-black/15"
          aria-hidden
        >
          <div
            className="h-px bg-black"
            style={{
              width: `${progress}%`,
              transition: "width 90ms linear",
            }}
          />
        </div>
        <div className="mt-3 flex items-baseline justify-between text-[11px] tracking-[0.22em]">
          <span>» LOADING — {progressLabel}%</span>
          <span className="text-black/60">HTTPS://UTOPIA.APP.BR/{urlLabel}</span>
        </div>
      </div>

      {/* Scroll indicator inferior direito */}
      <div className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-2 text-[10px] tracking-[0.22em] text-black/60">
        <span>SCROLL</span>
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="1" y="1" width="8" height="12" rx="4" />
          <line x1="5" y1="3" x2="5" y2="6">
            <animate attributeName="y1" values="3;6;3" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="y2" values="6;9;6" dur="1.4s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      {/* Labels técnicos decorativos (rodapé) */}
      <div className="pointer-events-none absolute bottom-6 left-6 flex gap-4 text-[10px] tracking-[0.22em] text-black/40">
        <span>UTOPIA/</span>
        <span>NODE-01</span>
        <span>R30</span>
      </div>
    </>
  );
}

function WordmarkReveal(props: {
  word: string;
  blobSeeds: { x: number; y: number; s: number; d: number }[];
  animating: boolean;
}) {
  const { word, blobSeeds, animating } = props;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative" style={{ filter: "url(#utopia-goo)" }}>
        {/* letras finais sólidas */}
        <span
          className="relative z-10 inline-block text-black"
          style={{
            fontFamily: "var(--font-display, ui-sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(3.5rem, 14vw, 11rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {word}
        </span>

        {/* blobs orbitando o wordmark (condensam em direção ao centro) */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {blobSeeds.map((b, i) => (
            <span
              key={i}
              className="absolute block rounded-full bg-black"
              style={{
                left: "50%",
                top: "50%",
                width: `${24 * b.s}px`,
                height: `${24 * b.s}px`,
                transform: animating
                  ? `translate(calc(-50% + ${b.x * 6}px), calc(-50% + ${b.y * 6}px))`
                  : "translate(-50%, -50%)",
                opacity: animating ? 0 : 1,
                transition: `transform 700ms cubic-bezier(0.22,0.65,0.36,1) ${b.d}s, opacity 500ms ease ${b.d}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preloader;
