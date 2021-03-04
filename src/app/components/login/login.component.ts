import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/toast/toast-service';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from '../../services/auth-user.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthUserInterface } from 'src/app/models/auth-user';

@Component({
  selector:
    'login[class="d-flex align-items-center w-100 flex-column justify-content-center h-100 flex-2"][style="flex:2;"]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private toast: ToastService,
    private authService: AuthUserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async doLogin() {
    console.log('this.searchForm', this.loginForm);
    if (this.loginForm.invalid) return;
    this.loginForm?.disable();
    const response: any = await this.http
      .get('http://localhost:7000/authUsers/list')
      .toPromise();
    this.loginForm.enable();
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log('response', response);
    const [authUser] = response.filter(
      (authUser: AuthUserInterface) =>
        authUser.email === email && authUser.password === password
    );
    if (!authUser) {
      this.toast.danger('Please enter the valid credentials.');
      // this.loginForm
      //   ?.get('email')
      //   ?.setErrors({ server: 'Invalid Login Credentials.' });
      return;
    }

    this.authService.addUser(authUser);
    const id = this.authService.user ? this.authService.user.id : '';
    localStorage.setItem('authUserId', id.toString());

    this.router.navigateByUrl('/dashboard');
  }
}
