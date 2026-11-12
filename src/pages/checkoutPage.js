import { getCart, getTotal, clearCart } from '../cart/cartStorage.js';

// Transforma um número em texto de dinheiro. Exemplo: 4.5 vira "R$ 4,50"
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


// Cria a lista com o resumo dos itens (usada no checkout e na confirmação)
function criarResumo(itens, total) {
    const caixa = document.createElement('div');

    const lista = document.createElement('ul');
    lista.classList.add('list-group', 'mb-3');

    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];

        const linha = document.createElement('li');
        linha.classList.add('list-group-item', 'd-flex', 'justify-content-between');

        // Lado esquerdo: "2x Latte"
        const nome = document.createElement('span');
        nome.textContent = item.quantity + 'x ' + item.title;

        // Lado direito: subtotal do item
        const subtotal = document.createElement('span');
        subtotal.textContent = formatarPreco(item.price * item.quantity);

        linha.appendChild(nome);
        linha.appendChild(subtotal);
        lista.appendChild(linha);
    }

    const textoTotal = document.createElement('h4');
    textoTotal.textContent = 'Total: ' + formatarPreco(total);

    caixa.appendChild(lista);
    caixa.appendChild(textoTotal);

    return caixa;
}


// Mostra a tela de "compra concluída"
// Recebe as cópias dos itens e do total, guardadas antes de limpar o carrinho
function mostrarConfirmacao(root, itens, total, endereco, pagamento) {
    root.replaceChildren();

    const container = document.createElement('div');
    container.classList.add('container', 'py-4');

    const alerta = document.createElement('div');
    alerta.classList.add('alert', 'alert-success');
    alerta.textContent = 'Compra realizada com sucesso! Obrigado pela preferência.';

    const textoEndereco = document.createElement('p');
    textoEndereco.textContent = 'Endereço de entrega: ' + endereco;

    const textoPagamento = document.createElement('p');
    textoPagamento.textContent = 'Forma de pagamento: ' + pagamento;

    const resumo = criarResumo(itens, total);

    const botaoVoltar = document.createElement('a');
    botaoVoltar.classList.add('btn', 'btn-success');
    botaoVoltar.href = '#/';
    botaoVoltar.textContent = 'Voltar ao cardápio';

    container.appendChild(alerta);
    container.appendChild(textoEndereco);
    container.appendChild(textoPagamento);
    container.appendChild(resumo);
    container.appendChild(botaoVoltar);
    root.appendChild(container);
}


// Desenha a página de checkout dentro do "root" (que é o <main>)
export function renderCheckoutPage(root) {
    root.replaceChildren();

    const container = document.createElement('div');
    container.classList.add('container', 'py-4');

    const titulo = document.createElement('h1');
    titulo.classList.add('mb-4');
    titulo.textContent = 'Finalizar Compra';
    container.appendChild(titulo);

    // Lê os itens do carrinho
    const itens = getCart();

    // CASO 1: carrinho vazio -> não há o que finalizar
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
        return;
    }

    // CASO 2: carrinho com itens
    const total = getTotal();

    // ---- Resumo ----
    const tituloResumo = document.createElement('h2');
    tituloResumo.classList.add('h4');
    tituloResumo.textContent = 'Resumo do pedido';

    const resumo = criarResumo(itens, total);

    // ---- Formulário ----
    const tituloForm = document.createElement('h2');
    tituloForm.classList.add('h4', 'mt-4');
    tituloForm.textContent = 'Dados da entrega';

    // Campo de endereço
    const labelEndereco = document.createElement('label');
    labelEndereco.classList.add('form-label');
    labelEndereco.textContent = 'Endereço de entrega';
    labelEndereco.htmlFor = 'endereco';

    const campoEndereco = document.createElement('input');
    campoEndereco.classList.add('form-control');
    campoEndereco.type = 'text';
    campoEndereco.id = 'endereco';
    campoEndereco.placeholder = 'Rua, número, bairro, cidade';

    const mensagemErroEndereco = document.createElement('div');
    mensagemErroEndereco.classList.add('invalid-feedback');
    mensagemErroEndereco.textContent = 'Informe um endereço com pelo menos 10 caracteres.';

    const grupoEndereco = document.createElement('div');
    grupoEndereco.classList.add('mb-3');
    grupoEndereco.appendChild(labelEndereco);
    grupoEndereco.appendChild(campoEndereco);
    grupoEndereco.appendChild(mensagemErroEndereco);

    // Campo de forma de pagamento
    const labelPagamento = document.createElement('label');
    labelPagamento.classList.add('form-label');
    labelPagamento.textContent = 'Forma de pagamento';
    labelPagamento.htmlFor = 'pagamento';

    const campoPagamento = document.createElement('select');
    campoPagamento.classList.add('form-select');
    campoPagamento.id = 'pagamento';

    const opcoes = ['Selecione...', 'Cartão de crédito', 'Boleto', 'PIX'];

    for (let i = 0; i < opcoes.length; i++) {
        const opcao = document.createElement('option');
        opcao.textContent = opcoes[i];

        // A primeira opção ("Selecione...") tem valor vazio, para sabermos
        // que o usuário ainda não escolheu nada
        if (i === 0) {
            opcao.value = '';
        } else {
            opcao.value = opcoes[i];
        }

        campoPagamento.appendChild(opcao);
    }

    const mensagemErroPagamento = document.createElement('div');
    mensagemErroPagamento.classList.add('invalid-feedback');
    mensagemErroPagamento.textContent = 'Escolha uma forma de pagamento.';

    const grupoPagamento = document.createElement('div');
    grupoPagamento.classList.add('mb-3');
    grupoPagamento.appendChild(labelPagamento);
    grupoPagamento.appendChild(campoPagamento);
    grupoPagamento.appendChild(mensagemErroPagamento);

    // Botão de finalizar
    const botaoFinalizar = document.createElement('button');
    botaoFinalizar.classList.add('btn', 'btn-success');
    botaoFinalizar.textContent = 'Finalizar';

    // ---- O que acontece ao clicar em "Finalizar" ----
    botaoFinalizar.addEventListener('click', function () {
        // trim() tira espaços do começo e do fim do texto
        const endereco = campoEndereco.value.trim();
        const pagamento = campoPagamento.value;

        // Começamos assumindo que está tudo certo
        let tudoCerto = true;

        // Valida o endereço
        if (endereco.length < 10) {
            campoEndereco.classList.add('is-invalid');
            tudoCerto = false;
        } else {
            campoEndereco.classList.remove('is-invalid');
        }

        // Valida o pagamento (valor vazio = nada escolhido)
        if (pagamento === '') {
            campoPagamento.classList.add('is-invalid');
            tudoCerto = false;
        } else {
            campoPagamento.classList.remove('is-invalid');
        }

        // Se algum campo falhou, para aqui e mantém o formulário na tela
        if (tudoCerto === false) {
            return;
        }

        // Tudo certo: mostra a confirmação e SÓ DEPOIS limpa o carrinho.
        // Usamos "itens" e "total", que são cópias guardadas antes de limpar.
        mostrarConfirmacao(root, itens, total, endereco, pagamento);
        clearCart();
    });

    // ---- Monta a página ----
    container.appendChild(tituloResumo);
    container.appendChild(resumo);
    container.appendChild(tituloForm);
    container.appendChild(grupoEndereco);
    container.appendChild(grupoPagamento);
    container.appendChild(botaoFinalizar);
    root.appendChild(container);
}