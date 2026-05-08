import Book from '../Book.js';
import Cart from '../Cart.js';
import Gadget from '../Gadget.js';
import Movie from '../Movie.js';

describe('Cart', () => {
  it('returns total without discount for added items', () => {
    const cart = new Cart();
    cart.add(new Book(1, 'Book 1', 'Author 1', 500, 300));
    cart.add(new Book(2, 'Book 2', 'Author 2', 1500, 400));

    expect(cart.getTotal()).toBe(2000);
  });

  it('calculates total and discount correctly', () => {
    const cart = new Cart();
    cart.add(new Book(1, 'Refactoring', 'Martin Fowler', 1000, 448));
    cart.add(new Book(2, 'Domain-Driven Design', 'Eric Evans', 2000, 560));

    expect(cart.getTotal()).toBe(3000);
    expect(cart.getTotalWithDiscount(10)).toBe(2700);
  });

  it('removes item by id', () => {
    const cart = new Cart();
    cart.add(new Book(1, 'A', 'Author A', 100, 100));
    cart.add(new Book(2, 'B', 'Author B', 200, 200));

    cart.removeItemById(1);

    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getItems()[0].id).toBe(2);
  });

  it('throws an error for invalid discount', () => {
    const cart = new Cart();
    cart.add(new Book(1, 'A', 'Author A', 100, 100));

    expect(() => cart.getTotalWithDiscount(-1)).toThrow('Скидка должна быть от 0 до 100');
    expect(() => cart.getTotalWithDiscount(101)).toThrow('Скидка должна быть от 0 до 100');
  });

  it('keeps unique item in a single экземпляр', () => {
    const cart = new Cart();
    const movie = new Movie(
      50,
      'Мстители',
      500,
      2012,
      'США',
      'Avengers Assemble',
      ['фантастика', 'боевик', 'фэнтези', 'приключения'],
      '137 мин. / 02:17'
    );

    cart.add(movie);
    cart.add(movie);

    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getTotal()).toBe(500);
  });

  it('allows multiple gadgets and decreases their quantity', () => {
    const cart = new Cart();
    const iphone = new Gadget(200, 'iPhone 16', 'Apple', 100000);

    cart.add(iphone);
    cart.add(iphone);
    cart.add(iphone);
    cart.add(iphone);

    expect(cart.getItems()).toHaveLength(4);
    expect(cart.getTotal()).toBe(400000);

    cart.decreaseItemQuantity(200);

    expect(cart.getItems()).toHaveLength(3);
    expect(cart.getTotal()).toBe(300000);
  });

  it('does not decrease quantity for unique items', () => {
    const cart = new Cart();
    const book = new Book(5, 'Clean Code', 'Robert C. Martin', 1200, 464);

    cart.add(book);
    cart.decreaseItemQuantity(5);

    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getTotal()).toBe(1200);
  });

  it('does nothing when decreasing quantity for absent item', () => {
    const cart = new Cart();
    cart.add(new Gadget(200, 'iPhone 16', 'Apple', 100000));

    cart.decreaseItemQuantity(999);

    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getTotal()).toBe(100000);
  });
});
