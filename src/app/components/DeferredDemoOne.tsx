"use client";

import { useEffect, useState } from "react";
import DemoOne from "./DemoOne";

/**
 * Adia o balão flutuante para não competir com hero + scroll no primeiro paint (mobile).
 */
export function DeferredDemoOne() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const reveal = () => setShow(true);

    if (narrow) {
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(reveal, { timeout: 2800 });
        return () => window.cancelIdleCallback(id);
      }
      const t = window.setTimeout(reveal, 1600);
      return () => window.clearTimeout(t);
    }

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(reveal, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(reveal, 500);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;
  return <DemoOne />;
}
