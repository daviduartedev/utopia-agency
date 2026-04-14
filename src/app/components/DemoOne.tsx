"use client";

import { openWhatsApp } from "../lib/whatsapp";
import { WA_MSG_FLOATING } from "../lib/whatsapp-messages";
import { useIsNarrowMobile } from "../lib/use-media-query";
import { FloatingConsultButton } from "./ui/floating-consult-button";

export default function DemoOne() {
  const narrowMobile = useIsNarrowMobile();

  return (
    <FloatingConsultButton
      buttonSize={narrowMobile ? 136 : 200}
      imageSize={narrowMobile ? 95 : 120}
      imageSrc="/avatar.png"
      revolvingText="QUERO MEU PROJETO AGORA — FALE CONOSCO — UTOPIA — "
      revolvingSpeed={8}
      popupHeading="Bora começar?"
      popupDescription="Um clique e você fala direto com a gente no WhatsApp — landing, SaaS ou app."
      ctaButtonText="Quero falar agora"
      ctaButtonAction={() => {
        openWhatsApp(WA_MSG_FLOATING);
      }}
    />
  );
}
