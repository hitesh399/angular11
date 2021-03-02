import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'flightList[class="w-100 h-100"]',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
})
export class FlightListComponent implements OnInit {
  public flights = Array(20)
    .fill(1)
    .map((x, i) => i);

  constructor(private router: Router) {}

  doBook() {
    this.router.navigateByUrl("/checkout")
  }

  ngOnInit(): void {}
}
