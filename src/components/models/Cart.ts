import type { IProduct } from "../../types";

export default class Cart {
  constructor(protected list: IProduct[] = []) {}

  add(item: IProduct): number {
    return this.list.push(item);
  }

  remove(item: IProduct): number {
    const index = this.list.indexOf(item);

    if (index == -1) {
      console.error(`Item: ${item.id} not found in cart`);
    } else {
      this.list.splice(index, 1);
    }

    return this.list.length;
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
