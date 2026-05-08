import Book from './Book.js';
import Cart from './Cart.js';

const cart = new Cart();

cart.add(new Book(1, 'Clean Code', 'Robert C. Martin', 1200, 464));

console.log(`Items in cart: ${cart.getItems().length}`);
console.log(`Total: ${cart.getTotal()}`);
