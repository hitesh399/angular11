import { BaseModel } from './BaseModel';

export interface FlightInterface {
  _id?: string;
  editMode?: boolean;
  id: number;
  icon: string;
  provider: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
}

export class Flight extends BaseModel<FlightInterface> {}
