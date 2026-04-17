# FAQ

**Componente:** `src/app/components/Faq.tsx`.
**Posição:** 10ª seção (após Oferta).
**Âncora:** `#faq`.

## 1. Objetivo de funil

Derrubar as últimas objeções antes do CTA final. Perguntas escritas na 1ª pessoa do visitante, respostas sóbrias e diretas.

## 2. Copy canônica

- **Eyebrow**: `Dúvidas frequentes`
- **Title**: `Perguntas que todo cliente faz.`
- **Description**: `Se a sua dúvida não estiver aqui, é só mandar uma mensagem — respondemos rápido.`

### Itens (ordem fixa)

1. **`Qual é o prazo médio de entrega?`**
   `Landing page em até 7 dias. Sistemas SaaS e aplicativos ficam "sob consulta" — o prazo é combinado na proposta, antes de você confirmar qualquer coisa.`

2. **`Preciso ter todo o conteúdo pronto para começar?`**
   `Não. Trabalhamos com o que você tem e ajudamos a estruturar o resto. Textos, imagens e materiais podem ser desenvolvidos ao longo do projeto — inclusive com apoio de copy quando necessário.`

3. **`Como funciona o pagamento?`**
   `Sinal mínimo de 30% (ou 1 parcela) para iniciar. O restante é parcelado em até 3×, alinhado às entregas na proposta.`

4. **`Posso solicitar alterações durante o projeto?`**
   `Sim. Existem rodadas de revisão previstas em cada etapa — design e desenvolvimento. Alterações fora do escopo acordado são tratadas como adicional, sempre com cotação transparente.`

5. **`Vocês fazem manutenção pós-entrega?`**
   `Todo projeto já inclui 1 mês de suporte gratuito após o lançamento. Para manutenção contínua, atualizações e novas funcionalidades, fechamos um plano mensal ao final do projeto.`

6. **`Vocês atendem fora do Brasil?`**
   `Sim. Trabalhamos 100% remoto. Atendimento em português ou inglês; pagamento em BRL ou USD.`

> Alinhamentos feitos neste ciclo vs. versão anterior:
> - item 1 referencia os prazos reais (LP até 7 dias, demais sob consulta);
> - item 3 troca "50% + 50%" por "sinal mínimo de 30% ou 1 parcela" + "até 3×";
> - item 5 explicita "1 mês de suporte gratuito" (alinhado com `offer.md`).

## 3. Visual

- `bg-page-surface py-20 md:py-24`, hairlines top/bottom.
- Accordion Radix — um aberto por vez (`type="single" collapsible`).
- `max-w-3xl` centralizado, padding lateral padrão.

## 4. Acessibilidade

- Accordion já entrega `aria-expanded`/`aria-controls` via Radix.
- Títulos das perguntas em `<button>` semântico (o Radix resolve).
- Ordem DOM = ordem de leitura.

## 5. Não fazer

- Não inflar para 10+ perguntas — FAQ curto é lido até o fim.
- Não colocar pergunta sobre "por que escolher a Utopia" — isso é papel de `Differentiators`.
- Não divergir do `product.md` em prazos/preços. Se atualizar aqui, atualizar lá na mesma PR.
