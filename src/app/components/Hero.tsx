import { CinematicHero } from "./ui/cinematic-hero";

const TITLE = "Criamos sites, landing pages e sistemas que fazem seu negócio crescer.";
const DESCRIPTION = "Do design ao desenvolvimento, tudo pensado para gerar resultado.";

export function Hero() {
  return (
    <CinematicHero
      id="inicio"
      tagline1={TITLE}
      ctaDescription={DESCRIPTION}
    />
  );
}
