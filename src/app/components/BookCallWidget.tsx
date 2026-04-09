import { CalendarPlus } from "lucide-react";
import { cn } from "./ui/utils";

/** Mesma foto do botão flutuante (`public/avatar.png`). */
const AVATAR_SRC = "/avatar.png";

type BookCallWidgetProps = {
  className?: string;
  formId?: string;
  firstFieldId?: string;
};

export function BookCallWidget({
  className,
  formId = "contact-form",
  firstFieldId = "contact-name",
}: BookCallWidgetProps) {
  function handleClick() {
    const el = document.getElementById(formId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      document.getElementById(firstFieldId)?.focus();
    }, 450);
  }

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
            Marcar uma conversa
          </p>
          <p
            className="mt-0.5 text-sm leading-snug text-zinc-500"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            15 minutos gratuitos com nossa equipe para falarmos sobre o seu projeto.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        <CalendarPlus className="size-5 shrink-0 text-white" strokeWidth={2} aria-hidden />
        Marcar conversa
      </button>
    </div>
  );
}
