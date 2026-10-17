export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export type Category = "софт-скил" | "хард-скил" | "кнопка" | "дополнительное" | "другое";

export type PaymentMethods = "card" | "cash";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  title: string;
  image: string;
  category: Category;
  price: number | null;
  description: string;
}

export interface ICustomer {
  payment: PaymentMethods | "";
  address: string;
  email: string;
  phone: string;
}

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

export type IOrderPayload = Omit<ICustomer, "payment"> & {
  payment: PaymentMethods; // на сервер нельзя отправить ""
  total: number;
  items: IProduct["id"][];
};

export interface IOrderResponse {
  id: string;
  total: number;
}
