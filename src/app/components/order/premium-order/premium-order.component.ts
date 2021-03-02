import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-premium-order',
  templateUrl: './premium-order.component.html',
  styleUrls: ['./premium-order.component.css'],
})
export class PremiumOrderComponent implements OnInit {
  constructor(public flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.flightService.fetchFlight();
  }
  checkout(id: number): void {
    this.router.navigateByUrl("/checkout/"+ id.toString())
  }
}
