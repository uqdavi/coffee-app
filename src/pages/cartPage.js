// cartPage.js
// Página do carrinho: lista os itens, permite aumentar/diminuir
// a quantidade, mostra o total e leva para o checkout.

import { getCart, addToCart, removeFromCart, getTotal } from '../cart/cartStorage.js';

// Transforma um número em texto de dinheiro. Exemplo: 4.5 vira "R$ 4,50"
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


// Cria a linha (<tr>) de UM item do carrinho
function criarLinhaDoItem(item, root) {
    const linha = document.createElement('tr');

    // Coluna 1: nome do café
    const colunaNome = document.createElement('td');
    colunaNome.textContent = item.title;

    // Coluna 2: preço de uma unidade
    const colunaPreco = document.createElement('td');
    colunaPreco.textContent = formatarPreco(item.price);

    // Coluna 3: botão -, quantidade e botão +
    const colunaQuantidade = document.createElement('td');

    const botaoMenos = document.createElement('button');
    botaoMenos.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
    botaoMenos.textContent = '-';

    const quantidade = document.createElement('span');
    quantidade.classList.add('mx-2');
    quantidade.textContent = item.quantity;

    const botaoMais = document.createElement('button');
    botaoMais.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
    botaoMais.textContent = '+';

    // Quando clicar no "-": remove 1 unidade e redesenha a página
    botaoMenos.addEventListener('click', function () {
        removeFromCart(item.id);
        renderCartPage(root);
    });

    // Quando clicar no "+": adiciona 1 unidade e redesenha a página
    // (addToCart recebe um objeto com id, title e price, e o item já tem isso)
    botaoMais.addEventListener('click', function () {
        addToCart(item);
        renderCartPage(root);
    });

    colunaQuantidade.appendChild(botaoMenos);
    colunaQuantidade.appendChild(quantidade);
    colunaQuantidade.appendChild(botaoMais);

    // Coluna 4: subtotal (preço x quantidade)
    const colunaSubtotal = document.createElement('td');
    colunaSubtotal.textContent = formatarPreco(item.price * item.quantity);

    // Encaixa as colunas na linha
    linha.appendChild(colunaNome);
    linha.appendChild(colunaPreco);
    linha.appendChild(colunaQuantidade);
    linha.appendChild(colunaSubtotal);

    return linha;
}


// Desenha a página do carrinho dentro do "root" (que na verdade é o <main>)
export function renderCartPage(root) {
    // Limpa a tela antes de desenhar
    root.replaceChildren();

    const container = document.createElement('div');
    container.classList.add('container', 'py-4');

    const titulo = document.createElement('h1');
    titulo.classList.add('mb-4');
    titulo.textContent = 'Seu Carrinho';
    container.appendChild(titulo);

    // Lê os itens do carrinho
    const itens = getCart();

    // CASO 1: carrinho vazio
    if (itens.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Seu carrinho está vazio.';

        const link = document.createElement('a');
        link.classList.add('btn', 'btn-success');
        link.href = '#/';
        link.textContent = 'Ver cardápio';

        container.appendChild(mensagem);
        container.appendChild(link);
        root.appendChild(container);
        return; // termina a função aqui, não desenha o resto
    }

    // CASO 2: carrinho com itens -> monta a tabela

    // Esta div deixa a tabela rolar para o lado em telas pequenas
    const areaTabela = document.createElement('div');
    areaTabela.classList.add('table-responsive');

    const tabela = document.createElement('table');
    tabela.classList.add('table', 'align-middle');

    // Cabeçalho da tabela
    const cabecalho = document.createElement('thead');
    const linhaCabecalho = document.createElement('tr');
    const nomesColunas = ['Café', 'Preço', 'Quantidade', 'Subtotal'];

    for (let i = 0; i < nomesColunas.length; i++) {
        const th = document.createElement('th');
        th.textContent = nomesColunas[i];
        linhaCabecalho.appendChild(th);
    }

    cabecalho.appendChild(linhaCabecalho);

    // Corpo da tabela: uma linha para cada item
    const corpo = document.createElement('tbody');

    for (let i = 0; i < itens.length; i++) {
        const linha = criarLinhaDoItem(itens[i], root);
        corpo.appendChild(linha);
    }

    tabela.appendChild(cabecalho);
    tabela.appendChild(corpo);
    areaTabela.appendChild(tabela);

    // Parte de baixo: total e botão de finalizar
    const rodape = document.createElement('div');
    rodape.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    const total = document.createElement('h4');
    total.textContent = 'Total: ' + formatarPreco(getTotal());

    const botaoFinalizar = document.createElement('a');
    botaoFinalizar.classList.add('btn', 'btn-success');
    botaoFinalizar.href = '#/checkout';
    botaoFinalizar.textContent = 'Finalizar Compra';

    rodape.appendChild(total);
    rodape.appendChild(botaoFinalizar);

    // Monta a página
    container.appendChild(areaTabela);
    container.appendChild(rodape);
    root.appendChild(container);
}