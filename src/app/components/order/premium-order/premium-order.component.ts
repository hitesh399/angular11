import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-premium-order',
  templateUrl: './premium-order.component.html',
  styleUrls: ['./premium-order.component.css'],
})
export class PremiumOrderComponent implements OnInit {
  constructor(
    public flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // const [params] =
    let params = {};
    this.route.queryParams.forEach((v) => {
      params = v;
    });
    // console.log("router", params)
    this.flightService.fetchFlight('y', params);
  }
  checkout(id: number): void {
    this.router.navigateByUrl('/checkout/' + id.toString());
  }
}
