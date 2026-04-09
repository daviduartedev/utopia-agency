import { WA_MSG_DEFAULT_IMPACT } from "./whatsapp-messages";

/** +55 48 9143-4813 (apenas dígitos para wa.me) */
export const WHATSAPP_E164 = "554891434813";

const DEFAULT_MESSAGE = WA_MSG_DEFAULT_IMPACT;

export function whatsappHref(message: string = DEFAULT_MESSAGE): string {
  const text = encodeURIComponent((message || DEFAULT_MESSAGE).trim());
  return `https://wa.me/${WHATSAPP_E164}?text=${text}`;
}

export function openWhatsApp(message?: string): void {
  const href = whatsappHref(message);
  window.open(href, "_blank", "noopener,noreferrer");
}
