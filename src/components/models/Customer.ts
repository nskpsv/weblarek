import { ICustomer, PaymentMethods } from "../../types";

export default class Customer {
  protected payment: PaymentMethods | "" = "";
  protected address: string = "";
  protected email: string = "";
  protected phone: string = "";

  constructor(data?: Partial<ICustomer>) {
    this.setDataValues(data);
  }

  protected setDataValues(data?: Partial<ICustomer>): void {
    this.payment = data ? data.payment ?? this.payment : '' ;
    this.address = data ? data.address ?? this.address : '' ;
    this.email = data ? data.email ?? this.email : '' ;
    this.phone = data ? data.phone ?? this.phone : '' ;
  }

  saveCustomerData(data: Partial<ICustomer>): void {
    this.setDataValues(data);
  };

  getCustomerData(): ICustomer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  };

  clearCustomerData(): void {
    this.setDataValues();
  };

  validateSavedData(): Partial<Record<keyof ICustomer, string>> {
    const errors: Partial<Record<keyof ICustomer, string>> = {};

    return errors;
  }
}