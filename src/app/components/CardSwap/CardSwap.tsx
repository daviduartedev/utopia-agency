"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import type { HTMLAttributes, MouseEvent, ReactElement, ReactNode } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "../../lib/motion-pref";
import { cn } from "../ui/utils";
import "./CardSwap.css";

export type CardProps = HTMLAttributes<HTMLDivElement> & { customClass?: string };

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { customClass, className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn("card", customClass, className)} {...rest} />;
});
Card.displayName = "Card";

type Easing = "elastic" | "linear";

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (
  el: HTMLDivElement | null,
  slot: ReturnType<typeof makeSlot>,
  skew: number,
) => {
  if (!el) return;
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

function getEasingConfig(easing: Easing) {
  return easing === "elastic"
    ? {
        ease: "elastic.out(0.6,0.9)" as const,
        durDrop: 2,
        durMove: 2,
        durReturn: 2,
        promoteOverlap: 0.9,
        returnDelay: 0.05,
      }
    : {
        ease: "power1.inOut" as const,
        durDrop: 0.8,
        durMove: 0.8,
        durReturn: 0.8,
        promoteOverlap: 0.45,
        returnDelay: 0.2,
      };
}

export type CardSwapProps = HTMLAttributes<HTMLDivElement> & {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  onFrontIndexChange?: (childIndex: number) => void;
  skewAmount?: number;
  easing?: Easing;
  children: ReactNode;
};

const defaultWidth = 500;
const defaultHeight = 400;

const CardSwap = forwardRef<HTMLDivElement, CardSwapProps>(function CardSwap(
  {
    width = defaultWidth,
    height = defaultHeight,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    onFrontIndexChange,
    skewAmount = 6,
    easing = "elastic",
    className,
    style: rootStyle,
    children,
    ...rest
  },
  ref,
) {
  const reduced = usePrefersReducedMotion();
  const onFrontRef = useRef(onFrontIndexChange);
  onFrontRef.current = onFrontIndexChange;
  const childArr = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );
  const n = childArr.length;
  const refs = useMemo(
    () => Array.from({ length: n }, () => ({ current: null as HTMLDivElement | null })),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tamanho da lista
    [n],
  );
  const order = useRef<number[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const config = useMemo(() => getEasingConfig(easing), [easing]);

  useLayoutEffect(() => {
    if (n < 1) {
      order.current = [];
      return;
    }
    if (order.current.length !== n) {
      order.current = Array.from({ length: n }, (_, i) => i);
    }
    for (let i = 0; i < n; i++) {
      const el = refs[i].current;
      if (el) {
        placeNow(el, makeSlot(i, cardDistance, verticalDistance, n), skewAmount);
      }
    }
    onFrontRef.current?.(order.current[0] ?? 0);
  }, [n, cardDistance, verticalDistance, skewAmount, refs]);

  useEffect(() => {
    if (n < 1) return;
    if (reduced) return;
    if (n < 2) {
      return;
    }

    const clearTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const swap = () => {
      if (order.current.length < 2) return;
      const o = order.current;
      const [front, ...rest] = o;
      const elFront = refs[front].current;
      if (!elFront) return;
      const tl = gsap.timeline();
      tlRef.current = tl;
      const total = n;

      tl.to(elFront, { y: "+=500", duration: config.durDrop, ease: config.ease });
      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );
      tl.call(() => {
        order.current = [...rest, front];
        onFrontRef.current?.(order.current[0] ?? 0);
      });
    };

    clearTimer();
    if (delay > 0) {
      intervalRef.current = setInterval(swap, delay);
    }

    if (pauseOnHover) {
      const node = container.current;
      if (!node) {
        return () => {
          clearTimer();
          tlRef.current?.kill();
        };
      }
      const pause = () => {
        tlRef.current?.pause();
        clearTimer();
      };
      const resume = () => {
        tlRef.current?.play();
        if (delay > 0) {
          intervalRef.current = setInterval(swap, delay);
        }
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearTimer();
        tlRef.current?.kill();
      };
    }

    return () => {
      clearTimer();
      tlRef.current?.kill();
    };
  }, [
    n,
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    config,
    reduced,
    refs,
  ]);

  if (n === 0) {
    return null;
  }

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) {
      return null;
    }
    return cloneElement(child, {
      key: child.key ?? i,
      ref: (el: HTMLDivElement | null) => {
        refs[i].current = el;
        const o = (child as ReactElement & { ref?: unknown }).ref;
        if (typeof o === "function") (o as (e: HTMLDivElement | null) => void)(el);
        else if (o && typeof o === "object" && "current" in o)
          (o as { current: HTMLDivElement | null }).current = el;
      },
      style: { width, height, ...(child.props as { style?: object }).style },
      onClick: (e: MouseEvent<HTMLDivElement>) => {
        (child as ReactElement<{ onClick?: (e: MouseEvent<HTMLDivElement>) => void }>).props.onClick?.(e);
        onCardClick?.(i);
      },
    } as { ref?: never; key?: string | number | null | undefined; style: object; onClick: (e: MouseEvent<HTMLDivElement>) => void });
  });

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Trabalhos selecionados"
      className={cn("relative flex w-full justify-center", className)}
      style={rootStyle}
      {...rest}
    >
      <div ref={container} className="card-swap-container" style={{ width, height }}>
        {rendered}
      </div>
    </div>
  );
});
CardSwap.displayName = "CardSwap";

export default CardSwap;
export type CardSwapEasing = Easing;
