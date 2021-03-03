import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight, FlightInterface } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  public flights: Array<Flight> = [];

  constructor(private http: HttpClient) {}

  async fetchFlight(isBusiness: string = 'n', params?: any): Promise<Flight[]> {
    this.flights = [];
    const response: any = await this.http
      .get('http://localhost:7000/flights/list/', {
        // params: { isBusiness },
      })
      .toPromise();

    response.forEach((f: any) => {
      const isFromMatched =
        !params.from || (params.from && params.from === f.from);
      const isToMatched = !params.to || (params.to && params.to === f.to);
      console.log("isFromMatched", isFromMatched, params.from , f.from)
      if (f.isBusiness === isBusiness && isFromMatched && isToMatched) {
        this.flights.push(new Flight(f));
      }
    });

    return this.flights;
  }
}
