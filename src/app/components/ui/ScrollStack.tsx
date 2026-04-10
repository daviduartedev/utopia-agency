import {
  useLayoutEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

/** Layout Y in document space (ignores transforms — avoids scroll jitter). */
function getDocumentLayoutTop(el: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

export function ScrollStackItem({
  children,
  itemClassName = "",
}: {
  children: ReactNode;
  itemClassName?: string;
}) {
  return (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
  );
}

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  /** Applied to the inner scroll content wrapper (e.g. flex + items-center). */
  innerClassName?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
};

function ScrollStack({
  children,
  className = "",
  innerClassName = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(
    new Map<
      number,
      { translateY: number; scale: number; rotation: number; blur: number }
    >()
  );
  const isUpdatingRef = useRef(false);
  /** Stable layout positions (px). Window: document Y. Nested: offset from inner top. */
  const cardLayoutTopsRef = useRef<number[]>([]);
  const endLayoutTopRef = useRef(0);

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return (scrollTop - start) / (end - start);
    },
    []
  );

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * containerHeight;
      }
      return typeof value === "number" ? value : parseFloat(String(value));
    },
    []
  );

  const getScrollData = useCallback(() => {
    const lenis = lenisRef.current;
    if (useWindowScroll) {
      return {
        scrollTop: lenis ? lenis.scroll : window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement,
      };
    }
    const scroller = scrollerRef.current;
    if (!scroller) {
      return {
        scrollTop: 0,
        containerHeight: 0,
        scrollContainer: document.documentElement,
      };
    }
    return {
      scrollTop: lenis ? lenis.scroll : scroller.scrollTop,
      containerHeight: scroller.clientHeight,
      scrollContainer: scroller,
    };
  }, [useWindowScroll]);

  const refreshLayoutMetrics = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const cards = cardsRef.current;
    const inner = root.querySelector(".scroll-stack-inner");
    const endEl = root.querySelector(".scroll-stack-end") as HTMLElement | null;

    if (!cards.length) {
      cardLayoutTopsRef.current = [];
      endLayoutTopRef.current = 0;
      return;
    }

    if (useWindowScroll) {
      cardLayoutTopsRef.current = cards.map((c) => getDocumentLayoutTop(c));
      endLayoutTopRef.current = endEl ? getDocumentLayoutTop(endEl) : 0;
      return;
    }

    if (!inner) return;
    const innerEl = inner as HTMLElement;
    const innerTop = getDocumentLayoutTop(innerEl);
    cardLayoutTopsRef.current = cards.map(
      (c) => getDocumentLayoutTop(c) - innerTop
    );
    endLayoutTopRef.current = endEl
      ? getDocumentLayoutTop(endEl) - innerTop
      : 0;
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElementTop = endLayoutTopRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardLayoutTopsRef.current[i];
      if (cardTop === undefined) return;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jTop = cardLayoutTopsRef.current[j];
          if (jTop === undefined) continue;
          const jTriggerStart = jTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY),
        scale: Math.round(scale * 10000) / 10000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) >= 0.5 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0005 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.05;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.transform = transform;
        card.style.filter =
          blurAmount > 0 && newTransform.blur > 0
            ? `blur(${newTransform.blur}px)`
            : "";

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 0.55,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.22,
        syncTouch: true,
        syncTouchLerp: 0.12,
        wheelMultiplier: 1.12,
      });

      lenis.on("scroll", handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
    const scroller = scrollerRef.current;
    if (!scroller) return null;

    const inner = scroller.querySelector(".scroll-stack-inner");
    if (!inner) return null;

    const lenis = new Lenis({
      wrapper: scroller,
      content: inner as HTMLElement,
      duration: 0.55,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 1.12,
      lerp: 0.22,
      syncTouch: true,
      syncTouchLerp: 0.12,
    });

    lenis.on("scroll", handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>(".scroll-stack-card")
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange =
        blurAmount > 0 ? "transform, filter" : "transform";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
    });

    refreshLayoutMetrics();

    const innerEl = scroller.querySelector(".scroll-stack-inner");

    const syncAfterLayout = () => {
      refreshLayoutMetrics();
      requestAnimationFrame(() => updateCardTransforms());
    };

    const ro = new ResizeObserver(syncAfterLayout);
    if (innerEl) ro.observe(innerEl);

    const onWinResize = () => syncAfterLayout();
    window.addEventListener("resize", onWinResize, { passive: true });

    setupLenis();
    updateCardTransforms();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onWinResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardLayoutTopsRef.current = [];
      endLayoutTopRef.current = 0;
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    refreshLayoutMetrics,
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className={`scroll-stack-inner ${innerClassName}`.trim()}>
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}

export default ScrollStack;
