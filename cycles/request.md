O projeto possui uma landing page moderna e precisa de um background visual dinâmico para aumentar percepção de qualidade e sofisticação.

Atualmente:

O fundo é estático ou inexistente
Falta sensação de tecnologia / movimento
A interface está funcional, mas visualmente comum

Objetivo é elevar o nível para algo próximo de SaaS premium.

Intent

Implementar um background animado utilizando ShapeGrid (canvas) com as seguintes características:

Movimento contínuo e suave
Grid geométrico (square inicialmente)
Interação leve com hover
Aparência discreta (não competir com conteúdo)
Escopo técnico
Criar componente ShapeGrid
Integrar no layout principal (Hero inicialmente)
Posicionar como background absoluto
Garantir que conteúdo fique acima
Constraints
UI / UX
O background não pode prejudicar legibilidade
Deve ser sutil e elegante, não chamativo
Opacidade reduzida
Cores escuras e neutras
Conteúdo sempre em primeiro plano (z-index)
Performance
Uso de requestAnimationFrame otimizado
Evitar re-render desnecessário
Canvas deve se adaptar ao resize
Não travar scroll ou interações
Considerar fallback ou desativação em mobile
Responsividade
Desktop → efeito completo
Mobile → reduzir ou desativar animação
Implementation Requirements
Estrutura base
<div className="relative w-full h-screen overflow-hidden">
  <ShapeGrid />

  <div className="relative z-10">
    {/* conteúdo */}
  </div>
</div>
Componente

Usar o ShapeGrid fornecido, garantindo:

useRef para canvas
useEffect para lifecycle
cleanup correto (removeEventListener + cancelAnimationFrame)
Configuração recomendada
<ShapeGrid
  speed={0.3}
  squareSize={40}
  direction="diagonal"
  borderColor="#2F293A"
  hoverFillColor="#222"
  shape="square"
  hoverTrailAmount={0}
/>
CSS obrigatório
.shapegrid-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.35;
  pointer-events: none;
}
Regras importantes
Nunca usar o ShapeGrid como elemento de conteúdo
Nunca competir com textos (contraste sempre priorizado)
Não usar cores claras ou vibrantes
Não aumentar velocidade ao ponto de distrair
Melhorias opcionais (se fizer sentido)
Adicionar overlay gradiente por cima do canvas
Ajustar intensidade com base no tema (dark/light)
Lazy load do componente
Toggle de performance (ex: desativar em dispositivos fracos)
Tarefa
Integrar o componente ShapeGrid no projeto
Ajustar posicionamento como background
Garantir que não afete conteúdo
Otimizar performance
Validar comportamento em desktop e mobile

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

{!isMobile && <ShapeGrid ... />}
speed={0.2}