import type { IProduct } from "../../types";

export default class Cart {
  protected list: IProduct[];

  constructor() {
    this.list = [];
  }

  add(product: IProduct): void {
    this.list.push(product);
  }

  remove(product: IProduct): void {
    this.list = this.list.filter((item) => item.id !== product.id);
  }

  clear(): void {
    this.list = [];
  }

  getItemsCount(): number {
    return this.list.length;
  }

  getItemsList(): IProduct[] {
    return this.list;
  }

  getTotalPrice(): number {
    return this.list.reduce((total, item) => total + (item.price || 0), 0);
  }

  contains(id: IProduct["id"]): boolean {
    return this.list.some((item) => item.id === id);
  }
}
