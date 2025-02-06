let amigos = []; // Lista que armazena os nomes dos participantes
let resultadoSorteio = {}; // Guarda os pares sorteados
let filaParticipantes = []; // Lista de quem ainda não viu seu sorteio

// Função que exibirá um texto dentro de um elemento HTML
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Seleciona o elemento pela tag (ex: 'h1', 'h2')
    if (campo) { 
    campo.innerHTML = texto; // Define o conteúdo do elemento
    }
}

// Exibe a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Amigo Secreto');
    exibirTextoNaTela('h2', 'Digite o nome dos participantes!');
}

// Chama a função para exibir a mensagem inicial quando a página carrega
exibirMensagemInicial();

// Adiciona um participante à lista de amigos
function adicionarAmigo() {
    let input = document.getElementById("amigo"); // Obtém o campo de entrada de nome
    let amigo = input.value.trim() // Pega o valor digitado e remove espaços extras

// Verifica se o nome não está vazio e se ainda não foi adicionado
    if (amigo !== "" && !amigos.includes(amigo)) {
        amigos.push(amigo); // Adiciona o nome na lista
        atualizarLista(); // Atualiza a exibição da lista na tela
    }
    input.value = ""; // Limpa o campo de entrada

      // Seleciona o campo de entrada para o próximo nome
      input.focus(); // Essa linha foi adicionada
}

// Atualiza a lista de amigos na interface
function atualizarLista() {
    let lista = document.getElementById("listaAmigos"); // Obtém a lista no HTML
    lista.innerHTML = ""; // Limpa a lista antes de atualizar

     // Cria um único <li> para todos os nomes
     let item = document.createElement("li");

     // Formata os nomes com vírgulas e "e"
    if (amigos.length === 1) {
        item.textContent = amigos[0]; // Apenas um nome
    } else if (amigos.length > 1) {
        let todosNomes = amigos.slice(0, -1).join(", ") + " e " + amigos[amigos.length - 1];
        item.textContent = todosNomes;
    }

    lista.appendChild(item); // Adiciona o <li> na lista

}

// Realiza o sorteio dos amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) { // Verifica se há participantes suficientes para sortear
        alert("Adicione pelo menos 2 amigos para sortear");
        return;
    }

    let sorteio = [...amigos]; // Copia a lista original para fazer o sorteio
    let resultado = [];

    do {
        sorteio =  embaralharLista([...amigos]); // Embaralha os nomes
    } while (temRepetidos(amigos, sorteio)); // Garante que ninguém tire a si mesmo

    resultadoSorteio = {}; // Limpa o resultado anterior
    filaParticipantes = [...amigos]; // Adiciona todos os participantes à fila

// Associa cada participante ao seu amigo secreto sorteado
    for (let i = 0; i < amigos.length; i++) {
        resultadoSorteio[amigos[i]] = sorteio[i]; // Exemplo: { 'João': 'Maria' }
    }

    alert("Sorteio realizado! Agora cada participante pode ver seu amigo secreto individualmente.");
}

// Permite que um participante veja seu amigo secreto
function revelarAmigoSecreto() {
    let nomeDigitado = document.getElementById("nomeRevelar").value.trim(); // Obtém o nome digitado

    if (!filaParticipantes.includes(nomeDigitado)) { // Verifica se o nome está na lista de espera
        alert("Esse nome já viu seu amigo secreto ou não está na lista!");
        return;
    }

    alert(`Seu amigo secreto é: ${resultadoSorteio[nomeDigitado]}`); // Mostra o amigo sorteado

    // Remove esse nome da fila para que ele não veja de novo
    filaParticipantes = filaParticipantes.filter(nome => nome !== nomeDigitado);

    document.getElementById("nomeRevelar").value = ""; // Limpa o campo de entrada

    // Se todos já viram seus amigos secretos, exibe uma mensagem final
    if (filaParticipantes.length === 0) {
        alert("Todos já descobriram seus amigos secretos! Agora é só aguardar o evento.");
        reiniciarJogo(); // Reinicia o jogo
    }
    document.getElementById("nomeRevelar").focus(); // Seleciona o campo de revelarNome para o próximo nome
}

function reiniciarJogo() {
    // ... (outras linhas da função)

    alert("O jogo foi reiniciado!");

    location.reload(); // Essa linha foi adicionada
}

// Embaralha os nomes na lista usando o algoritmo de Fisher-Yates
function embaralharLista(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório
        [lista[i], lista[j]] = [lista[j], lista[i]]; // Troca os elementos da lista de posição
    }
    return lista;
}

// Verifica se alguém tirou a si mesmo no sorteio
function temRepetidos(original, sorteado) {
    return original.some((amigo, i) => amigo === sorteado[i]);  // Retorna true se houver repetições
}

