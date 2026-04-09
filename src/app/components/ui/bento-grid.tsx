import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "./utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: 1 | 2;
  hasPersistentHover?: boolean;
}

export interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={`${item.title}-${index}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
          className={cn(
            item.colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
          )}
        >
          <div
            className={cn(
              "group relative h-full overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4 transition-all duration-300 sm:p-5",
              "hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(255,255,255,0.06)] will-change-transform",
              {
                "-translate-y-0.5 shadow-[0_2px_12px_rgba(255,255,255,0.06)]":
                  item.hasPersistentHover,
              },
            )}
          >
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100",
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:4px_4px]" />
            </div>

            <div className="relative flex h-full flex-col space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-white/15 group-hover:to-white/5">
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "rounded-lg px-2 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm",
                    "bg-white/10 transition-colors duration-300 group-hover:bg-white/[0.14]",
                  )}
                >
                  {item.status ?? "Destaque"}
                </span>
              </div>

              <div className="min-w-0 space-y-2">
                <h3
                  className="text-[15px] font-medium tracking-tight text-white"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {item.title}
                  {item.meta ? (
                    <span className="ml-2 text-xs font-normal text-zinc-500">
                      {item.meta}
                    </span>
                  ) : null}
                </h3>
                <p
                  className="text-sm leading-snug text-zinc-400"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {item.description}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  {item.tags?.map((tag, i) => (
                    <span
                      key={`${tag}-${i}`}
                      className="rounded-md bg-white/10 px-2 py-1 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.14]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="shrink-0 text-xs text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
                  {item.cta ?? "Saiba mais →"}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-transparent via-white/[0.08] to-transparent p-px transition-opacity duration-300",
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100",
              )}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
