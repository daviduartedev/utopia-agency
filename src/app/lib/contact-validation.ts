export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

/** Validação no cliente (alinhada aos campos NOT NULL no Supabase). */
export function validateContactForm(p: ContactPayload): string | null {
  if (p.name.trim().length < 2) {
    return "Informe seu nome (pelo menos 2 caracteres).";
  }
  const email = p.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Informe um e-mail válido.";
  }
  const digits = p.phone.replace(/\D/g, "");
  if (digits.length < 10) {
    return "Informe um telefone válido com DDD (mínimo 10 dígitos).";
  }
  if (!p.service.trim()) {
    return "Selecione o tipo de projeto.";
  }
  if (p.message.trim().length < 10) {
    return "Escreva uma mensagem com pelo menos 10 caracteres.";
  }
  return null;
}
