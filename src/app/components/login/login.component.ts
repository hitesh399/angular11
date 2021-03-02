import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login[class="d-flex align-items-center w-100 h-100 flex-2"][style="flex:2;"]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  doLogin() {
    this.router.navigateByUrl('/dashboard');
  }
}
