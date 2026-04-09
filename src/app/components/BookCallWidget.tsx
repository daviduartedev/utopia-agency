import { CalendarPlus } from "lucide-react";
import { cn } from "./ui/utils";

const AVATAR_SRC =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=128&h=128&fit=crop&crop=faces&q=85&auto=format";

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
          className="size-12 shrink-0 rounded-full object-cover ring-1 ring-zinc-200"
        />
        <div className="min-w-0 pt-0.5 sm:pt-0">
          <p
            className="text-base font-semibold tracking-tight text-zinc-900"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            Agendar uma chamada
          </p>
          <p
            className="mt-0.5 text-sm leading-snug text-zinc-500"
            style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
          >
            15 minutos gratuitos com a nossa equipa para falares do teu projeto.
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
        Agendar chamada
      </button>
    </div>
  );
}
