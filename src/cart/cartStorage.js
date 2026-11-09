const CART_KEY = 'coffee-cart';


export function getCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}


function notifyChange() {
  window.dispatchEvent(new Event('cart-updated'));
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notifyChange();
}


export function addToCart(coffee) {
    const cart = getCart();
    const item = cart.find((i) => i.id === coffee.id);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({
            id: coffee.id,
            title: coffee.title,
            price: coffee.price,
            quantity: 1,
        });
    }

    saveCart(cart);
}

export function removeFromCart(id) {
    let cart = getCart();
    const item = cart.find((i) => i.id === id);

    if (!item) return;

    item.quantity -= 1;

    if (item.quantity <= 0) {
        cart = cart.filter((i) => i.id !== id);
    }

    saveCart(cart);
}

export function getTotal() {
    return getCart().reduce((total, i) => total + i.price * i.quantity, 0);
}

export function getItemCount() {
    return getCart().reduce((count, i) => count + i.quantity, 0);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  notifyChange();
}