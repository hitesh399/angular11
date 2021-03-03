import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../_helpers/must-match.validator';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../shared/toast/toast-service';

@Component({
  selector: 'my-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toast: ToastService,
    private authUserService: AuthUserService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      feedback: ['', [Validators.required]],
    });

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
    new Observable(authUserSubscriber).subscribe({
      complete: () => {
        this.registerForm
          ?.get('firstName')
          ?.setValue(this.authUserService.user?.firstName);
        this.registerForm
          ?.get('lastName')
          ?.setValue(this.authUserService.user?.lastName);
        this.registerForm
          ?.get('email')
          ?.setValue(this.authUserService.user?.email);
      },
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    // alert(
    //   'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4)
    // );
    this.registerForm.disable()
    this.http
      .post('http://localhost:7000/feedbacks/create', {
        ...this.registerForm.value,
        id: Math.floor(Math.random() * 200000),
      })
      .toPromise()
      .then(() => {
        this.registerForm.enable()
        this.toast.success('Feedback is submitted.');
      }).catch(() => {
        this.registerForm.enable()
      })

    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
