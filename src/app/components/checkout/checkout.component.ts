import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequiredIf } from '../../_helpers/required-if.validator';
import { Flight, FlightInterface } from '../../models/flight.model';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../shared/toast/toast-service';

@Component({
  selector: 'checkout[class="w-100 h-100"]',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm?: FormGroup;
  flight?: Flight;

  constructor(
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toast: ToastService
  ) {
    // console.log(this.actRoute, "router")
  }

  async ngOnInit() {
    this.checkoutForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      address2: new FormControl(''),
      country: new FormControl('India', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      paymentMode: new FormControl('credit_card', Validators.required),
      nameOnCard: new FormControl(
        '',
        RequiredIf('paymentMode', ['credit_card', 'debit_card'])
      ),
      cardNumber: new FormControl(
        '',
        RequiredIf('paymentMode', ['credit_card', 'debit_card'])
      ),
      expiryMonth: new FormControl(
        '',
        RequiredIf('paymentMode', ['credit_card', 'debit_card'])
      ),
      cvv: new FormControl(
        '',
        RequiredIf('paymentMode', ['credit_card', 'debit_card'])
      ),
    });
    const { id } = this.actRoute.snapshot.params;
    const response: any = await this.http
      .get('http://localhost:7000/flights/' + id)
      .toPromise();
    this.flight = new Flight(response);
  }

  async onSubmit() {
    // console.log('this.checkoutForm', this.checkoutForm);
    if (!this.checkoutForm || this.checkoutForm.invalid) return;
    // console.log();
    await this.http
      .post('http://localhost:7000/orders/create', {
        ...this.checkoutForm.value,
        flight: { ...this.flight?.toJSON() },
      })
      .toPromise();
    this.toast.success('Order has been created successfully.');
    this.router.navigateByUrl('/dashboard');
  }
}
