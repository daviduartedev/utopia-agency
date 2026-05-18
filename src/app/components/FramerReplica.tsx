"use client";

import { type ReactNode, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Globe,
  HelpCircle,
  Home,
  Instagram,
  LayoutDashboard,
  Layers,
  Menu,
  MessageCircle,
  Plus,
  Smartphone,
  Twitter,
  X,
} from "lucide-react";
import { whatsappHref } from "../lib/whatsapp";
import {
  WA_MSG_HERO,
  WA_MSG_NAV,
  WA_MSG_OFFER_APP,
  WA_MSG_OFFER_LANDING,
  WA_MSG_OFFER_SAAS,
} from "../lib/whatsapp-messages";

const heroProjects = [
  { src: "/Design sem nome (2).png", alt: "Projeto Utopia 02" },
  { src: "/Design sem nome (3).png", alt: "Projeto Utopia 03" },
  { src: "/Design sem nome (4).png", alt: "Projeto Utopia 04" },
  { src: "/Design sem nome (5).png", alt: "Projeto Utopia 05" },
  { src: "/Design sem nome (6).png", alt: "Projeto Utopia 06" },
];

const ANA_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="160" height="160" rx="80" fill="#EEE7DE"/>
      <circle cx="80" cy="84" r="34" fill="#F3C9A7"/>
      <path d="M48 140C52 114 64 104 80 104C96 104 108 114 112 140H48Z" fill="#F8F4EF"/>
      <path d="M52 78C52 55 63 40 80 40C97 40 108 55 108 78V83C108 57 96 48 80 48C64 48 52 57 52 83V78Z" fill="#2E231F"/>
      <path d="M56 73C56 54 66 42 80 42C94 42 104 54 104 73C104 73 95 63 80 63C65 63 56 73 56 73Z" fill="#2E231F"/>
      <path d="M69 93C73 96 87 96 91 93" stroke="#A56C56" stroke-width="3" stroke-linecap="round"/>
      <circle cx="68" cy="82" r="3" fill="#2E231F"/>
      <circle cx="92" cy="82" r="3" fill="#2E231F"/>
      <path d="M64 69C67 66 72 66 75 68" stroke="#2E231F" stroke-width="3" stroke-linecap="round"/>
      <path d="M85 68C88 66 93 66 96 69" stroke="#2E231F" stroke-width="3" stroke-linecap="round"/>
      <path d="M57 56C59 44 68 34 80 34C92 34 101 44 103 56" stroke="#2E231F" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `);

const dockItems = [
  { Icon: Home, label: "In\u00edcio", href: "#inicio" },
  { Icon: Layers, label: "Como funciona", href: "#processo" },
  { Icon: LayoutDashboard, label: "Planos", href: "#planos" },
  { Icon: HelpCircle, label: "FAQ", href: "#faq" },
];

const painPoints = [
  {
    num: "01",
    title: "Busca no Google, voc\u00ea n\u00e3o aparece",
    body:
      "Cliente digita o servi\u00e7o na cidade. Aparece mapa, foto, avalia\u00e7\u00e3o do outro. Voc\u00ea nem entra na briga. O or\u00e7amento nasce ali, e n\u00e3o no seu WhatsApp.",
  },
  {
    num: "02",
    title: "S\u00f3 indica\u00e7\u00e3o e post n\u00e3o enchem agenda",
    body:
      "Feed some. Grupo esfria. Indica\u00e7\u00e3o vem quando vem. Sem p\u00e1gina s\u00e9ria, voc\u00ea fica ref\u00e9m de sorte e n\u00e3o sabe quanto entra no m\u00eas.",
  },
  {
    num: "03",
    title: "Sem presen\u00e7a clara, n\u00e3o fecha",
    body:
      "Gente nova abre o link e desconfia. Sem prova, sem texto direto e sem chamada \u00f3bvia, ela chama quem parece mais estabelecido. Voc\u00ea perde na primeira impress\u00e3o.",
  },
];

const faqs = [
  [
    "Como funciona o processo de design?",
    "Come\u00e7amos com briefing e dire\u00e7\u00e3o visual, seguimos para uma primeira vers\u00e3o naveg\u00e1vel e refinamos at\u00e9 a p\u00e1gina ficar pronta para publicar.",
  ],
  [
    "E se eu precisar de revis\u00f5es?",
    "As revis\u00f5es entram no fluxo do projeto. Ajustamos copy, layout e detalhes visuais mantendo a dire\u00e7\u00e3o premium definida no in\u00edcio.",
  ],
  [
    "Quanto tempo leva para concluir um pedido?",
    "Projetos enxutos costumam ganhar primeira vers\u00e3o em poucos dias. O prazo final depende do escopo, conte\u00fado e integra\u00e7\u00f5es.",
  ],
  [
    "Qual a diferen\u00e7a entre o plano Landing, Sistema e Aplicativo?",
    "Landing resolve p\u00e1gina de convers\u00e3o r\u00e1pida. Sistema cobre fluxos internos e opera\u00e7\u00e3o. Aplicativo atende produtos e experi\u00eancias mobile sob medida.",
  ],
  [
    "Como vamos nos comunicar durante o projeto?",
    "Centralizamos tudo em WhatsApp, email ou Slack, com atualiza\u00e7\u00f5es curtas para voc\u00ea saber exatamente o que est\u00e1 acontecendo.",
  ],
  [
    "Posso pausar ou cancelar a qualquer momento?",
    "Sim. O trabalho \u00e9 combinado com escopo claro, sem prender voc\u00ea em um fluxo que n\u00e3o fa\u00e7a sentido para o momento da marca.",
  ],
];

const impactComparison = [
  {
    left: "Cliente entra no link e ainda precisa descobrir o que voc\u00ea faz.",
    right: "A proposta fica clara no primeiro scroll, inclusive no celular.",
  },
  {
    left: "Visual gen\u00e9rico ou confuso faz a empresa parecer menos pronta.",
    right: "Estrutura premium aumenta valor percebido e passa mais confian\u00e7a.",
  },
  {
    left: "Sem prova e sem contexto, a pessoa compara voc\u00ea s\u00f3 por pre\u00e7o.",
    right: "Texto, prova e organiza\u00e7\u00e3o ajudam sua marca a parecer mais s\u00e9ria.",
  },
  {
    left: "O contato fica escondido e o clique esfria antes de virar conversa.",
    right: "WhatsApp vis\u00edvel no momento certo encurta o caminho at\u00e9 o or\u00e7amento.",
  },
  {
    left: "Quem parece mais resolvido recebe a mensagem primeiro.",
    right: "Sua empresa entra mais forte na decis\u00e3o e disputa o lead de verdade.",
  },
];

const pricingPlans = [
  {
    slug: "landing",
    label: "LANDING PAGE",
    badge: "MAIS PROCURADO",
    eyebrow: "A PARTIR DE",
    price: "R$ 999",
    installment: "parcel\u00e1vel em 3x",
    accent: "ENTREGA EM AT\u00c9 7 DIAS",
    cta: "Quero meu site profissional",
    href: whatsappHref(WA_MSG_OFFER_LANDING),
    icon: Globe,
    items: [
      "P\u00e1gina no ar com layout aprovado por voc\u00ea antes da publica\u00e7\u00e3o",
      "Endere\u00e7o do site e hospedagem configurados",
      "Base pra Google indexar direito e te achar na busca",
      "Contagem de visitas ligada pra voc\u00ea ver o movimento",
      "1 m\u00eas de suporte gratuito depois do lan\u00e7amento",
      "Revis\u00f5es dentro do que combinamos na proposta",
    ],
  },
  {
    slug: "system",
    label: "SISTEMA ONLINE",
    badge: "",
    eyebrow: "",
    price: "sob consulta",
    installment: "parcel\u00e1vel em 3x",
    accent: "SOB CONSULTA",
    cta: "",
    href: whatsappHref(WA_MSG_OFFER_SAAS),
    icon: LayoutDashboard,
    items: [
      "Fluxos internos, pain\u00e9is e opera\u00e7\u00e3o sob medida para o seu caso",
      "Descoberta, escopo e implementa\u00e7\u00e3o alinhados com a complexidade real",
    ],
  },
  {
    slug: "app",
    label: "APLICATIVO",
    badge: "",
    eyebrow: "",
    price: "sob consulta",
    installment: "parcel\u00e1vel em 3x",
    accent: "SOB CONSULTA",
    cta: "",
    href: whatsappHref(WA_MSG_OFFER_APP),
    icon: Smartphone,
    items: [
      "Produto mobile sob medida para servi\u00e7o, experi\u00eancia ou opera\u00e7\u00e3o",
      "Arquitetura de telas, navega\u00e7\u00e3o e pr\u00f3ximos passos definidos com voc\u00ea",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 80, scale: 0.92, filter: "blur(16px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 155, damping: 18, mass: 0.7 },
  },
};

const staggerGroup = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const driftIn = {
  hidden: { opacity: 0, y: 90, scale: 0.94, rotate: -1.6, filter: "blur(18px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 145, damping: 18, mass: 0.8 },
  },
};

function SectionKicker({ children }: { children: string }) {
  return <span className="fr-kicker">{children}</span>;
}

function SectionTitle({
  kicker,
  title,
  body,
  className = "",
}: {
  kicker: string;
  title: ReactNode;
  body: ReactNode;
  className?: string;
}) {
  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px" }}
      className={`fr-section-head ${className}`}
    >
      <SectionKicker>{kicker}</SectionKicker>
      <h2>{title}</h2>
      <p>{body}</p>
    </motion.header>
  );
}

function smoothScrollTo(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
  if (history.replaceState) {
    history.replaceState(null, "", href);
  }
}

function BottomDock() {
  return (
    <motion.nav
      initial={{ x: "-50%", y: 90, opacity: 0, scale: 0.9 }}
      animate={{ x: "-50%", y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 190, damping: 18 }}
      className="fr-dock"
      aria-label={"Navega\u00e7\u00e3o r\u00e1pida"}
    >
      <div className="fr-dock-icons">
        {dockItems.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            onClick={(event) => smoothScrollTo(event, href)}
          >
            <Icon size={17} strokeWidth={2.4} />
          </a>
        ))}
      </div>
      <a className="fr-dock-cta" href={whatsappHref(WA_MSG_NAV)} target="_blank" rel="noreferrer">
        Quero meu site
      </a>
    </motion.nav>
  );
}

export function FramerReplica() {
  const [openFaq, setOpenFaq] = useState(0);
  const [openPlan, setOpenPlan] = useState("landing");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const slashRotate = useTransform(scrollYProgress, [0, 1], [-8, 22]);
  const slashY = useTransform(scrollYProgress, [0, 1], [0, 420]);

  return (
    <div className="fr-page">
      <img
        src="https://framerusercontent.com/images/CC0JINKmEAhG7PuLwqAk8MhTQw.webp?width=1751&height=2048"
        alt=""
        className="fr-bg-shadow"
        decoding="async"
      />

      <motion.div className="fr-slash" style={{ rotate: slashRotate, y: slashY }} aria-hidden />

      <header className="fr-topbar" aria-label={"Cabe\u00e7alho"}>
        <a
          href="#inicio"
          className="fr-brand"
          onClick={(event) => {
            setMenuOpen(false);
            smoothScrollTo(event, "#inicio");
          }}
        >
          <img src="/logo.png" alt="" />
          <span>
            utopia
            <sup>SM</sup>
          </span>
        </a>
        <button
          type="button"
          className="fr-menu-toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav className={`fr-nav-copy ${menuOpen ? "is-open" : ""}`} aria-label={"Navega\u00e7\u00e3o principal"}>
          <a
            href="#impacto"
            onClick={(event) => {
              setMenuOpen(false);
              smoothScrollTo(event, "#impacto");
            }}
          >
            Impacto
          </a>
          <a
            href="#processo"
            onClick={(event) => {
              setMenuOpen(false);
              smoothScrollTo(event, "#processo");
            }}
          >
            Como funciona
          </a>
          <a
            href="#planos"
            onClick={(event) => {
              setMenuOpen(false);
              smoothScrollTo(event, "#planos");
            }}
          >
            Planos
          </a>
          <a
            href="#faq"
            onClick={(event) => {
              setMenuOpen(false);
              smoothScrollTo(event, "#faq");
            }}
          >
            FAQ
          </a>
          <a
            href={whatsappHref(WA_MSG_NAV)}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Quero meu site
          </a>
        </nav>
      </header>

      <main id="inicio">
        <section className="fr-hero">
          <div className="fr-scroll-label" aria-hidden>
            SCROLL
          </div>
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.86, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 135, damping: 17, delay: 0.12 }}
            className="fr-hero-copy"
          >
            <h1>
              {"Criamos sites, landing pages e sistemas"}
              <br />
              {"que fazem seu neg\u00f3cio crescer."}
            </h1>
            <p>
              Da ideia ao desenvolvimento,
              <br />
              tudo pensado para gerar resultado.
            </p>
            <a className="fr-main-btn" href={whatsappHref(WA_MSG_HERO)} target="_blank" rel="noreferrer">
              Quero meu site profissional
              <ArrowRight size={13} />
            </a>
          </motion.div>

          <motion.div
            className="fr-hero-marquee"
            initial={{ opacity: 0, y: 160, scale: 0.84 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.32 }}
          >
            <div className="fr-marquee-track">
              {[...heroProjects, ...heroProjects, ...heroProjects].map((item, index) => (
                <article className="fr-hero-card" key={`${item.src}-${index}`}>
                  <div className="fr-hero-card-frame">
                    <img src={item.src} alt={item.alt} decoding="async" loading={index < heroProjects.length ? "eager" : "lazy"} />
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="fr-impact" id="impacto">
          <SectionTitle
            kicker="Impacto direto"
            title={
              <>
                {"Se sua empresa n\u00e3o tem um site,"}
                <br />
                {"ela praticamente n\u00e3o existe."}
              </>
            }
            body={"Quem procura no celular n\u00e3o acha endere\u00e7o claro, n\u00e3o v\u00ea prova, n\u00e3o clica. Quem acha o concorrente acha r\u00e1pido. O jogo \u00e9 esse."}
          />
          <motion.div
            className="fr-impact-layout"
            variants={staggerGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
          >
            <motion.article className="fr-impact-board" variants={driftIn}>
              <div className="fr-impact-board-top">
                <small>Comparativo real</small>
                <strong>O que muda quando sua marca para de parecer improvisada e começa a parecer pronta para vender.</strong>
              </div>

              <div className="fr-impact-switch">
                <span className="fr-impact-pill is-negative">
                  <X size={14} />
                  Sem presença forte
                </span>
                <strong>vs</strong>
                <span className="fr-impact-pill is-positive">
                  <Check size={14} />
                  Com Utopia
                </span>
              </div>

              <div className="fr-impact-table" role="list" aria-label="Comparativo de impacto">
                {impactComparison.map((item) => (
                  <div key={item.left} className="fr-impact-row" role="listitem">
                    <div className="fr-impact-cell is-negative">
                      <span className="fr-impact-mark" aria-hidden>
                        <X size={13} />
                      </span>
                      <p>{item.left}</p>
                    </div>

                    <span className="fr-impact-vs" aria-hidden>
                      <ArrowRight size={15} />
                    </span>

                    <div className="fr-impact-cell is-positive">
                      <span className="fr-impact-mark" aria-hidden>
                        <Check size={13} />
                      </span>
                      <p>{item.right}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="fr-impact-cta-row">
                <p>Quando o visual, a prova e o contato trabalham juntos, a chance de conversa sobe antes mesmo do primeiro "oi".</p>
                <a href={whatsappHref(WA_MSG_HERO)} target="_blank" rel="noreferrer" className="fr-impact-cta">
                  Quero meu site
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          </motion.div>
        </section>

        <section className="fr-services" id="servicos">
          <SectionTitle
            kicker={"O que est\u00e1 errado hoje"}
            title={"Tr\u00eas jeitos de perder cliente sem perceber"}
            body={"N\u00e3o \u00e9 pregui\u00e7a sua. \u00c9 falta de lugar na internet que explica, prova e pede contato."}
          />

          <motion.div
            className="fr-pain-grid"
            variants={staggerGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
          >
            {painPoints.map((point, index) => (
              <motion.article
                key={point.num}
                variants={driftIn}
                transition={{ delay: index * 0.03 }}
                className="fr-pain-card"
              >
                <span>{point.num}</span>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </motion.article>
            ))}
          </motion.div>
          <motion.a
            href={whatsappHref(WA_MSG_HERO)}
            target="_blank"
            rel="noreferrer"
            className="fr-whatsapp-cta"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
          >
            <span className="fr-whatsapp-cta-copy">
              <strong>Quero meu site profissional</strong>
              <span>Clique aqui para nos chamar no WhatsApp</span>
            </span>
            <span className="fr-whatsapp-cta-icon" aria-hidden>
              <ArrowRight size={18} />
            </span>
          </motion.a>
        </section>

        <section className="fr-testimonials">
          <SectionTitle
            kicker="Depoimentos"
            title="Clientes que confiaram na Utopia"
            body={"Feedback de clientes que transformaram ideias em presen\u00e7a digital com a Utopia."}
          />
          <motion.article
            variants={driftIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-16% 0px" }}
            className="fr-testimonial-card"
          >
            <div className="fr-testimonial-inner">
              <div className="fr-client">
                <img src={ANA_AVATAR} alt="" />
                <span>
                  <strong>Ana Martins</strong>
                  <small>Fundadora, Lumina Studio</small>
                </span>
              </div>
              <p>
                {"A Utopia redefiniu nossa presen\u00e7a digital. Da primeira conversa ao lan\u00e7amento, tudo foi "}
                {"estrat\u00e9gico, r\u00e1pido e visualmente impec\u00e1vel. O site ficou premium e com uma jornada muito mais clara."}
              </p>
              <div className="fr-stars">{"\u2605\u2605\u2605\u2605\u2605"}</div>
            </div>
            <div className="fr-card-arrows">
              <button aria-label="Anterior">{"\u2039"}</button>
              <button aria-label={"Pr\u00f3ximo"}>{"\u203a"}</button>
            </div>
          </motion.article>
        </section>

        <section className="fr-process" id="processo">
          <SectionTitle
            kicker="Processo"
            title={"Seu projeto pronto nunca foi t\u00e3o simples"}
            body={"Da ideia ao lan\u00e7amento, voc\u00ea acompanha um fluxo direto, visual e sem enrola\u00e7\u00e3o."}
          />
          <motion.div
            className="fr-timeline"
            variants={staggerGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
          >
            {[
              ["Escolha o plano ideal", "Definimos escopo, prioridade e o que precisa entrar no ar primeiro."],
              ["Envie o briefing", "Voc\u00ea manda refer\u00eancias, objetivos e conte\u00fados por um fluxo simples."],
              ["Receba em alta velocidade", "Design e desenvolvimento avan\u00e7am juntos para reduzir retrabalho."],
            ].map(([title, body], index) => (
              <motion.article key={title} variants={driftIn} className={`fr-step fr-step-${index + 1}`}>
                <BadgeCheck size={18} />
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="fr-pricing" id="planos">
          <SectionTitle
            kicker="Planos"
            title={"Planos sob medida para toda ambi\u00e7\u00e3o"}
            body="Escolha o formato ideal para colocar sua opera\u00e7\u00e3o no ar com clareza, prazo e dire\u00e7\u00e3o."
          />

          <motion.div
            className="fr-price-stack"
            variants={staggerGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
          >
            {pricingPlans.map((plan) => {
              const expanded = openPlan === plan.slug;
              const Icon = plan.icon;
              return (
                <motion.article key={plan.slug} className={`fr-plan-card ${expanded ? "is-open" : ""}`} variants={driftIn}>
                  <button type="button" className="fr-plan-head" onClick={() => setOpenPlan(expanded ? "" : plan.slug)}>
                    <div className="fr-plan-copy">
                      <div className="fr-plan-topline">
                        <span>{plan.label}</span>
                        {plan.badge ? <i>{plan.badge}</i> : null}
                      </div>
                      {plan.eyebrow ? <small>{plan.eyebrow}</small> : null}
                      <strong>{plan.price}</strong>
                      <p>{plan.installment}</p>
                      <em>{plan.accent}</em>
                    </div>
                    <div className="fr-plan-side">
                      <span className="fr-plan-icon">
                        <Icon size={18} />
                      </span>
                      {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  <div className="fr-plan-panel">
                    <div className="fr-plan-panel-inner">
                      <ul>
                        {plan.items.map((item) => (
                          <li key={item}>
                            <Check size={16} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.cta ? (
                        <a href={plan.href} target="_blank" rel="noreferrer" className="fr-plan-cta">
                          <MessageCircle size={16} />
                          {plan.cta}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        <section className="fr-faq" id="faq">
          <SectionTitle
            kicker="FAQ"
            title={"Perguntas frequentes antes de come\u00e7ar"}
            body={"Tudo que voc\u00ea precisa saber para sair da ideia e colocar uma presen\u00e7a premium no ar."}
          />

          <motion.div
            variants={staggerGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            className="fr-accordion"
          >
            {faqs.map(([question, answer], index) => {
              const active = openFaq === index;
              return (
                <motion.article className={`fr-accordion-item ${active ? "is-open" : ""}`} key={question} variants={driftIn}>
                  <button type="button" onClick={() => setOpenFaq(active ? -1 : index)}>
                    <span>{question}</span>
                    <Plus size={20} />
                  </button>
                  <div className="fr-accordion-panel">
                    <p>{answer}</p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            className="fr-faq-cta"
          >
            <span>{"Ainda n\u00e3o encontrou a resposta?"}</span>
            <a href={whatsappHref(WA_MSG_HERO)} target="_blank" rel="noreferrer">
              Chamar no WhatsApp
              <MessageCircle size={13} />
            </a>
          </motion.div>
        </section>

        <section className="fr-contact" id="contato">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
            className="fr-contact-card"
          >
            <div className="fr-contact-inner">
              <SectionKicker>Contato</SectionKicker>
              <h2>Fale com a Utopia</h2>
              <p>{"Receba uma resposta em at\u00e9 6 horas \u00fateis."}</p>

              <form className="fr-contact-form" action={whatsappHref(WA_MSG_HERO)} target="_blank">
                <input type="text" name="name" placeholder="Digite seu nome" aria-label="Nome" />
                <input type="email" name="email" placeholder="Digite seu email" aria-label="Email" />
                <button type="submit">Enviar mensagem</button>
              </form>

              <div className="fr-contact-info">
                <span>Vamos conversar</span>
                <a href="tel:+554891434813">+55 48 9143-4813</a>
              </div>

              <div className="fr-contact-socials">
                <a href="https://www.instagram.com/utopia_digital.lab/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram size={14} />
                </a>
                <a href={whatsappHref(WA_MSG_HERO)} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <MessageCircle size={14} />
                </a>
                <a href="https://x.com/home" target="_blank" rel="noreferrer" aria-label="X">
                  <Twitter size={14} />
                </a>
              </div>
            </div>

            <footer className="fr-footer">
              <img src="/logo.png" alt="" />
              <span>{"\u00a9 Copyright 2026. Todos os direitos reservados."}</span>
            </footer>
          </motion.div>
        </section>
      </main>

      <BottomDock />
    </div>
  );
}
