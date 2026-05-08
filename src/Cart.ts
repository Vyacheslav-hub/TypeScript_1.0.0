import Buyable from './Buyable.js';

export default class Cart {
  private items: Buyable[] = [];

  add(item: Buyable): void {
    const alreadyInCart: boolean = this.items.some((storedItem) => storedItem.id === item.id);
    if (alreadyInCart && !item.canRepeat) {
      return;
    }
    this.items.push(item);
  }

  getItems(): Buyable[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((sum: number, item: Buyable) => sum + item.price, 0);
  }

  getTotalWithDiscount(discount: number): number {
    if (discount < 0 || discount > 100) {
      throw new Error('Скидка должна быть от 0 до 100');
    }
    const total: number = this.getTotal();
    return total - (total * discount) / 100;
  }

  removeItemById(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  decreaseItemQuantity(id: number): void {
    const itemIndex: number = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return;
    }

    const item: Buyable = this.items[itemIndex];
    if (!item.canRepeat) {
      return;
    }

    this.items.splice(itemIndex, 1);
  }
}
