import type { IProduct } from "../../types";

export default class Products {
  protected products: IProduct[];
  protected selectedProduct: IProduct | null;

  constructor() {
    this.selectedProduct = null;
    this.products = [];
  }

  saveProductsList(products: IProduct[]): void {
    this.products = products;
  }

  getProductsList(): IProduct[] {
    return this.products;
  }

  getProduct(productId: IProduct["id"]): IProduct | undefined {
    return this.products.find((product) => product.id === productId);
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
