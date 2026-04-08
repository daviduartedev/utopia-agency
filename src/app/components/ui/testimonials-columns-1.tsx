"use client";

import React from "react";
import { motion } from "motion/react";

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {new Array(2).fill(0).map((_, dupIndex) => (
          <React.Fragment key={dupIndex}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-zinc-950/80 shadow-lg shadow-purple-500/10 max-w-xs w-full text-zinc-300"
                key={`${dupIndex}-${i}`}
              >
                <div className="text-sm sm:text-[15px] leading-relaxed">{text}</div>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="font-medium tracking-tight leading-5 text-zinc-100">{name}</div>
                    <div className="leading-5 opacity-70 tracking-tight text-sm">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
