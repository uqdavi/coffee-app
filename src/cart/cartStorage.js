// Este arquivo cuida do carrinho. Ele guarda os dados no localStorage.
// O localStorage só guarda TEXTO, então:
//   - para salvar, transformamos o array em texto (JSON.stringify)
//   - para ler, transformamos o texto de volta em array (JSON.parse)
// SIMPLES !!


const CART_KEY = 'coffee-cart'; // 'coffee-cart' é o nome/chave/bancoDeDados que o carrinho fica guardado no localStorage
// Ou seja, se a gente precisar buscar informações sobre o carrinho é só procurar por essa chave no localStorage: localStorage.getItem('coffee-cart') :)



export function getCart() {
    const texto = localStorage.getItem(CART_KEY);

    // Se ainda não existe nada salvo, o carrinho está vazio
    if (texto === null) {
        return []; // ent retorna apenas um array vazil
    }

    // Se existe, ai converte o texto/string de volta para array
    return JSON.parse(texto);
}


// Avisa o resto do site que o carrinho mudou (explicação mais abaixo)
function notifyChange() {
    const aviso = new Event('cart-updated');
    window.dispatchEvent(aviso);
}


// Salva o carrinho no localStorage e avisa que mudou
function saveCart(cart) {
    const texto = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, texto);
    notifyChange();
}


// função para adicionar 1 café ao carrinho
export function addToCart(coffee) {
    const cart = getCart(); // primeiro pegamos o array do que ja tem no cart


    // Aqui iremos verificar se o café já existe no carrinho, buscando ele pelo id
    // Simples, se o café ainda não estiver no carrinho, adicionamos o item
    // Café Preto 1x R$5.00
    
    // Agora se o cafe já esta no carrinho, a gente apenas adiciona mais uma unidade nele
    // Café Preto 2x R$10.00
    // Café Preto 3x R$15.00 ...
    let itemEncontrado = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === coffee.id) {
            itemEncontrado = cart[i];
        }
    }

    if (itemEncontrado !== null) { // Já estava no carrinho: só aumenta a quantidade
        itemEncontrado.quantity = itemEncontrado.quantity + 1;
    } else { // Não estava: adiciona um item novo com quantidade 1
        cart.push({
            id: coffee.id,
            title: coffee.title,
            price: coffee.price,
            quantity: 1,
        });
    }

    saveCart(cart); // Por fim, salvamos o carrinho
}


export function removeFromCart(id) {
    const cart = getCart(); // localStorage do café atualmente
    const novoCart = []; // localStorage do café após a remoção

    // Percorre item por item do carrinho
    for ( let i = 0; i < cart.length; i++ ) {
        const item = cart[i];

        if ( item.id === id ) {
            // É o café que queremos diminuir
            item.quantity = item.quantity - 1;

            // Só copia para o carrinho novo se ainda sobrou alguma unidade
            if ( item.quantity > 0 ) {
                novoCart.push(item);
            }
        } else {
            // Não é o café em questão: copia sem mudar nada
            novoCart.push(item);
        }
    }

    saveCart(novoCart);
}


// Calcula o valor total do carrinho
export function getTotal() {
    const cart = getCart();
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price * cart[i].quantity;
    }

    return total;
}


// Conta quantas unidades existem no carrinho (para o número do header)
export function getItemCount() {
    const cart = getCart();
    let quantidade = 0;

    for (let i = 0; i < cart.length; i++) {
        quantidade = quantidade + cart[i].quantity;
    }

    return quantidade;
}


// Esvazia o carrinho (usado ao finalizar a compra)
export function clearCart() {
    localStorage.removeItem(CART_KEY);
    notifyChange();
}