import type { IProduct } from "../../types";

export default class Products {
  constructor(
    protected products: IProduct[] = [],
    protected selectedProduct: IProduct | null = null,
  ) {}

  saveProductsList(products: IProduct[]): void {
    this.products = JSON.parse(JSON.stringify(products));
  }

  getProductsList(): IProduct[] {
    return JSON.parse(JSON.stringify(this.products));
  }

  getProduct(): IProduct[] {
    return this.products;
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
