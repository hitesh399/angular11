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
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'div[class="w-100 h-100"]',
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
    private toast: ToastService,
    private authUserService: AuthUserService
  ) {
    // console.log(this.actRoute, "router")
  }

  async ngOnInit() {
    const authUserSubscriber = (observer: any) => {
      let timeoutId: any;
      const lookupAuth = () => {
        timeoutId = setInterval(() => {
          if (this.authUserService.user?.id) {
            observer.complete();
          }
        }, 100);
      };
      lookupAuth();
      return {
        unsubscribe() {
          clearTimeout(timeoutId);
        },
      };
    };

    this.checkoutForm = this.fb.group(
      {
        firstName: new FormControl(
          this.authUserService.user?.firstName,
          Validators.required
        ),
        authId: new FormControl(
          this.authUserService.user?.id,
          Validators.required
        ),
        lastName: new FormControl(
          this.authUserService.user?.lastName,
          Validators.required
        ),
        email: new FormControl(this.authUserService.user?.email, [
          Validators.required,
          Validators.email,
        ]),
        address: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        address2: new FormControl(''),
        country: new FormControl('India', Validators.required),
        state: new FormControl('', Validators.required),
        zip: new FormControl('', [
          Validators.required,
          Validators.maxLength(10),
        ]),
        paymentMode: new FormControl('credit_card', Validators.required),
        nameOnCard: new FormControl(''),
        cardNumber: new FormControl(''),
        expiryMonth: new FormControl(''),
        cvv: new FormControl(''),
      },
      {
        validators: Validators.compose([
          RequiredIf('nameOnCard', 'paymentMode', [
            'credit_card',
            'debit_card',
          ]),
          RequiredIf('cardNumber', 'paymentMode', [
            'credit_card',
            'debit_card',
          ]),
          RequiredIf('expiryMonth', 'paymentMode', [
            'credit_card',
            'debit_card',
          ]),
          RequiredIf('cvv', 'paymentMode', ['credit_card', 'debit_card']),
        ]),
      }
    );

    new Observable(authUserSubscriber).subscribe({
      complete: () => {
        this.checkoutForm
          ?.get('firstName')
          ?.setValue(this.authUserService.user?.firstName);
        this.checkoutForm
          ?.get('lastName')
          ?.setValue(this.authUserService.user?.lastName);
        this.checkoutForm
          ?.get('email')
          ?.setValue(this.authUserService.user?.email);
        this.checkoutForm
          ?.get('authId')
          ?.setValue(this.authUserService.user?.id);
      },
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
    this.checkoutForm?.disable()
    await this.http
      .post('http://localhost:7000/orders/create', {
        ...this.checkoutForm.value,
        flight: { ...this.flight?.toJSON() },
      })
      .toPromise().then(() => {
        this.checkoutForm?.enable()
        this.toast.success('Order has been created successfully.');
        this.router.navigateByUrl('/my-order');
      }).catch(() =>{
        this.checkoutForm?.enable()
        this.toast.success('Error to create order.');
      })
  }
}
