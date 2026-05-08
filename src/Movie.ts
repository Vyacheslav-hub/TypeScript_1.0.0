import Buyable from './Buyable.js';

export default class Movie implements Buyable {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly price: number,
    readonly year: number,
    readonly country: string,
    readonly slogan: string,
    readonly genres: string[],
    readonly duration: string
  ) {}
}