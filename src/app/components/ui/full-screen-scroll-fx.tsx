import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
};

type Colors = Partial<{
  text: string;
  overlay: string;
  pageBg: string;
  stageBg: string;
}>;

type Durations = Partial<{
  change: number;
  snap: number;
}>;

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;

  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;
  gap?: number;
  gridPaddingX?: number;
  showProgress?: boolean;

  durations?: Durations;
  reduceMotion?: boolean;

  bgTransition?: "fade" | "wipe";
  parallaxAmount?: number;

  // ── Controlled mode ──────────────────────────────────────────────────────
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;

  // ── Embedded: fills parent, no internal ScrollTrigger ────────────────────
  embedded?: boolean;

  colors?: Colors;
  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

// ─── Injected styles (no styled-jsx dependency) ───────────────────────────────
const FX_CSS = `
  .fx-root {
    font-family: var(--fx-font);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    overflow: hidden;
  }

  /* Backgrounds */
  .fx-bgs { position: absolute; inset: 0; background: var(--fx-stage-bg); z-index: 1; }
  .fx-bg  { position: absolute; inset: 0; }
  .fx-bg-img {
    position: absolute; inset: -10% 0 -10% 0;
    width: 100%; height: 120%; object-fit: cover;
    filter: brightness(0.75);
    opacity: 0;
    will-change: transform, opacity;
  }
  .fx-bg-overlay { position: absolute; inset: 0; background: var(--fx-overlay); }

  /* Grid */
  .fx-grid {
    position: relative; z-index: 2;
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%; height: 100%;
    padding: 0 var(--fx-grid-px);
    box-sizing: border-box;
  }

  .fx-header {
    position: absolute;
    top: 8vh;
    left: 0;
    right: 0;
    font-size: clamp(1.5rem, 4vw, 3.5rem);
    font-weight: 400;
    letter-spacing: 0.15em;
    text-align: center;
    color: var(--fx-text);
    opacity: 0.9;
    z-index: 10;
  }
  .fx-header > span { display: block; line-height: 1.1; }

  /* Content row */
  .fx-content {
    display: grid;
    grid-template-columns: 1fr 1.3fr 1fr;
    align-items: center;
    height: 100%;
    overflow: hidden;
  }

  /* Side lists */
  .fx-list {
    height: 60vh;
    overflow: hidden;
    display: grid;
    align-content: center;
    align-self: center;
    pointer-events: none;
  }
  .fx-list-left  { justify-items: start; }
  .fx-list-right { justify-items: end; }
  .fx-track {
    will-change: transform;
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .fx-item {
    color: var(--fx-text);
    font-weight: 800;
    letter-spacing: 0em;
    line-height: 1;
    margin: 5px 0;
    opacity: 0.35;
    position: relative;
    font-size: clamp(0.9rem, 2vw, 1.7rem);
    user-select: none;
    cursor: pointer;
    transition: opacity 0.3s ease;
    white-space: nowrap;
  }
  .fx-item.active { opacity: 1; }
  .fx-item-l.active::before {
    content: "•";
    position: absolute; left: -1.5rem; top: 50%; transform: translateY(-50%);
    font-size: 1.2rem;
  }
  .fx-item-r.active::after {
    content: "•";
    position: absolute; right: -1.5rem; top: 50%; transform: translateY(-50%);
    font-size: 1.2rem;
  }

  /* Center */
  .fx-center {
    display: grid;
    place-items: center;
    text-align: center;
    height: 60vh;
    overflow: hidden;
    position: relative;
  }
  .fx-featured {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .fx-featured.active { opacity: 1; visibility: visible; }
  .fx-featured-title {
    margin: 0;
    color: var(--fx-text);
    font-weight: 900;
    letter-spacing: -0.01em;
    font-size: clamp(2.5rem, 8vw, 7rem);
    line-height: 1;
  }
  .fx-word-mask { display: inline-block; overflow: hidden; vertical-align: middle; }
  .fx-word      { display: inline-block; vertical-align: middle; }

  /* Footer / pagination line */
  .fx-footer {
    position: absolute;
    bottom: 5vh;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .fx-pagination-wrap {
    display: flex;
    align-items: center;
    gap: 20px;
    color: var(--fx-text);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    opacity: 0.7;
  }
  .fx-pagination-line {
    width: 80px;
    height: 1px;
    background: rgba(255,255,255,0.2);
    position: relative;
  }
  .fx-pagination-fill {
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 0%;
    background: var(--fx-text);
    transition: width 0.4s ease;
  }

  /* Nav buttons - split to corners */
  .fx-nav-prev, .fx-nav-next {
    position: absolute;
    bottom: 4vh;
    z-index: 10;
  }
  .fx-nav-prev { left: var(--fx-grid-px); }
  .fx-nav-next { right: var(--fx-grid-px); }

  .fx-nav-btn {
    width: 38px; height: 38px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.8);
    display: grid; place-items: center;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .fx-nav-btn:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.4); }
  .fx-nav-btn:disabled { opacity: 0.2; cursor: default; }

  /* Mobile */
  @media (max-width: 800px) {
    .fx-content { grid-template-columns: 1fr; place-items: center; }
    .fx-list { height: auto; }
    .fx-list .fx-track { display: flex; gap: 14px; }
    .fx-list .fx-item  { font-size: 0.65rem; margin: 0; }
    .fx-center { height: 25vh; }
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,
      fontFamily = '"Inter", system-ui, sans-serif',
      header,
      footer,
      gap = 1,
      gridPaddingX = 2,
      showProgress = true,
      durations = { change: 0.65 },
      reduceMotion,
      bgTransition = "fade",
      parallaxAmount = 4,
      currentIndex,
      onIndexChange,
      initialIndex = 0,
      embedded = false,
      colors = {
        text: "rgba(245,245,245,0.92)",
        overlay: "rgba(0,0,0,0.40)",
        pageBg: "transparent",
        stageBg: "#050310",
      },
      apiRef,
      ariaLabel = "Fullscreen scroll showcase",
    },
    ref
  ) => {
    const total = sections.length;
    const isControlled = typeof currentIndex === "number";

    const [localIndex, setLocalIndex] = useState(
      clamp(initialIndex, 0, Math.max(0, total - 1))
    );
    const activeIndex = isControlled
      ? clamp(currentIndex!, 0, Math.max(0, total - 1))
      : localIndex;

    const rootRef = useRef<HTMLDivElement | null>(null);

    // Standalone-mode refs
    const fixedSectionRef = useRef<HTMLDivElement | null>(null);
    const fixedRef        = useRef<HTMLDivElement | null>(null);

    // Shared animation refs
    const bgRefs        = useRef<HTMLImageElement[]>([]);
    const wordRefs      = useRef<HTMLSpanElement[][]>([]);
    const leftTrack     = useRef<HTMLDivElement | null>(null);
    const rightTrack    = useRef<HTMLDivElement | null>(null);
    const leftItems     = useRef<HTMLDivElement[]>([]);
    const rightItems    = useRef<HTMLDivElement[]>([]);
    const progressFill  = useRef<HTMLDivElement | null>(null);
    const progressNum   = useRef<HTMLSpanElement | null>(null);

    const lastIdx   = useRef(activeIndex);
    const animating = useRef(false);
    const transitionCompleteDelayRef = useRef<gsap.core.Tween | null>(null);

    /** Kill in-flight transition tweens so controlled (scroll-driven) index changes are not dropped. */
    const killActiveTransitionTweens = () => {
      const wordEls = wordRefs.current.flat().filter(Boolean) as Element[];
      const bgEls = bgRefs.current.filter(Boolean) as Element[];
      const listEls = [
        leftTrack.current,
        rightTrack.current,
        ...leftItems.current.filter(Boolean),
        ...rightItems.current.filter(Boolean),
      ].filter(Boolean) as Element[];
      gsap.killTweensOf([...wordEls, ...bgEls, ...listEls]);
    };

    // Reduced-motion detection
    const prefersReduced = useMemo(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    }, []);
    const motionOff = reduceMotion ?? prefersReduced;

    // ── Word splitting ────────────────────────────────────────────────────────
    /** Refs must be per-section: a shared bucket breaks because refs attach after render, so only idx 0 received the array. */
    const splitWords = (text: string, sectionIdx: number) => {
      wordRefs.current[sectionIdx] = [];
      return text.split(/\s+/).filter(Boolean).map((w, i, arr) => (
        <span className="fx-word-mask" key={i}>
          <span
            className="fx-word"
            ref={(el) => {
              if (el) wordRefs.current[sectionIdx].push(el);
            }}
          >
            {w}
          </span>
          {i < arr.length - 1 ? " " : null}
        </span>
      ));
    };

    // ── Center list tracks ────────────────────────────────────────────────────
    const centerLists = (toIdx: number, animate: boolean) => {
      [
        { track: leftTrack, items: leftItems },
        { track: rightTrack, items: rightItems },
      ].forEach(({ track, items }) => {
        if (!track.current || !items.current[0]) return;
        const r0 = items.current[0].getBoundingClientRect();
        const r1 = items.current[1]?.getBoundingClientRect();
        const rowH = r1 ? r1.top - r0.top : r0.height + 10;
        const contH = track.current.parentElement?.getBoundingClientRect().height ?? 300;
        const y = contH / 2 - rowH / 2 - toIdx * rowH;
        if (animate) {
          gsap.to(track.current, { y, duration: (durations.change ?? 0.65) * 0.9, ease: "power3.out" });
        } else {
          gsap.set(track.current, { y });
        }
      });
    };

    // ── Core transition ───────────────────────────────────────────────────────
    const changeSection = (to: number) => {
      const toC = clamp(to, 0, total - 1);
      if (toC === lastIdx.current) return;
      if (animating.current) {
        if (!isControlled) return;
        transitionCompleteDelayRef.current?.kill();
        transitionCompleteDelayRef.current = null;
        killActiveTransitionTweens();
        animating.current = false;
      }
      const from = lastIdx.current;
      const down = toC > from;
      animating.current = true;

      if (!isControlled) setLocalIndex(toC);
      onIndexChange?.(toC);

      if (progressNum.current)
        progressNum.current.textContent = String(toC + 1).padStart(2, "0");
      if (progressFill.current)
        progressFill.current.style.width = `${(toC / Math.max(total - 1, 1)) * 100}%`;

      const D = motionOff ? 0 : (durations.change ?? 0.65);

      // words
      const outW = wordRefs.current[from] ?? [];
      const inW  = wordRefs.current[toC] ?? [];
      if (outW.length)
        gsap.to(outW, { yPercent: down ? -100 : 100, opacity: 0, duration: D * 0.55, stagger: down ? 0.03 : -0.03, ease: "power3.out" });
      if (inW.length) {
        gsap.set(inW, { yPercent: down ? 100 : -100, opacity: 0 });
        gsap.to(inW, { yPercent: 0, opacity: 1, duration: D, stagger: down ? 0.05 : -0.05, ease: "power3.out" });
      }

      // backgrounds
      const prevBg = bgRefs.current[from];
      const newBg  = bgRefs.current[toC];
      if (bgTransition === "fade") {
        if (newBg) {
          gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 2 : -2 });
          gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: "power2.out" });
        }
        if (prevBg)
          gsap.to(prevBg, { opacity: 0, yPercent: down ? -parallaxAmount : parallaxAmount, duration: D, ease: "power2.out" });
      } else {
        if (newBg) {
          gsap.set(newBg, { clipPath: down ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", opacity: 1, scale: 1 });
          gsap.to(newBg, { clipPath: "inset(0 0 0 0)", duration: D, ease: "power3.out" });
        }
        if (prevBg) gsap.to(prevBg, { opacity: 0, duration: D * 0.8, ease: "power2.out" });
      }

      // lists
      centerLists(toC, true);
      leftItems.current.forEach((el, i) => {
        el?.classList.toggle("active", i === toC);
        gsap.to(el, { opacity: i === toC ? 1 : 0.35, x: i === toC ? 10 : 0, duration: D * 0.6, ease: "power3.out" });
      });
      rightItems.current.forEach((el, i) => {
        el?.classList.toggle("active", i === toC);
        gsap.to(el, { opacity: i === toC ? 1 : 0.35, x: i === toC ? -10 : 0, duration: D * 0.6, ease: "power3.out" });
      });

      transitionCompleteDelayRef.current = gsap.delayedCall(D, () => {
        lastIdx.current = toC;
        animating.current = false;
        transitionCompleteDelayRef.current = null;
      });
    };

    // ── Imperative API ────────────────────────────────────────────────────────
    useImperativeHandle(apiRef, () => ({
      next:     () => changeSection(lastIdx.current + 1),
      prev:     () => changeSection(lastIdx.current - 1),
      goTo:     (i: number) => changeSection(i),
      getIndex: () => lastIdx.current,
    }));

    // ── React to controlled currentIndex changes ──────────────────────────────
    useEffect(() => {
      if (isControlled && typeof currentIndex === "number") {
        const target = clamp(currentIndex, 0, total - 1);
        if (target !== lastIdx.current) {
          changeSection(target);
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    // ── Mount: initial GSAP states ────────────────────────────────────────────
    useLayoutEffect(() => {
      // Initial background states
      bgRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, i === activeIndex
          ? { opacity: 1, scale: 1, yPercent: 0 }
          : { opacity: 0, scale: 1.04, yPercent: 0 }
        );
      });

      // Initial word states
      wordRefs.current.forEach((words, i) => {
        words?.forEach((w) => gsap.set(w, {
          yPercent: i === activeIndex ? 0 : 100,
          opacity:  i === activeIndex ? 1 : 0,
        }));
      });

      // Initial list states
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          centerLists(activeIndex, false);
          leftItems.current.forEach((el, i) => {
            if (!el) return;
            el.classList.toggle("active", i === activeIndex);
            gsap.fromTo(el,
              { opacity: 0, y: 18 },
              { opacity: i === activeIndex ? 1 : 0.35, y: 0, duration: 0.5, delay: i * 0.06, ease: "power3.out" }
            );
          });
          rightItems.current.forEach((el, i) => {
            if (!el) return;
            el.classList.toggle("active", i === activeIndex);
            gsap.fromTo(el,
              { opacity: 0, y: 18 },
              { opacity: i === activeIndex ? 1 : 0.35, y: 0, duration: 0.5, delay: 0.15 + i * 0.06, ease: "power3.out" }
            );
          });
        });
      });

      // ── Standalone-only: setup ScrollTrigger ─────────────────────────────
      if (embedded || !fixedSectionRef.current || !fixedRef.current) return;

      const st = ScrollTrigger.create({
        trigger: fixedSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: fixedRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          const target = Math.min(total - 1, Math.floor(self.progress * total));
          if (target !== lastIdx.current && !animating.current) {
            changeSection(target);
          }
        },
      });

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(fixedSectionRef.current);

      return () => { st.kill(); ro.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── CSS variables ─────────────────────────────────────────────────────────
    const cssVars: CSSProperties = {
      ["--fx-font"     as string]: fontFamily,
      ["--fx-text"     as string]: colors.text     ?? "rgba(245,245,245,0.92)",
      ["--fx-overlay"  as string]: colors.overlay  ?? "rgba(0,0,0,0.40)",
      ["--fx-stage-bg" as string]: colors.stageBg  ?? "#050310",
      ["--fx-grid-px"  as string]: `${gridPaddingX}rem`,
      ["--fx-gap"      as string]: `${gap}rem`,
    };

    // ── Shared inner layout ───────────────────────────────────────────────────
    const inner = (
      <>
        <style dangerouslySetInnerHTML={{ __html: FX_CSS }} />

        {/* Backgrounds */}
        <div className="fx-bgs" aria-hidden="true">
          {sections.map((s, i) => (
            <div className="fx-bg" key={s.id ?? i}>
              <img
                ref={(el) => { if (el) bgRefs.current[i] = el; }}
                src={s.background}
                alt=""
                className="fx-bg-img"
              />
              <div className="fx-bg-overlay" />
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="fx-grid">
          {header && <div className="fx-header">{header}</div>}

          <div className="fx-content">
            {/* Left */}
            <div className="fx-list fx-list-left" role="list">
              <div className="fx-track" ref={leftTrack}>
                {sections.map((s, i) => (
                  <div
                    key={`L-${s.id ?? i}`}
                    className={`fx-item fx-item-l${i === activeIndex ? " active" : ""}`}
                    ref={(el) => { if (el) leftItems.current[i] = el; }}
                    onClick={() => changeSection(i)}
                    role="button" tabIndex={0} aria-pressed={i === activeIndex}
                    style={{ fontSize: "clamp(0.9rem, 2vw, 1.4rem)" }}
                  >
                    {s.leftLabel}
                  </div>
                ))}
              </div>
            </div>

            {/* Center */}
            <div className="fx-center">
              {sections.map((s, sIdx) => {
                const isStr = typeof s.title === "string";
                return (
                  <div
                    key={`C-${s.id ?? sIdx}`}
                    className={`fx-featured${sIdx === activeIndex ? " active" : ""}`}
                  >
                    <h3 className="fx-featured-title">
                      {isStr ? splitWords(s.title as string, sIdx) : s.title}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Right */}
            <div className="fx-list fx-list-right" role="list">
              <div className="fx-track" ref={rightTrack}>
                {sections.map((s, i) => (
                  <div
                    key={`R-${s.id ?? i}`}
                    className={`fx-item fx-item-r${i === activeIndex ? " active" : ""}`}
                    ref={(el) => { if (el) rightItems.current[i] = el; }}
                    onClick={() => changeSection(i)}
                    role="button" tabIndex={0} aria-pressed={i === activeIndex}
                    style={{ fontSize: "clamp(0.9rem, 2vw, 1.4rem)" }}
                  >
                    {s.rightLabel}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer / Pagination */}
          <div className="fx-footer">
            <div className="fx-pagination-wrap">
              <span ref={progressNum}>{String(activeIndex + 1).padStart(2, "0")}</span>
              <div className="fx-pagination-line">
                <div className="fx-pagination-fill" ref={progressFill} style={{ width: `${((activeIndex + 1) / total) * 100}%` }} />
              </div>
              <span>{String(total).padStart(2, "0")}</span>
            </div>
            {footer}
          </div>
        </div>

          {/* Nav arrows - Split to left/right corners */}
        <div className="fx-nav-prev">
          <button
            className="fx-nav-btn"
            onClick={() => changeSection(lastIdx.current - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5"/>
            </svg>
          </button>
        </div>
        <div className="fx-nav-next">
          <button
            className="fx-nav-btn"
            onClick={() => changeSection(lastIdx.current + 1)}
            disabled={activeIndex === total - 1}
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3l5 5-5 5"/>
            </svg>
          </button>
        </div>
      </>
    );

    // ── EMBEDDED mode: absolute fill, no scroll setup ─────────────────────────
    if (embedded) {
      return (
        <div
          ref={(node) => {
            (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === "function") ref(node!);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={["fx-root", className].filter(Boolean).join(" ")}
          style={{ position: "absolute", inset: 0, ...cssVars, ...style }}
          aria-label={ariaLabel}
        >
          {inner}
        </div>
      );
    }

    // ── STANDALONE mode: creates its own scroll area ───────────────────────────
    return (
      <div
        ref={(node) => {
          (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node!);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["fx-root", className].filter(Boolean).join(" ")}
        style={{ width: "100%", ...cssVars, ...style }}
        aria-label={ariaLabel}
      >
        <div ref={fixedSectionRef} style={{ height: `${(total + 1) * 100}vh`, position: "relative" }}>
          <div ref={fixedRef} style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden" }}>
            {inner}
          </div>
        </div>
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
