import { FloatingConsultButton } from "./ui/floating-consult-button";

export default function DemoOne() {
  return (
    <FloatingConsultButton
      buttonSize={200}
      imageSize={120}
      imageSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop"
      revolvingText="FALE CONOSCO — ORÇAMENTO — LANDING · SAAS · APPS — "
      revolvingSpeed={8}
      popupHeading="Vamos conversar"
      popupDescription="Conte sua ideia: landing, SaaS ou app. Respondemos com prazo, escopo e próximos passos — sem enrolação."
      ctaButtonText="Agendar conversa"
      ctaButtonAction={() => window.location.href = '/booking'}
    />
  );
}
