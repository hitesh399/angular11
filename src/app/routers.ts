import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyCustomerComponent } from './my-customer/my-customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightListComponent } from './flight-list/flight-list.component';

export const routers: Routes = [
  { path: '', component: LoginComponent },
  { path: 'customer', component: MyCustomerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'flights', component: FlightListComponent },
];
