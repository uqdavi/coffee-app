import { getCoffees } from '../api/coffeeApi.js';
import { createCoffeeCard } from '../components/coffeeCard.js';

export async function renderHomePage(root) {
    root.replaceChildren();

    const container = document.createElement('div');
    container.classList.add('container', 'py-4');

    const title = document.createElement('h1');
    title.classList.add('mb-4');
    title.textContent = 'Nosso Cardápio';

    const status = document.createElement('p');
    status.textContent = 'Carregando cafés...';

    container.append(title, status);
    root.appendChild(container);

    try {
        const coffees = await getCoffees();

        const row = document.createElement('div');
        row.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'g-4');

        coffees.forEach((coffee) => {
            const card = createCoffeeCard(coffee, (c) => {
                console.log('Adicionar ao carrinho:', c.title);
            });
            row.appendChild(card);
        });

        status.remove();
        container.appendChild(row);
    } catch (error) {
        status.classList.add('text-danger');
        status.textContent = 'Não foi possível carregar os cafés.';
        console.error(error);
    }
}