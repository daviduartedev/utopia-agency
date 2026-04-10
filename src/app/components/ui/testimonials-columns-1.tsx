"use client";

import React from "react";

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
  const duration = props.duration ?? 10;

  return (
    <div className={props.className}>
      <div
        className="utopia-testimonials-marquee flex flex-col gap-5 pb-5 bg-transparent [will-change:transform]"
        style={{
          animation: `utopia-testimonials-y ${duration}s linear infinite`,
        }}
      >
        {new Array(2).fill(0).map((_, dupIndex) => (
          <React.Fragment key={dupIndex}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="w-full max-w-xs rounded-3xl border border-white/10 bg-zinc-950/80 p-7 shadow-lg shadow-purple-500/10 sm:p-8 text-zinc-300"
                key={`${dupIndex}-${i}`}
              >
                <div className="text-sm leading-relaxed sm:text-[15px]">{text}</div>
                <div className="mt-4 flex items-center gap-3 sm:mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="flex min-w-0 flex-col">
                    <div className="font-medium leading-5 tracking-tight text-zinc-100">
                      {name}
                    </div>
                    <div className="text-sm leading-5 tracking-tight opacity-70">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
