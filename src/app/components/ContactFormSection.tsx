import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "./ui/section-header";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { BookCallWidget } from "./BookCallWidget";

/** Substitui pelo seu e-mail de contato. */
const CONTACT_EMAIL = "contato@seudominio.com";

const fieldClass =
  "border-white/15 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:border-white/25 focus-visible:ring-white/15";

export function ContactFormSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Proposta — ${name}`);
    const body = encodeURIComponent(
      `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone || "—"}\nTipo de projeto: ${service || "—"}\n\nMensagem:\n${message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
  }

  return (
    <section
      id="contato"
      className="relative z-10 w-full scroll-mt-24 bg-page-surface py-20 md:py-24"
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
      >
        <SectionHeader
          id="contact-heading"
          eyebrow="Contato"
          title="Conte-nos sobre o seu projeto."
          description="Resposta em até um dia útil. Sem spam — só o necessário para preparar uma proposta alinhada ao que você precisa."
          className="mb-12 md:mb-14"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="mx-auto max-w-xl px-4 sm:px-8 md:px-12"
      >
        <BookCallWidget className="mb-8" />

        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-black/20 p-6 sm:p-8 md:p-10"
        >
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="text-zinc-300">
              Nome
            </Label>
            <Input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Seu nome"
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-zinc-300">
              Email
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="email@empresa.com"
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="text-zinc-300">
              Telefone <span className="font-normal text-zinc-500">(opcional)</span>
            </Label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+55 (11) 99999-9999"
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
              <option value="Landing page / site" className="bg-zinc-900">
                Landing page / site
              </option>
              <option value="SaaS / painel" className="bg-zinc-900">
                SaaS / painel
              </option>
              <option value="App mobile / PWA" className="bg-zinc-900">
                App mobile / PWA
              </option>
              <option value="Outro / ainda não sei" className="bg-zinc-900">
                Outro / ainda não sei
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
              rows={5}
              placeholder="Objetivo, prazo desejado, links de referência…"
              className={`min-h-[120px] resize-y ${fieldClass}`}
            />
          </div>

          <Button type="submit" className="w-full sm:w-auto sm:self-start">
            Enviar mensagem
          </Button>

          {sent ? (
            <p
              className="text-sm text-zinc-400"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              role="status"
            >
              Se o programa de e-mail não abriu, verifique se você tem um app de
              e-mail configurado ou envie manualmente para{" "}
              <span className="text-zinc-300">{CONTACT_EMAIL}</span>.
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
