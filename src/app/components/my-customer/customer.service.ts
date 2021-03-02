import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseModel } from 'src/app/models/BaseModel';
import { NGXLogger } from 'ngx-logger';
import { NextObserver, Observable } from 'rxjs';

interface CustomerInterface {
  _id?: string;
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  salary?: number;
  company?: object;
  phone?: string;
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

  constructor(private http: HttpClient, private logger: NGXLogger) {}
  /**
   * To Add a new Customer
   * @param name string
   * @param email string
   * @param address string
   */
  async addCustomer(
    first_name?: string,
    last_name?: string,
    email?: string,
    address?: string
  ): Promise<Customer> {
    const customer = new Customer({ first_name, last_name, email, address });
    this.customers.push(customer);
    this.logger.info('Requesting to create customer');
    const response: CustomerInterface = await this.http
      .post('http://localhost:7000/users', {
        first_name,
        last_name,
        email,
        address,
      })
      .toPromise();
    customer.attr.id = response.id;
    return customer;
  }
  /**
   * To update the customer
   * @param id string - Customer id
   * @param data object - Customer Information like: email, name, address
   */
  updateCustomer(id: string, data?: CustomerInterface): boolean | Customer {
    const cus = this.findCustomer(id);

    const cData = cus ? cus.update(data) : false;
    this.http
      .put(
        `http://localhost:7000/users/update/${cData ? cData.attr.id : null}`,
        cData ? cData.toJSON() : {}
      )
      .subscribe();
    return cData;
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
      if (customer._id === id) {
        myCustomer = customer;
        return false;
      }
      return true;
    });
    return myCustomer;
  }

  /**
   * To Delete the customer
   * @param _id string Customer ID
   */
  deleteCustomer(_id: string): boolean {
    let index: number | null = null;
    let id: number | undefined;
    this.customers.some((customer, i) => {
      if (customer._id === _id) {
        index = i;
        id = customer.attr.id;
      }
    });

    if (index !== -1 && index !== null) {
      this.customers.splice(index, 1);
      this.http.delete(`http://localhost:7000/users/delete/${id}`).subscribe();
      return true;
    }
    return false;
  }

  async fetchCustomer() {
    this.http
      .get('http://localhost:7000/users/list')
      .subscribe((response: any) => {
        const customers: Customer[] = [];
        response.forEach((c: CustomerInterface) =>
          customers.push(new Customer(c))
        );
        this.customers = customers;
      });
  }
  /**
   * To get the customer List
   */
  toJSON(): Array<Customer> {
    return this.customers;
  }
}
