import { getItemCount } from '../cart/cartStorage.js';

export function createHeader() {
    const nav = document.createElement('nav');
    nav.classList.add('navbar', 'navbar-dark', 'bg-dark', 'sticky-top');

    const container = document.createElement('div');
    container.classList.add('container');

    const brand = document.createElement('a');
    brand.classList.add('navbar-brand');
    brand.href = '#/';
    brand.textContent = 'Loja de Café';

    const cartLink = document.createElement('a');
    cartLink.classList.add('btn', 'btn-outline-light', 'position-relative');
    cartLink.href = '#/carrinho';
    cartLink.setAttribute('aria-label', 'Ver carrinho');

    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-cart3', 'fs-5');

    const badge = document.createElement('span');
    badge.classList.add(
        'position-absolute', 'top-0', 'start-100', 'translate-middle',
        'badge', 'rounded-pill', 'bg-danger'
    );

    function updateBadge() {
        badge.textContent = getItemCount();
    }

    updateBadge();
    window.addEventListener('cart-updated', updateBadge);

    cartLink.append(icon, badge);
    container.append(brand, cartLink);
    nav.appendChild(container);

    return nav;
}