import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-normal-order',
  templateUrl: './normal-order.component.html',
  styleUrls: ['./normal-order.component.css'],
})
export class NormalOrderComponent implements OnInit {
  constructor(
    public flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let params = {};
    this.route.queryParams.forEach((v) => {
      params = v;
    });
    this.flightService.fetchFlight('n', params);
  }

  checkout(id: number): void {
    this.router.navigateByUrl('checkout/' + id.toString());
  }
}
