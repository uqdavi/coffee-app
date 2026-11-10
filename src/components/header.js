import { getItemCount } from '../cart/cartStorage.js';


export function createHeader() {

    // ---- 1. A barra inteira ----
    // <nav> é a barra de navegação. As classes do Bootstrap dão fundo
    // escuro e fazem a barra ficar fixa no topo quando a página rola.
    const nav = document.createElement('nav');
    nav.classList.add('navbar', 'navbar-dark', 'bg-dark', 'sticky-top');

    // ---- 2. A caixa que centraliza o conteúdo ----
    // Serve só para alinhar o conteúdo do header com o resto do site.
    const container = document.createElement('div');
    container.classList.add('container');

    // ---- 3. O nome da loja (lado esquerdo) ----
    // Clicar nele leva para a home.
    const brand = document.createElement('a');
    brand.classList.add('navbar-brand');
    brand.href = '#/';
    brand.textContent = 'Loja de Café';

    // ---- 4. O botão do carrinho (lado direito) ----
    // É um link com aparência de botão. Clicar leva para a página do carrinho.
    // O "position-relative" é necessário para a bolinha vermelha (item 6)
    // ficar posicionada em cima deste botão.
    const cartLink = document.createElement('a');
    cartLink.classList.add('btn', 'btn-outline-light', 'position-relative');
    cartLink.href = '#/carrinho';

    // ---- 5. O desenho do carrinho ----
    // <i> é o jeito do Bootstrap Icons mostrar um ícone.
    // "bi-cart3" é o desenho do carrinho de compras.
    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-cart3', 'fs-5');

    // ---- 6. A bolinha vermelha com o número ----
    // Aqui aparece a quantidade de itens do carrinho.
    // As classes "position-absolute top-0 start-100" colocam a bolinha
    // no canto superior direito do botão.
    const badge = document.createElement('span');
    badge.classList.add(
        'position-absolute', 'top-0', 'start-100', 'translate-middle',
        'badge', 'rounded-pill', 'bg-danger'
    );

    // ---- 7. Função que atualiza o número da bolinha ----
    // Pergunta ao carrinho quantos itens existem e escreve na bolinha.
    function updateBadge() {
        const quantidade = getItemCount();
        badge.textContent = quantidade;
    }

    // Mostra o número assim que o header é criado
    updateBadge();

    // Fica "ouvindo" a campainha do carrinho.
    // Sempre que o carrinho tocar 'cart-updated', o número é atualizado.
    window.addEventListener('cart-updated', updateBadge);

    // ---- 8. Montagem: encaixar as peças umas dentro das outras ----
    cartLink.appendChild(icon);       // o desenho entra no botão
    cartLink.appendChild(badge);      // a bolinha entra no botão
    container.appendChild(brand);     // o nome entra na caixa
    container.appendChild(cartLink);  // o botão entra na caixa
    nav.appendChild(container);       // a caixa entra na barra


    return nav;
}