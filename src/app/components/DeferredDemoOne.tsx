"use client";

import { useEffect, useState } from "react";
import DemoOne from "./DemoOne";

/**
 * Monta o balão após idle — reduz concorrência com hero, lazy sections e Plasma no desktop.
 */
export function DeferredDemoOne() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reveal = () => setShow(true);
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const timeout = narrow ? 2800 : 1400;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(reveal, { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(reveal, narrow ? 1600 : 500);
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
