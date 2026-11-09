import { startRouter } from './router.js';
import * as cart from './cart/cartStorage.js';

window.cart = cart;

const root = document.getElementById('root');

startRouter(root);