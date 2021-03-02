import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight, FlightInterface } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  public flights: Array<Flight> = [];

  constructor(private http: HttpClient) {}

  async fetchFlight(isBusiness: string = 'n'): Promise<Flight[]> {
    this.flights = []
    const response: any = await this.http
      .get('http://localhost:7000/flights/list/', {
        // params: { isBusiness },
      })
      .toPromise();

    response.forEach((f: any) => {
      if(f.isBusiness === isBusiness) {
        this.flights.push(new Flight(f));
      }
    });

    return this.flights;
  }
}
