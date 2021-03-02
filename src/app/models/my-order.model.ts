import { BaseModel } from './BaseModel';
import { FlightInterface } from './flight.model';

export interface MyOrderInterface {
  _id?: string;
  editMode?: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  zip: string;
  paymentMode: string;
  nameOnCard: string;
  cardNumber: string;
  expiryMonth: string;
  cvv: string;
  flight: FlightInterface;
}

export class MyOrder extends BaseModel<MyOrderInterface> {}
