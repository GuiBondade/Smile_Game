//declaraçao das variaveis globais
    let desempenho = 0;
    let tentativas = 0;
    let acertos = 0;
    let jogar = true;

    //captura os botoes pelos ids e adiciona um evento de clique
    const btnReiniciar = document.getElementById('reiniciar');
    const btnJogarNovamente = document.getElementById('joganovamente');
    const overlayJogarNovamente = document.getElementById('overlay-jogar-novamente');

    //funçao que zera os valores das variáveis controladoras
    function reiniciar() {
      desempenho = 0;
      tentativas = 0;
      acertos = 0;
      jogar = true;
      jogarNovamente();
      atualizaPlacar(0, 0);
      //esconde o botao jogarnovamente alterando a classe css (className)
      overlayJogarNovamente.className = 'invisivel';
      //oculta o botao reiniciar alterando a classe css (className)
      btnReiniciar.classList.add('invisivel');

      // Remove todas as imagens de erro
      document.querySelectorAll('#imagem-erro').forEach(function(img) {
        img.remove();
      });

      // Remove a imagem do Smile, se existir
      let imagem = document.getElementById("imagem");
      if (imagem) {
        imagem.remove();
      }
    }

    //funçao jogar novamente
    function jogarNovamente() {
      jogar = true;//variável jogar volta a ser verdadeira
      //armazenamos todas as div na variável divis (getElementsByTagName)
      let cartas = document.querySelectorAll('.inicial, .acertou, .errou');
      //percorremos todas os objetos com classe inicial, acertou ou errou
      for (i = 0; i < cartas.length; i++) {
        //e adicionames a classe inicial e col-4 para cada carta
        cartas.forEach(function(carta) {
          carta.className = "inicial";
        });
      }

      // Remove todas as imagens
      document.querySelectorAll('#imagem').forEach(function(img) {
        img.remove();
      });

      // Esconde o overlay ao clicar no botão
      overlayJogarNovamente.className = 'invisivel';
      btnReiniciar.classList.add('visivel'); // Mostra o botão reiniciar ao reiniciar o jogo
    }

    //funçao que atualiza o placar
    function atualizaPlacar(acertos, tentativas) {
      //calcula o desempenho em porcentagem
      desempenho = (acertos / tentativas) * 100;
      //escreve o placar com os valores atualizados (innerHTML)
      document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

    }

    //funçao para inserir imagem após o jogador clicar em uma carta 
    function inserir_imagem(obj, status) {
      //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
      const img = new Image(100);
      img.id = "imagem";
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      if (status) {
      obj.className = "acertou";
      //altera o atributo src (source) da imagem criada
      img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
      } else {
      obj.className = "errou";
      //altera o atributo src (source) da imagem criada
      img.src = "./imagens/errou.png";
      }
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      obj.appendChild(img);
    }

    //Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
    function verifica(obj) {
      //se jogar é verdadeiro
      if (jogar) {
        //jogar passa a ser false
        jogar = false;
        //incrementa as tentativas
        tentativas++;
        //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
        let sorteado = Math.floor(Math.random() * 9);
        //se o id da <div> escolhida pelo jogador for igual ao número sorteado
        if (obj.id == sorteado) {
          //chama a funçao acertou passando a div escolhida pelo jogador
          inserir_imagem(obj, true);
          //incrementa o contador de acertos
          acertos++;
        } else {//se errou a tentativa
          //altera a classe da <div> escolhida pelo jogador para a classe errou
          obj.className = "errou";
          // Adiciona a imagem de erro na carta escolhida
          inserir_imagem(obj, false)
          //armazena a div aonde Smile está escondido (getElementById)
          const objSorteado = document.getElementById(sorteado);
          //chama a funçao acertou para mostrar a div aonde está o Smile
          inserir_imagem(objSorteado, true);
        }
        //chama a funçao que atualiza o placar
        atualizaPlacar(acertos, tentativas);
        //mostra o overlay de jogar novamente alterando a classe css (getElementById e className)
        overlayJogarNovamente.className = 'visivel';
        //verifica se jogou 3 vezes
        if (tentativas == 3) {
          // Mostra o botão reiniciar após o terceiro clique
          btnReiniciar.classList.remove('invisivel');
        }
      } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
        alert('Clique em "Jogar novamente"');
      }
    }

//adiciona eventos aos botões
  btnJogarNovamente.addEventListener('click', jogarNovamente);
  btnReiniciar.addEventListener('click', reiniciar);