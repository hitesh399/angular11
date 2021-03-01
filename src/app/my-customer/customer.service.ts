import { Injectable } from '@angular/core';
import { BaseModel } from 'src/model/BaseModel';

interface CustomerInterface {
  id?: string;
  name?: string;
  email?: string;
  address?: string;
}
export class Customer extends BaseModel<CustomerInterface> {
  constructor(data: CustomerInterface) {
    super(data);
  }
}
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  /**
   * To store the customer data
   */
  private customers: Array<Customer> = [];

  /**
   * To Add a new Customer
   * @param name string
   * @param email string
   * @param address string
   */
  addCustomer(
    name: string,
    email: string = '',
    address: string = ''
  ): Customer {
    const customer = new Customer({ name, email, address });
    this.customers.push(customer);
    return customer;
  }
  /**
   * To update the customer
   * @param id string - Customer id
   * @param data object - Customer Information like: email, name, address
   */
  updateCustomer(id: string, data?: CustomerInterface): boolean | Customer {
    const cus = this.findCustomer(id);
    return cus ? cus.update(data) : false;
  }
  toggleEditable(id: string): Customer | null {
    const cus = this.findCustomer(id);
    if (cus) {
      cus.toggleEditable();
    }
    return cus;
  }
  findCustomer(id: string): Customer | null {
    let myCustomer: Customer | null = null;
    this.customers.every((customer: Customer) => {
      if (customer.id === id) {
        myCustomer = customer;
        return false;
      }
      return true;
    });
    return myCustomer;
  }

  /**
   * To Delete the customer
   * @param id string Customer ID
   */
  deleteCustomer(id: string): boolean {
    let index: number | null = null;
    this.customers.some((customer, i) => {
      if (customer.id === id) {
        index = i;
      }
    });

    if (index !== -1 && index !== null) {
      this.customers.splice(index, 1);
      return true;
    }
    return false;
  }
  /**
   * To get the customer List
   */
  toJSON(): Array<Customer> {
    return this.customers;
  }
}
