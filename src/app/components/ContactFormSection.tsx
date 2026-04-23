/**
 * Único ponto que grava no Supabase (`contact_submissions`).
 * Demais CTAs da landing abrem só WhatsApp com textos em `whatsapp-messages.ts`.
 */
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";
import { scrollRevealMotion, usePrefersReducedMotion } from "../lib/motion-pref";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { validateContactForm, type ContactPayload } from "../lib/contact-validation";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "../lib/supabase";
import { openWhatsApp } from "../lib/whatsapp";
import { Button } from "./ui/button";

const fieldClass =
  "border-white/15 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:border-white/25 focus-visible:ring-white/15";

function friendlySupabaseError(message: string): string {
  if (/row-level security|rls|policy/i.test(message)) {
    return "Não foi possível registrar o envio. Verifique as políticas RLS no Supabase ou fale pelo WhatsApp.";
  }
  if (/network|fetch|failed/i.test(message)) {
    return "Falha de rede. Verifique a conexão e tente de novo.";
  }
  return message || "Não foi possível enviar. Tente novamente ou use o WhatsApp.";
}

export function ContactFormSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: ContactPayload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      service: String(data.get("service") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const validationError = validateContactForm(payload);
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    if (!isSupabaseConfigured()) {
      setSubmitError(
        "Formulário não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no ambiente.",
      );
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setSubmitError("Cliente Supabase indisponível.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      message: payload.message,
    });
    setSubmitting(false);

    if (error) {
      setSubmitError(friendlySupabaseError(error.message));
      return;
    }

    const text = [
      `Olá! Enviei pelo formulário do site da Utopia.`,
      ``,
      `Nome: ${payload.name}`,
      `E-mail: ${payload.email}`,
      `Telefone: ${payload.phone}`,
      `Tipo de projeto: ${payload.service}`,
      ``,
      `Mensagem:`,
      payload.message,
    ].join("\n");

    openWhatsApp(text);
    setSent(true);
    form.reset();
  }

  return (
    <section
      id="contato"
      className="relative z-10 w-full scroll-mt-24 bg-section-over-gradient py-12 md:py-16"
      aria-labelledby="contato-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 0, lateral: true })}>
        <SectionHeader
          id="contato-heading"
          eyebrow="Contato"
          title="Prefere escrever antes de falar?"
          description="Manda nome, telefone e o que você vende. A gente lê, responde em até um dia útil e já abre o WhatsApp com contexto."
          className="mb-12 md:mb-14"
        />
      </motion.div>

      <motion.div
        {...scrollRevealMotion(prefersReducedMotion, { delayIndex: 1, lateral: true })}
        className="mx-auto max-w-xl px-4 sm:px-8 md:px-12"
      >
        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-black/20 p-6 sm:p-8 md:p-10"
        >
          {submitError ? (
            <p
              className="rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              role="alert"
            >
              {submitError}
            </p>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="contact-name" className="text-zinc-300">
              Nome
            </Label>
            <Input
              id="contact-name"
              name="name"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              placeholder="Seu nome"
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-zinc-300">
              E-mail
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="nome@empresa.com.br"
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="text-zinc-300">
              Telefone
            </Label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="+55 (48) 99999-9999"
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-service" className="text-zinc-300">
              Tipo de projeto
            </Label>
            <select
              id="contact-service"
              name="service"
              required
              className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] ${fieldClass}`}
              defaultValue=""
            >
              <option value="" disabled className="bg-zinc-900 text-zinc-400">
                Selecione uma opção
              </option>
              <option value="Site ou landing page" className="bg-zinc-900">
                Site ou landing page
              </option>
              <option value="Painel ou sistema interno" className="bg-zinc-900">
                Painel ou sistema interno
              </option>
              <option value="App no celular" className="bg-zinc-900">
                App no celular
              </option>
              <option value="Outro ou ainda não sei" className="bg-zinc-900">
                Outro ou ainda não sei
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message" className="text-zinc-300">
              Mensagem
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              rows={5}
              placeholder="Conte o objetivo, prazo desejado, links de referência..."
              className={`min-h-[120px] resize-y ${fieldClass}`}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto sm:self-start"
          >
            {submitting ? "Enviando…" : "Enviar e abrir WhatsApp"}
          </Button>

          {sent ? (
            <p
              className="text-sm text-zinc-400"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              role="status"
            >
              Registo guardado. Se o WhatsApp não abriu, envie uma mensagem para o
              número da Utopia com os mesmos dados.
            </p>
          ) : null}
        </form>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
