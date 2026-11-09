import { IOrderPayload, IOrderResponse, IProductsResponse } from "../../types";
import type { IApi } from "../../types";

export default class ProductsApi {
  constructor(private readonly api: IApi) {}

  async getProducts(): Promise<IProductsResponse> {
    return await this.api.get<IProductsResponse>("/product");
  }

  async createOrder(order: IOrderPayload): Promise<IOrderResponse> {
    return await this.api.post<IOrderResponse>("/orders", order);
  }
}
