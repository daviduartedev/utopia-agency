"use client";

import { cn } from "./utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── TypewriterEffect (char-by-char staggered, one-shot) ─────────────────────

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" }
      );
    }
  }, [isInView]);

  const renderWords = () => (
    <motion.div ref={scope} className="inline">
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <motion.span
              initial={{}}
              key={`char-${index}`}
              className={cn("opacity-0 hidden", word.className)}
            >
              {char}
            </motion.span>
          ))}
          &nbsp;
        </div>
      ))}
    </motion.div>
  );

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      />
    </div>
  );
};

// ─── Timing constants ─────────────────────────────────────────────────────────
//
//  Cycle breakdown (~5.6 s total):
//    TYPE     1.6 s  — linear reveal left → right
//    HOLD     2.8 s  — pause so the reader can absorb the text
//    ERASE    0.9 s  — faster than typing (backspace feel)
//    RESTART  0.35 s — short breath before next loop
//
const TYPE_DURATION  = 1.6;   // seconds
const HOLD_MS        = 2800;  // ms
const ERASE_DURATION = 0.9;   // seconds
const RESTART_MS     = 350;   // ms

type Phase = "waiting" | "typing" | "holding" | "erasing";

// ─── TypewriterEffectSmooth (looping CSS-width reveal) ───────────────────────

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  textClassName,
  delay = 0.4,
  duration = TYPE_DURATION,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
  /** Classes applied to the inner text wrapper (font size, gradient, etc.) */
  textClassName?: string;
  /** Seconds before the first run (default 0.4) */
  delay?: number;
  /** Seconds for the type-reveal (default 1.6) */
  duration?: number;
}) => {
  const [phase, setPhase] = useState<Phase>("waiting");

  // Ref so onAnimationComplete never closes over a stale phase
  const phaseRef = useRef<Phase>("waiting");
  phaseRef.current = phase;

  // Guard against setState after unmount
  const mountedRef = useRef(true);
  useEffect(() => () => { mountedRef.current = false; }, []);

  const safe = (fn: () => void) => { if (mountedRef.current) fn(); };

  // ── State machine timeouts ──────────────────────────────────────────────────
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (phase === "waiting") {
      id = setTimeout(() => safe(() => setPhase("typing")), delay * 1000);
    }
    if (phase === "holding") {
      id = setTimeout(() => safe(() => setPhase("erasing")), HOLD_MS);
    }
    return () => clearTimeout(id);
  }, [phase, delay]);

  // Called by Motion when each animation finishes
  const handleComplete = () => {
    const p = phaseRef.current;
    if (p === "typing")  safe(() => setPhase("holding"));
    if (p === "erasing") setTimeout(() => safe(() => setPhase("typing")), RESTART_MS);
  };

  // ── Derived motion values ───────────────────────────────────────────────────
  const isVisible = phase === "typing" || phase === "holding";
  const isErasing  = phase === "erasing";

  const animateTarget = isVisible ? { width: "fit-content" } : { width: "0%" };

  const animTransition = {
    duration : phase === "typing"  ? duration       :
               phase === "erasing" ? ERASE_DURATION : 0,
    ease     : phase === "typing"  ? "linear" : "easeIn",
  } as const;

  // Cursor blinks slowly while typing/holding; flickers rapidly while erasing
  const cursorAnimate    = isErasing ? { opacity: [1, 0] } : { opacity: [1, 0] };
  const cursorTransition = {
    duration    : isErasing ? 0.1 : 0.55,
    repeat      : Infinity,
    repeatType  : "reverse" as const,
  };

  // ── Rendering ───────────────────────────────────────────────────────────────
  const hasCustomText = Boolean(textClassName);

  const renderWords = () => (
    <div>
      {words.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.split("").map((char, i) => (
            <span
              key={`char-${i}`}
              className={cn(
                !hasCustomText && "dark:text-white text-black",
                word.className
              )}
            >
              {char}
            </span>
          ))}
          &nbsp;
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("flex items-end space-x-1", className)}>
      {/* ── Reveal container ─────────────────────────────────────────────── */}
      <motion.div
        className="overflow-hidden pb-1"
        style={{ width: "0%" }}           /* hard initial — avoids flash */
        animate={animateTarget}
        transition={animTransition}
        onAnimationComplete={handleComplete}
      >
        <div
          className={cn(
            "font-bold",
            hasCustomText
              ? textClassName
              : "text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl dark:text-white text-black"
          )}
          style={{ whiteSpace: "nowrap" }}
        >
          {renderWords()}
        </div>
      </motion.div>

      {/* ── Blinking cursor ──────────────────────────────────────────────── */}
      <motion.span
        animate={cursorAnimate}
        transition={cursorTransition}
        className={cn(
          "block rounded-sm w-[4px] bg-[#d946ef] mb-1",
          cursorClassName
        )}
      />
    </div>
  );
};
