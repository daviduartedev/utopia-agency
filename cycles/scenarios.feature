# language: pt

## Contexto: primeira impressão no hero

Funcionalidade: Fundo premium só no hero, sem confundir com o resto da página

  Cenário: Visitante vê o hero com profundidade visual própria
    Dado que abri a página principal da Utopia
    Quando estou na primeira vista (acima da dobra)
    Então o bloco principal do hero tem o tratamento visual rico definido para essa zona (incluindo o efeito WebGL do hero, quando aplicável)
    E o texto e o botão de conversão permanecem claros e fáceis de ler

## Contexto: resto da landing

Funcionalidade: Fundo geométrico subtil e contínuo nas secções abaixo do hero

  Cenário Outline: Movimento de fundo acompanha a página sem roubar atenção
    Dado que já passei o hero e estou a ver o conteúdo principal do site
    Quando rolo por <zona>
    Então percebo um padrão de grelha escuro e discreto por detrás do conteúdo
    E o movimento é suave o suficiente para não distrair da leitura
    E botões, links e formulários respondem ao toque ou clique sem atraso perceptível

    Exemplos:
      | zona              |
      | serviços          |
      | portfólio         |
      | pergunta frequente |
      | contacto          |

  Cenário: Interacção leve reforça sensação de produto tecnológico
    Dado que estou na área da página abaixo do hero com animação de fundo activa
    Quando movo o ponteiro pelo ecrã
    Então o fundo reage de forma subtil (sem rasto prolongado nem efeito chamativo)
    E o conteúdo continua visualmente prioritário face ao fundo

## Contexto: inclusão e dispositivos

Funcionalidade: Fundo animado respeita preferências e limites de telemóvel

  Cenário: Leitor que prefere menos movimento não é forçado ao mesmo nível de animação
    Dado que o sistema sinaliza preferência por menos movimento
    Quando navego pela landing fora do hero
    Então a animação contínua da grelha não me incomoda da mesma forma que com movimento total
    E ainda consigo usar a página normalmente

  Cenário Outline: Telemóvel estreito prioriza leitura e fluidez
    Dado que estou num telemóvel com viewport estreita
    Quando percorro a landing
    Então não sou confrontado com o mesmo nível de animação de fundo que no desktop largo
    E a rolagem e as interacções principais mantêm-se fluidas

    Exemplos:
      | condição        |
      | animação off   |
      | fundo estático |
