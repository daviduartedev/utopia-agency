import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "./utils";
import { SpotlightCard } from "./spotlight-card";

export interface BentoItem {
  title: string;
  description: string;
  icon: ReactNode;
  status?: string;
}

export interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-4",
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
          className="min-h-[240px] sm:min-h-[260px]"
        >
          <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
            <div className="flex items-center justify-between gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                {item.icon}
              </div>
              {item.status ? (
                <span className="rounded-lg bg-white/10 px-2 py-1 text-xs font-medium text-zinc-300">
                  {item.status}
                </span>
              ) : null}
            </div>

            <div className="mt-4 min-w-0 space-y-2">
              <h3
                className="text-[15px] font-semibold tracking-tight text-white"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed text-zinc-400"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                {item.description}
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}
