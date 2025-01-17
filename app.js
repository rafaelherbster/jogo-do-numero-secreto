let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    let palavraTentativas = tentativas > 1
    ? 'tentativas':'tentativa'

    let mensagemTentativa = `Você descobriu o número secreto em ${tentativas} ${palavraTentativas}`;

    chute == numeroSecreto 
    ? (exibirTextoNaTela('h1', 'Acertou!'), exibirTextoNaTela('p', mensagemTentativa),
        document.getElementById('reiniciar').removeAttribute('disabled'),
        document.getElementById('chutar').setAttribute('disabled',true)) 

    : (chute > numeroSecreto 
    ? exibirTextoNaTela('h1', `O numero secreto é menor que ${chute} !`)
    : exibirTextoNaTela('h1', `O numero secreto é maior que ${chute} !`),

    tentativas++,
    limparCampo());

}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 4.0; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    return numeroEscolhido;
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}