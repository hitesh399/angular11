import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from './services/auth-user.service';
import { ToastService } from './shared/toast/toast-service';

@Component({
  selector: 'main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular';
  clickMessage: string = 'status';
  today = new Date();
  collapse: boolean = true;

  constructor(private router: Router, private toast: ToastService, public authUserService: AuthUserService) {}
  onClickMe() {
    console.log('Event Fired....');
    this.clickMessage = 'New Message in ';
  }
  toggleMenu() {
    this.collapse = !this.collapse;
  }
  logOut() {
    this.authUserService.clearUser()
    localStorage.removeItem("authUserId")

    this.router.navigateByUrl("/").then(() => {
      this.toast.success("Logged Out.")
    })
  }
}
