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
    if (data.address !== undefined) {
      this.address = data.address;
    }

    if (data.email !== undefined) {
      this.email = data.email;
    }

    if (data.payment !== undefined) {
      this.payment = data.payment;
    }

    if (data.phone !== undefined) {
      this.phone = data.phone;
    }
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
    }

    if (!this.phone) {
      errors.phone = "Необходимо указать телефон";
    }

    return errors;
  }
}
