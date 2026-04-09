import { FloatingConsultButton } from "./ui/floating-consult-button";

export default function DemoOne() {
  return (
    <FloatingConsultButton
      buttonSize={200}
      imageSize={120}
      imageSrc="/avatar.png"
      revolvingText="FALE CONOSCO — ORÇAMENTO — LANDING · SAAS · APPS — "
      revolvingSpeed={8}
      popupHeading="Vamos conversar"
      popupDescription="Conte sua ideia: landing, SaaS ou app. Respondemos com prazo, escopo e próximos passos — sem enrolação."
      ctaButtonText="Ir para o contato"
      ctaButtonAction={() => {
        document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
      }}
    />
  );
}
