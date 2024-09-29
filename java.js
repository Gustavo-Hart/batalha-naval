const teclado = require('prompt-sync')({sigint:true});
// Condição que faz reiniciar o jogo
Fim_jogo = false;

while(Fim_jogo == false){
    let Tabuleiro = [];
    let Qtd_Barcos = 10;
    let Qtd_Jogadas = 12;
    let Qtd_Tiros = 12;
    let JogadaX = 0;
    let JogadaY = 0;    
    let Pontos = 0;
    let Ganhador = 0;

    for (let i = 0; i < 5; i++) {
        Tabuleiro[i] = [];
        for (let j = 0; j < 5; j++) {
            Tabuleiro[i][j] = false;
        }
    }
    //console.log(Tabuleiro);
    for(let i=0;i<Qtd_Barcos;i++){
        let posX = parseInt(Math.floor(Math.random() * 5));
        let posY = parseInt(Math.floor(Math.random() * 5));  
        Tabuleiro[posX][posY] = true;
    } 
    console.log(Tabuleiro);

    for(let i = 0; i < Qtd_Jogadas; i++){
        JogadaX = parseInt(teclado("digite a posição do tiro em x: "));
        JogadaY = parseInt(teclado("digite a posição do tiro em y: "));
        if(!isNaN(JogadaX) || !isNaN(JogadaY)){
            console.log("digite um número válido");
            JogadaX = parseInt(teclado("digite a posição do tiro em x: "));
            JogadaY = parseInt(teclado("digite a posição do tiro em y: "));
        }
        Qtd_Tiros--;
    
        if(Tabuleiro[JogadaX][JogadaY] === true){
            console.log("*************************************");
            console.log("********  BARCO AFUNDADO ********");
            console.log("*************************************");
            Tabuleiro[JogadaX][JogadaY] = false;
            Pontos += 10; 
        }
        else if(Tabuleiro[JogadaX][JogadaY] === false){
            console.log("*************************************");
            console.log("********  TIRO NA AGUA ********");
            console.log("*************************************");
        }
        console.log("*************************************");
        console.log("** Quantidade tiros:",Qtd_Tiros);
        console.log("** Pontos:",Pontos);
        console.log("*************************************");
        // Se os tiros acabaram o jogo deve ser encerrado
        if(Qtd_Tiros == 0){
            console.log("*************************************");
            console.log("** PARABENS VOCÊ VENCEU **");
            console.log("*************************************");
            let Continuar = teclado("** Digite n para jogar novamente ou qualque tecla para sair **");
            if(Continuar == "n"){
                Fim_jogo = false;
                if(Pontos > 60){
                    console.log("*************************************");
                    console.log("** PARABENS VOCÊ VENCEU **");
                    console.log("*************************************");
                }else{
                    console.log("*************************************");
                    console.log("** QUE PENA VOCÊ PERDEU **");
                    console.log("*************************************");
                }
            }else{
                if(Ganhador > 6){
                    console.log("*************************************");
                    console.log("** PARABENS VOCE VENCEU **");
                    console.log("*************************************");
                }else{
                    console.log("*************************************");
                    console.log("** QUE PENA VOCÊ PERDEU **");
                    console.log("*************************************");
                }
                Fim_jogo = true;
            }
        }
    }
}

