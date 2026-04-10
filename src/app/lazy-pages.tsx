import { lazy } from "react";

/** Secções pesadas (motion, Lenis, etc.) — carregadas sob demanda. */
export const WhyUs = lazy(() =>
  import("./components/WhyUs").then((m) => ({ default: m.WhyUs })),
);

export const OfferingsScrollStack = lazy(() =>
  import("./components/OfferingsScrollStack").then((m) => ({
    default: m.OfferingsScrollStack,
  })),
);

export const HowItWorks = lazy(() =>
  import("./components/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);

export const Portfolio = lazy(() =>
  import("./components/Portfolio").then((m) => ({ default: m.Portfolio })),
);

export const Testimonials = lazy(() =>
  import("./components/Testimonials").then((m) => ({ default: m.Testimonials })),
);

export const Faq = lazy(() =>
  import("./components/Faq").then((m) => ({ default: m.Faq })),
);

export const CtaSection = lazy(() =>
  import("./components/CtaSection").then((m) => ({ default: m.CtaSection })),
);

export const ContactFormSection = lazy(() =>
  import("./components/ContactFormSection").then((m) => ({
    default: m.ContactFormSection,
  })),
);

export const Footer = lazy(() =>
  import("./components/Footer").then((m) => ({ default: m.Footer })),
);
