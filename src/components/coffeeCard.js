export function createCoffeeCard( coffee, onAdd ) {
    const col = document.createElement('div');
    col.classList.add('col');

    const card = document.createElement('div');
    card.classList.add('card', 'h-100', 'shadow-sm');

    const img = document.createElement('img');
    img.src = coffee.image;
    img.alt = coffee.title;
    img.classList.add('card-img-top');
    img.style.height = '200px';
    img.style.objectFit = 'cover';

    const body = document.createElement('div');
    body.classList.add('card-body', 'd-flex', 'flex-column');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = coffee.title;

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = coffee.description;

    const ingredients = document.createElement('p');
    ingredients.classList.add('text-muted', 'small');
    ingredients.textContent = 'Ingredientes: ' + coffee.ingredients.join(', ');

    const price = document.createElement('p');
    price.classList.add('fw-bold', 'fs-5', 'mt-auto');
    price.textContent = coffee.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-success');
    button.textContent = 'Adicionar ao carrinho';
    button.addEventListener('click', () => onAdd(coffee));

    body.append(title, description, ingredients, price, button);
    card.append(img, body);
    col.appendChild(card);

    return col;
}