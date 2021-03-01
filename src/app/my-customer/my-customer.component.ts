import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { CustomerService, Customer } from './customer.service';

@Component({
  selector: 'div[class="w-100 h-100"]',
  templateUrl: './my-customer.component.html',
  styleUrls: ['./my-customer.component.css'],
})
export class MyCustomerComponent implements OnInit {
  public customers: CustomerService;
  public model: Customer = new Customer({});
  constructor(cs: CustomerService, private logger: NGXLogger) {
    this.customers = cs;
    this.logger.debug('INIT constructor');
  }

  onSubmit() {
    this.customers.addCustomer(
      this.model.attr.first_name,
      this.model.attr.last_name,
      this.model.attr.email,
      this.model.attr.address
    );
    
    this.model = new Customer({});
    this.logger.info(JSON.stringify(this.customers));
  }
  toggleEditable(id: string) {
    this.customers.toggleEditable(id);
  }

  ngOnInit(): void {
    this.customers.fetchCustomer();
  }
}
