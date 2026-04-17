# language: pt
Funcionalidade: Landing focada em conversão da Utopia

  Para validar se a landing da Utopia cumpre o seu papel de converter
  um visitante — fundador solo — em conversa no WhatsApp (ou lead no
  formulário), os cenários abaixo descrevem **comportamentos observáveis**
  pelo usuário. Detalhes de implementação (componentes, classes, libs)
  ficam em `spec/features/conversion-landing/`.

  Contexto:
    Dado que o visitante acessa a home da Utopia em PT-BR
    E o idioma do navegador é português
    E a página é renderizada até o final sem erros

  Cenário: Entende a proposta em poucos segundos
    Quando o visitante carrega a home
    Então o hero exibe uma headline que descreve o que a Utopia entrega
    E um subtítulo que explica para quem é e o que inclui
    E um CTA primário visível sem precisar rolar a página

  Cenário: Reconhece a própria dor antes de ver a solução
    Quando o visitante rola para a seção "Problema"
    Então ele vê nomeadas três dores concretas do seu contexto
    E cada dor aponta um impacto prático (perda de contato, custo ou abandono)
    E a seção seguinte é apresentada como resposta direta a essas dores

  Cenário: Compreende os serviços oferecidos
    Quando o visitante chega à seção de serviços
    Então ele vê, em ordem, Landing Pages, Sistemas SaaS e Aplicativos
    E cada serviço diz, em uma frase, para que serve e quando faz sentido

  Cenário: Entende por que escolher a Utopia
    Quando o visitante vê a seção de diferenciais
    Então há no máximo quatro diferenciais curtos, orientados a entrega real
    E nenhum deles usa frases genéricas de marketing

  Cenário: Sabe como será o processo antes de pedir orçamento
    Quando o visitante lê a seção "Como funciona"
    Então ele enxerga cinco etapas numeradas do briefing ao suporte
    E cada etapa tem uma frase objetiva sobre o que acontece ali

  Esquema do Cenário: Explora a prova social da Utopia
    Quando o visitante interage com a seção "<seção>"
    Então ele pode navegar pelos itens no desktop e no mobile
    E o conteúdo é legível sem sobreposição com o restante da página
    Exemplos:
      | seção       |
      | Portfólio   |
      | Depoimentos |

  Cenário: Navega o portfólio horizontalmente
    Dado que o visitante está na seção "Portfólio"
    Quando ele usa o botão "próximo" ou arrasta o carrossel
    Então o case seguinte entra em foco com ancoragem (snap)
    E o teclado (setas esquerda/direita) também navega entre os cases

  Cenário: Sabe exatamente o que está sendo vendido
    Quando o visitante chega à seção "Oferta"
    Então ele vê o preço inicial de Landing Page em "a partir de R$ 999"
    E vê "sob consulta" para Sistema SaaS e Aplicativo
    E a condição de parcelamento em até 3 vezes é explícita
    E cada oferta lista, sem ambiguidade, o que está incluso
    E a mensagem "1 mês de suporte gratuito" está presente
    E a regra de sinal — no mínimo 30% ou 1 parcela — está visível

  Cenário: Tira dúvidas recorrentes antes de comprar
    Quando o visitante abre uma pergunta do FAQ
    Então a resposta é exibida sem recarregar a página
    E o restante do FAQ continua acessível

  Cenário: WhatsApp é o caminho primário em todos os pontos de conversão
    Quando o visitante clica em qualquer CTA primário da página
    Então abre uma conversa no WhatsApp da Utopia em nova aba
    E a mensagem vem pré-preenchida indicando a origem do clique (hero, menu, rodapé, oferta, CTA final, botão flutuante)

  Cenário: Prefere escrever e usa o formulário
    Dado que o visitante está na seção "Contato"
    Quando ele preenche nome, e-mail, telefone, tipo de projeto e mensagem válidos
    E envia o formulário
    Então o lead é registrado na base da Utopia
    E o WhatsApp é aberto com a mensagem montada a partir do formulário
    E o visitante recebe confirmação visível do envio

  Cenário: Recebe feedback útil ao errar o formulário
    Dado que o visitante está na seção "Contato"
    Quando ele envia o formulário com um campo obrigatório faltando ou inválido
    Então vê uma mensagem clara indicando o problema
    E o lead não é registrado

  Cenário: Navega a landing pelo menu superior
    Quando o visitante clica em um item do menu
    Então a página rola suavemente até a seção correspondente
    E o rótulo "Falar agora" abre o WhatsApp em nova aba

  Cenário: Usa a landing em celular estreito
    Dado que o visitante acessa por um dispositivo com largura < 640px
    Quando ele abre o menu
    Então o menu se expande ocupando a largura total
    E o CTA primário permanece acessível com um toque
    E nenhum bloco quebra o layout horizontalmente

  Cenário: Identifica o botão flutuante do WhatsApp
    Quando o visitante rola além da dobra
    Então vê um botão flutuante com o logo do WhatsApp
    E ao clicar, abre a mesma conversa pré-preenchida em nova aba

  Cenário: A copy respeita o tom premium sem cair em clichê
    Quando o visitante lê qualquer seção da página
    Então ele não encontra as frases proibidas listadas em `spec/content-guidelines.md`
    E os depoimentos, portfólio e diferenciais descrevem entregas concretas, não promessas genéricas
