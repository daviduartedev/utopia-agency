# Produto — Utopia Studio

## 1. Visão

Utopia é um estúdio que entrega **produto digital pronto para vender**: landing pages, sistemas SaaS e aplicativos customizados — rápido, com padrão premium e processo enxuto.

A proposta comercial da Utopia é **transformar briefing em produto no ar** com o menor atrito possível: prazos curtos, preço comunicado com clareza e entrega completa (design, código, domínio, hospedagem, suporte inicial).

## 2. ICP — Ideal Customer Profile

**Fundador solo** (ou equipe pequena até ~5 pessoas) que:

- está lançando ou tentando relançar um produto/serviço;
- tem presença digital fraca ou inexistente e sabe que isso custa oportunidades;
- **não converte visita em contato** — o site não cumpre papel comercial;
- foge de agência grande (ciclo longo, orçamento fora da realidade) e de freelancer barato (risco de inacabado);
- decide e assina sozinho — não há comitê, não há compras, não há TI interna.

Sinais que desqualificam o lead:
- projeto sem budget inicial compatível com o posicionamento (ver `offer.md`);
- escopo muito difuso ("quero um aplicativo para todo mundo usar");
- expectativa de suporte pós-entrega indefinido e gratuito.

## 3. Posicionamento

- **Alto ticket acessível para fundador solo**: preço-âncora em Landing Page (`a partir de R$ 999`, parcelável em 3×) e "sob consulta" nos projetos maiores (SaaS, aplicativos).
- Tom **sóbrio, factual, confiante**. Nunca marketeiro-clichê (ver `content-guidelines.md`).
- Prova é qualitativa por enquanto: cases descritos por escopo e contexto, sem número inventado.

## 4. Oferta principal (comercial)

| Serviço | Preço | Prazo |
|---|---|---|
| Landing Page | a partir de **R$ 999** | **até 7 dias** |
| Sistema SaaS | sob consulta | sob consulta |
| Aplicativo | sob consulta | sob consulta |

**Condições comuns:**
- Parcelável em até **3×**.
- **Sinal mínimo de 30% (ou 1 parcela)** para iniciar o projeto.
- **1 mês de suporte gratuito** pós-entrega.
- Inclusões: design Figma, código-fonte, domínio + hospedagem configurados, SEO técnico básico, analytics, revisões na proposta.

Detalhes comerciais por serviço em [`features/conversion-landing/sections/offer.md`](features/conversion-landing/sections/offer.md).

## 5. Canais de venda

1. **WhatsApp** (`+55 48 9143-4813`) — canal primário. Cada CTA da LP gera uma mensagem pré-preenchida distinta (ver `integrations.md`).
2. **Formulário do site** (gravado em Supabase `contact_submissions`) — canal alternativo para quem prefere escrita assíncrona; ao enviar, o formulário também abre o WhatsApp com os dados compilados.

Sem CRM externo. Sem pipeline automatizado ainda.

## 6. Nome, marca e domínio

- Razão social/marca pública: **Utopia Studio**.
- Domínio canônico: `https://utopia.app.br/`.
- Logo: `public/logo.png` + wordmark em `BrandLogo.tsx`.

## TODO (futuros ciclos)

- Publicar página institucional `/sobre` quando houver história real a contar.
- Criar mini-casos de sucesso com métricas reais auditáveis assim que dois clientes autorizarem.
- Integrar CRM quando o volume de lead justificar (provavelmente HubSpot Starter).
