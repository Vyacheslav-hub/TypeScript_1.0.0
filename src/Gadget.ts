import Buyable from './Buyable.js';

export default class Gadget implements Buyable {
  readonly canRepeat: boolean = true;

  constructor(
    readonly id: number,
    readonly name: string,
    readonly brand: string,
    readonly price: number
  ) {}
}
