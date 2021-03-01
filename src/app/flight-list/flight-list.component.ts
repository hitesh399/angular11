import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'div[class="w-100 h-100"]',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
})
export class FlightListComponent implements OnInit {
  public flights = Array(20)
    .fill(1)
    .map((x, i) => i);

  constructor() {}

  ngOnInit(): void {}
}
