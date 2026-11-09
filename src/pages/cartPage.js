export function renderCartPage(root) {
    root.replaceChildren();

    const container = document.createElement('div');
    container.classList.add('container', 'py-4');

    const title = document.createElement('h1');
    title.textContent = 'Carrinho';

    const link = document.createElement('a');
    link.href = '#/';
    link.textContent = 'Voltar para a home';

    container.append(title, link);
    root.appendChild(container);
    
}