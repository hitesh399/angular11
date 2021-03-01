import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from './customer.service';

@Component({
  selector: 'div[class="w-100 h-100"]',
  templateUrl: './my-customer.component.html',
  styleUrls: ['./my-customer.component.css'],
})
export class MyCustomerComponent implements OnInit {
  public customers: CustomerService;
  public model: Customer = new Customer({});
  constructor(cs: CustomerService) {
    this.customers = cs;
  }

  onSubmit() {
    this.customers.addCustomer(
      this.model.attr.name  ? this.model.attr.name : "",
      this.model.attr.email  ? this.model.attr.email : "",
      this.model.attr.address  ? this.model.attr.address : "",
    );
    this.model = new Customer({});
    console.log(JSON.stringify(this.customers))
  }
  toggleEditable(id: string) {
    this.customers.toggleEditable(id)
  }

  ngOnInit(): void {}
}
