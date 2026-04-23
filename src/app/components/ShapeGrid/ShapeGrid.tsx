"use client";

import { useCallback, useEffect, useRef } from "react";
import "./ShapeGrid.css";

export type ShapeGridDirection = "diagonal" | "horizontal" | "vertical";

export interface ShapeGridProps {
  speed?: number;
  squareSize?: number;
  direction?: ShapeGridDirection;
  borderColor?: string;
  hoverFillColor?: string;
  shape?: "square";
  /** Mantido na API; `0` = sem rasto (único realce na célula sob o ponteiro). */
  hoverTrailAmount?: number;
  /** Sem `requestAnimationFrame` contínuo; só redesenha em resize/ponteiro. */
  staticMotion?: boolean;
  className?: string;
}

function parseCssColor(hex: string): string {
  return hex.trim() || "#2F293A";
}

function phaseOffsets(
  phase: number,
  squareSize: number,
  direction: ShapeGridDirection,
): { ox: number; oy: number } {
  const s = squareSize;
  if (direction === "diagonal") {
    return { ox: phase % s, oy: (phase * 0.65) % s };
  }
  if (direction === "horizontal") {
    return { ox: phase % s, oy: 0 };
  }
  return { ox: 0, oy: phase % s };
}

export function ShapeGrid({
  speed = 0.25,
  squareSize = 40,
  direction = "diagonal",
  borderColor = "#2F293A",
  hoverFillColor = "#222222",
  shape: _shape = "square",
  hoverTrailAmount: _hoverTrailAmount = 0,
  staticMotion = false,
  className,
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef(0);
  const hoverCellRef = useRef<{ i: number; j: number } | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);

  const syncHoverFromPointer = useCallback(() => {
    const lp = lastPointerRef.current;
    if (!lp) {
      hoverCellRef.current = null;
      return;
    }
    const { ox, oy } = phaseOffsets(phaseRef.current, squareSize, direction);
    const s = squareSize;
    const i = Math.floor((lp.x + ox) / s);
    const j = Math.floor((lp.y + oy) / s);
    hoverCellRef.current = { i, j };
  }, [direction, squareSize]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = wrap.getBoundingClientRect();
    const wCss = Math.max(1, rect.width);
    const hCss = Math.max(1, rect.height);

    if (canvas.width !== Math.floor(wCss * dpr) || canvas.height !== Math.floor(hCss * dpr)) {
      canvas.width = Math.floor(wCss * dpr);
      canvas.height = Math.floor(hCss * dpr);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, wCss, hCss);

    const s = squareSize;
    const border = parseCssColor(borderColor);
    const fillHi = parseCssColor(hoverFillColor);
    const { ox, oy } = phaseOffsets(phaseRef.current, s, direction);

    ctx.lineWidth = 1;
    ctx.strokeStyle = border;
    ctx.globalAlpha = 1;

    for (let x = -s; x < wCss + s; x += s) {
      for (let y = -s; y < hCss + s; y += s) {
        const gx = x - ox;
        const gy = y - oy;
        ctx.strokeRect(gx + 0.5, gy + 0.5, s - 1, s - 1);
      }
    }

    syncHoverFromPointer();

    const hi = hoverCellRef.current;
    if (hi) {
      const gx = hi.i * s - ox;
      const gy = hi.j * s - oy;
      if (gx < wCss + s && gy < hCss + s && gx + s > -s && gy + s > -s) {
        ctx.fillStyle = fillHi;
        ctx.globalAlpha = 0.18;
        ctx.fillRect(gx, gy, s, s);
        ctx.globalAlpha = 1;
      }
    }
  }, [borderColor, direction, hoverFillColor, squareSize, syncHoverFromPointer]);

  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) {
        lastPointerRef.current = null;
        hoverCellRef.current = null;
        draw();
        return;
      }
      lastPointerRef.current = { x, y };
      if (staticMotion) {
        syncHoverFromPointer();
        draw();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [draw, staticMotion, syncHoverFromPointer]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    if (staticMotion) {
      lastTsRef.current = 0;
      return;
    }

    const loop = (ts: number) => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;

      const mult =
        direction === "diagonal" ? 22 : direction === "horizontal" ? 18 : 18;
      phaseRef.current += speed * dt * mult;

      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw, direction, speed, staticMotion]);

  return (
    <div ref={wrapRef} className={className ?? "pointer-events-none absolute inset-0"}>
      <canvas ref={canvasRef} className="shapegrid-canvas" aria-hidden />
    </div>
  );
}
