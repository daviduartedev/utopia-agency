# Plano (delta) — GradualBlur + portfólio com demos

## Estado anterior (resumo)

- `GradualBlur` existia no codebase com fallback para `prefers-reduced-motion` (gradiente estático, sem stack de `backdrop-filter`).
- Portfólio: 5 cases no carrossel Embla, sem links para demos ao vivo.
- Specs já falavam em blur **moderado** e sobretudo na seção Serviços.

## Delta desejado

### 1. GradualBlur entre seções

- **Onde:** cada montagem via `LazySection` que corresponde a uma seção de conteúdo **exceto** formulário de contato e rodapé. Hero permanece fora (não usa `LazySection`).
- **Onde fica no layout:** borda **inferior** do bloco (`position="bottom"`, `target="parent"`), véu fino entre a seção atual e a próxima — sem blur no topo das seções.
- **Parâmetros canônicos (definidos pelo time técnico):** `height: clamp(3.25rem, 5vw, 5rem)`, `strength: 1.5`, `divCount: 4`, `curve: "bezier"`, `exponential: false`, `opacity: 0.92`, `animated: false`, `zIndex` baixo o suficiente para ficar acima do fundo da seção mas sem competir com overlays globais (ex.: `30`).
- **`prefers-reduced-motion`:** manter comportamento atual do componente (fallback em gradiente, sem camadas de blur).

### 2. Portfólio

- Incluir **sexto** case: título `Site para jogos eletrônicos (CS2)`, layout `web`, imagem ` /portfolio-dr-black-skins.png`, legenda de escopo alinhada ao tom dos demais (sem métricas).
- Adicionar `demoUrl` opcional nos cases que têm demo: Emera Solar, Sua Barbearia, Dr. Black Skins. Abrir em **nova aba** com `rel="noopener noreferrer"`; rótulo acessível do tipo “Abrir demo de …”.
- Case ERP e placeholders sem URL continuam **não** clicáveis para demo.

### 3. Performance e QA

- Não introduzir dependência `mathjs` (implementação atual já dispensa).
- Smoke: rolagem longa na home, foco/teclado no carrossel, blur visível mas discreto; com “reduce” ativado, ausência de jank e fallback aceitável.

## Specs a atualizar

- `spec/features/conversion-landing/readme.md` — política de blur por seção.
- `spec/features/conversion-landing/sections/portfolio.md` — tabela com 6 cases e contrato de links.
- `spec/performance-budget.md` — múltiplas instâncias de `GradualBlur` e mitigação.
- `spec/design-system.md` — alinhar §5/§8 ao uso transversal conservador.
