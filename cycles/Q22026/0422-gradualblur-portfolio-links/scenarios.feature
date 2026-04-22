# language: pt
# Cenários de negócio — GradualBlur + portfólio com demos

Funcionalidade: Landing de conversão
  Como visitante da home
  Quero perceber transições suaves entre seções e poder abrir demos de trabalhos
  Para confiar no portfólio e navegar sem atrito

  Cenário: Transição visual discreta entre seções de conteúdo
    Dado que estou na página inicial com movimento reduzido desativado
    Quando rolo pela página além do hero
    Então percebo um véu suave no limite inferior das seções de conteúdo principais
    E não percebo o mesmo véu no bloco do hero, nem no rodapé final, nem no bloco do formulário de contato

  Cenário: Conforto com movimento reduzido do sistema
    Dado que ativei "reduzir movimento" no sistema operacional ou navegador
    Quando percorro a mesma página inicial
    Então o limite entre seções continua legível sem depender de camadas pesadas de desfoque animado

  Esquema do cenário: Abrir demo de um case de portfólio
    Dado que estou na seção de portfólio
    Quando escolho o case "<título>"
    E aciono a área interativa que leva à demo
    Então abro o site de demonstração correspondente em nova aba

    Exemplos:
      | título                                  |
      | LP para loja de painéis solares         |
      | App de agendamento para barbearia       |
      | Site para jogos eletrônicos (CS2)       |

  Cenário: Cases sem demo permanecem apenas informativos
    Dado que estou na seção de portfólio
    Quando localizo o case "ERP para lojistas" ou um case marcado como em breve
    Então não há ação que abra site de demonstração a partir da pré-visualização desse slide
