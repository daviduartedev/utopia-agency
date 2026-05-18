import { CinematicHero } from "./ui/cinematic-hero";

const TITLE = "Entrega r\u00e1pida. Produto premium. Resultado real.";
const DESCRIPTION = "Execu\u00e7\u00e3o de alto n\u00edvel para a sua marca aparecer como merece.";

export function Hero() {
  return (
    <CinematicHero
      id="inicio"
      tagline1={TITLE}
      ctaDescription={DESCRIPTION}
    />
  );
}
