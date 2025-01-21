let listaNumeroSorteado = [];
let limeteDeNumero = 10 ;
let numeroSecreto = geradorDeNumerosAleatorio();
let tentativas = 1;

//mostra as mensagens iniciais do jogo
function mostrarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}
//mostra as mensagens iniciais do jogo
function exibirMensagem() {
    mostrarTextoNaTela('h1', 'Jogo do numero secreto')
    mostrarTextoNaTela('p', 'escolha um numero de 1 a 10.')

}
exibirMensagem();

//verifica se o chute esta correto
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {

        mostrarTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `voce descobrio o numero secreto com ${tentativas} ${palavraTentativa}!`
        mostrarTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            mostrarTextoNaTela('p', 'o numero secreto é menor ');
        } else {
            mostrarTextoNaTela('p', 'o numero secreto é maior');
        }
    }
    tentativas++
    limparCampo();
}
//gera numeros aleatorios(zera a lista quando todos os numeros se repete)
function geradorDeNumerosAleatorio() {
    let numeroSorteado = parseInt(Math.random() * limeteDeNumero + 1);
    let quantidadeDeElementosDaLista = listaNumeroSorteado.length;

    if (quantidadeDeElementosDaLista == limeteDeNumero) {
        listaNumeroSorteado = [];
    }

    if (listaNumeroSorteado.includes(numeroSorteado)) {
        return geradorDeNumerosAleatorio();
    } else {
        listaNumeroSorteado.push(numeroSorteado);
        console.log(listaNumeroSorteado);
        return numeroSorteado;
    }
}
//limpa o campo quanto ocorre um chute errado
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
//cria um novo jogo
function reiniciarJogo() {
    numeroSecreto = geradorDeNumerosAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagem();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}