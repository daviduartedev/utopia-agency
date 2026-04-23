import { CalendarPlus } from "lucide-react";
import { whatsappHref } from "../lib/whatsapp";
import { WA_MSG_BOOK_CALL } from "../lib/whatsapp-messages";
import { cn } from "./ui/utils";

/** Mesma foto do botão flutuante (`public/avatar.png`). */
const AVATAR_SRC = "/avatar.png";

type BookCallWidgetProps = {
  className?: string;
  /** Texto pré-preenchido no WhatsApp */
  whatsappMessage?: string;
};

export function BookCallWidget({
  className,
  whatsappMessage = WA_MSG_BOOK_CALL,
}: BookCallWidgetProps) {
  const href = whatsappHref(whatsappMessage);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
        <img
          src={AVATAR_SRC}
          alt=""
          width={48}
          height={48}
          decoding="async"
          className="size-12 shrink-0 rounded-full object-cover ring-1 ring-zinc-200"
        />
        <div className="min-w-0 pt-0.5 sm:pt-0">
          <p
            className="text-base font-semibold tracking-tight text-zinc-900"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            15 minutos no WhatsApp
          </p>
          <p
            className="mt-0.5 text-sm leading-snug text-zinc-500"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            A gente ouve o que você vende, o que não está funcionando hoje e se faz sentido colocar página no ar rápido. Sem compromisso.
          </p>
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        <CalendarPlus className="size-5 shrink-0 text-white" strokeWidth={2} aria-hidden />
        Quero minha vaga
      </a>
    </div>
  );
}
