# Privacidade e LGPD

**Estado atual: a landing não coleta dados de tracking.** O único dado pessoal capturado é o do formulário de contato, com base legal em **execução de contrato / diligência pré-contratual** (Lei 13.709/2018, art. 7º, V). Este ciclo não altera esse fluxo.

## 1. Dados coletados

| Fonte | Dado | Finalidade | Base legal |
|---|---|---|---|
| Formulário `ContactFormSection` | nome, e-mail, telefone, tipo de projeto, mensagem | responder proposta comercial e iniciar projeto | art. 7º, V — diligência pré-contratual |
| WhatsApp | mensagem iniciada pelo usuário | atendimento | art. 7º, V |

Não há cookies de tracking. Não há pixel de anúncio. Não há analytics.

## 2. Armazenamento

- `contact_submissions` vive no projeto Supabase da Utopia.
- RLS garante `insert` apenas (`anon`). Leitura só via painel Supabase logado como admin.
- Retenção: **indefinida** no estado atual (ponto aberto — ver TODO).

## 3. Compartilhamento

- Nenhum dado é compartilhado com terceiros além do provedor Supabase (que atua como operador).
- A abertura do WhatsApp é **iniciada pelo usuário**: a Utopia não envia o número do visitante para o WhatsApp — é o visitante que escolhe mandar.

## 4. Páginas legais

Hoje o rodapé (`Footer.tsx`) tem links `Termos` e `Privacidade` apontando para `#` — **sem conteúdo**. Isso é débito técnico-legal.

## TODO (futuros ciclos)

- Criar páginas reais `/termos` e `/privacidade`, com:
  - identificação do controlador (razão social, CNPJ, endereço, e-mail do encarregado);
  - finalidade e base legal de cada dado;
  - política de retenção (sugestão inicial: 24 meses após último contato);
  - direitos do titular (art. 18 LGPD) e canal para exercício;
  - política de cookies (mesmo que o uso seja nulo — documentar é precauçao).
- Definir encarregado (DPO) — pode ser o próprio fundador até escalarmos.
- Se introduzirmos analytics com cookies (ex.: GA4), implementar banner de consentimento antes de carregar o script.
- Anexar Termo de Uso do formulário (mini-texto sob o botão): "Ao enviar, você concorda com nossa Política de Privacidade."
- Documentar procedimento interno para excluir lead mediante solicitação do titular.
