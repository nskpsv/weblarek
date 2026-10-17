import { IOrderPayload, IOrderResponse, IProductsResponse } from "../../types";
import { Api } from "../base/Api";

export default class ProductsApi {
  constructor(private readonly api: Api) {}

  async getProducts(): Promise<IProductsResponse> {
    try {
      const response = await this.api.get<IProductsResponse>("/product");
      return response;
    } catch (error) {
      console.error(error);
      return {
        items: [],
        total: 0,
      };
    }
  }

  async createOrder(order: IOrderPayload): Promise<IOrderResponse> {
    try {
      const response = await this.api.post<IOrderResponse>("/orders", order);
      return response;
    } catch (error) {
      console.error(error);
      return {
        id: "",
        total: 0,
      };
    }
  }
}
