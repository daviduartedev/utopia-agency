"use client";

import { useEffect, useState } from "react";
import DemoOne from "./DemoOne";

function isDesktopViewport(): boolean {
  return typeof window !== "undefined"
    ? !window.matchMedia("(max-width: 767px)").matches
    : true;
}

/**
 * Desktop: balão imediato. Celular: adia até idle para não competir com o primeiro paint.
 */
export function DeferredDemoOne() {
  const [show, setShow] = useState(isDesktopViewport);

  useEffect(() => {
    if (isDesktopViewport()) {
      setShow(true);
      return;
    }

    const reveal = () => setShow(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(reveal, { timeout: 2800 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(reveal, 1600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => {
      if (!mql.matches) setShow(true);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (!show) return null;
  return <DemoOne />;
}
