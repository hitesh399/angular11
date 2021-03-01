import {  Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'Angular';
  clickMessage: string ="status"

  constructor(private route: Router) {

  }
  onClickMe() {
    console.log("Event Fired....")
    this.clickMessage = "New Message in "
  }
}
