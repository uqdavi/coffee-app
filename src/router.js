import { renderHomePage } from './pages/homePage.js';
import { renderCartPage } from './pages/cartPage.js';
import { renderCheckoutPage } from './pages/checkoutPage.js';

import { createHeader } from './components/header.js';

const routes = {
    '/': renderHomePage,
    '/carrinho': renderCartPage,
    '/checkout': renderCheckoutPage,
};

export function startRouter(root) {
  const header = createHeader();
  const main = document.createElement('main');

  root.append(header, main);

  function navigate() {
    const path = location.hash.slice(1) || '/';
    const render = routes[path] || routes['/'];
    render(main);
  }

  window.addEventListener('hashchange', navigate);
  navigate();
}