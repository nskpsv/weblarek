import { ICustomer, PaymentMethods } from "../../types";

export default class Customer {
  protected payment: PaymentMethods | "";
  protected address: string;
  protected email: string;
  protected phone: string;

  constructor() {
    this.payment = "";
    this.address = "";
    this.email = "";
    this.phone = "";
  }

  saveCustomerData(data: Partial<ICustomer>): void {
    this.payment = data.payment ?? this.payment;
    this.address = data.address ?? this.address;
    this.email = data.email ?? this.email;
    this.phone = data.phone ?? this.phone;
  }

  getCustomerData(): ICustomer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clearCustomerData(): void {
    this.payment = "";
    this.address = "";
    this.email = "";
    this.phone = "";
  }

  validateSavedData(): Partial<Record<keyof ICustomer, string>> {
    const errors: Partial<Record<keyof ICustomer, string>> = {};

    if (!this.payment) {
      errors.payment = "Необходимо выбрать способ оплаты";
    }

    if (!this.address) {
      errors.address = "Необходимо указать адрес";
    }

    if (!this.email) {
      errors.email = "Необходимо указать email";
    } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      errors.email = "Введите валидный email";
    }

    if (!this.phone) {
      errors.phone = "Необходимо указать телефон";
    }

    return errors;
  }
}
