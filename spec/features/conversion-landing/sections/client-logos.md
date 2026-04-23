# Logos de clientes (prova social)

**Componente (novo):** `src/app/components/ClientLogos.tsx`.
**Posição:** 3ª seção (entre Problema e Serviços).
**Âncora:** `#clientes`.

## 1. Objetivo de funil

Prova social leve imediatamente após reconhecer a dor em "Problema". Mostra que **já existem empresas** que confiaram — sem distrair, sem ocupar fold inteiro.

## 2. Estrutura

- Reaproveita `LogoLoop` (de `src/app/components/ui/LogoLoop.tsx`) já usado no projeto, mas com **dataset de clientes** (distinto da seção de stack técnica).
- `LogoCloud.tsx` original segue existindo no repo, porém não é montado em `App.tsx` nesta versão — permanece disponível como "stack técnica" para um eventual bloco futuro.

## 3. Copy canônica

- **Rótulo único acima dos logos** (`<p>`, caixa alta, tracking amplo): `Marcas que já passaram por aqui`
- Sem título maior; sem description. É um banner silencioso.

## 4. Dataset (placeholders)

SVGs em `public/logos/` usam `currentColor` no ficheiro; como são renderizados via `<img>`, no DOM **não** herdam cor — no `ClientLogos` aplica-se **filtro** (`brightness(0) invert`) para marcas claras sobre `#0a0a0a`.

| # | Nome | Arquivo |
|---|---|---|
| 1 | Acme | `public/logos/acme.svg` |
| 2 | Northwind | `public/logos/northwind.svg` |
| 3 | Helix Labs | `public/logos/helix-labs.svg` |
| 4 | Umbra | `public/logos/umbra.svg` |
| 5 | Tessera | `public/logos/tessera.svg` |
| 6 | Lumen | `public/logos/lumen.svg` |
| 7 | Paraglide | `public/logos/paraglide.svg` |
| 8 | Vantage | `public/logos/vantage.svg` |

Nomes e wordmarks são **genéricos realistas** — nenhum remete a marcas existentes. Serão substituídos por logos reais assim que houver autorização escrita dos clientes.

## 5. Visual

- `bg-page-surface py-14 md:py-16`.
- Rótulo com contraste legível (`text-zinc-300`, semibold).
- Logos em altura 32px; filtro claro + opacidade ~0,9, hover a 1; gap 64px.
- Marquee contínuo para a esquerda (`speed: 60`).
- `pauseOnHover` e `fadeOut` nas bordas (cor `#0a0a0a`, igual ao fundo).

## 6. Acessibilidade

- `<section aria-labelledby="clientes-heading">` com `<p id="clientes-heading">` como rótulo.
- `ariaLabel` do LogoLoop: `"Clientes da Utopia"`.
- Cada `<img>` tem `alt` próprio (nome do cliente).
- `prefers-reduced-motion`: respeitado dentro do `LogoLoop` (marquee reduzido).

## 7. Não fazer

- Não inflar com "+50 empresas" ou "+10k projetos".
- Não misturar com logos de stack técnica (esse é o papel do `LogoCloud.tsx`).
- Não trocar por foto/grid colorido — logos mono-cor mantêm a leitura premium.

## 8. Divergência vs. plan

O `plan.md` inicial mencionava reaproveitar o componente `LogoCloud`. Optou-se por criar `ClientLogos.tsx` dedicado para preservar a semântica do `LogoCloud` (stack técnica) e facilitar a troca futura por logos reais sem ambiguidade.
