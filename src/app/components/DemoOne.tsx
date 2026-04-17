"use client";

import { SiWhatsapp } from "react-icons/si";
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
      imageAlt="WhatsApp"
      centerContent={
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#25D366]">
          <SiWhatsapp
            aria-hidden
            className="text-white"
            style={{ width: "58%", height: "58%" }}
          />
        </div>
      }
      revolvingText="Falar no WhatsApp - Utopia digital - Falar no WhatsApp - Utopia digital - "
      revolvingSpeed={8}
      ctaButtonAction={() => {
        openWhatsApp(WA_MSG_FLOATING);
      }}
    />
  );
}
