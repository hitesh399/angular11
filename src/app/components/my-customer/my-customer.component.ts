import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { CustomerService, Customer } from './customer.service';
import { ToastService } from '../../shared/toast/toast-service';

@Component({
  selector: 'my-customer[class="w-100 h-100"]',
  templateUrl: './my-customer.component.html',
  styleUrls: ['./my-customer.component.css'],
})
export class MyCustomerComponent implements OnInit {
  public customers: CustomerService;
  public model: Customer = new Customer({});
  public customerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    cs: CustomerService,
    private logger: NGXLogger,
    private toast: ToastService
  ) {
    this.customers = cs;
    this.logger.debug('INIT constructor');

    this.customerForm = this.formBuilder.group({
      first_name: this.formBuilder.control('', [Validators.required]),
      last_name: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  async onSubmit() {
    await this.customers.addCustomer(
      this.model.attr.first_name,
      this.model.attr.last_name,
      this.model.attr.email,
      this.model.attr.address
    );
    this.toast.success("Customer has been created successfully.")
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
