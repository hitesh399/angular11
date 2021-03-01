import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyCustomerComponent } from './my-customer/my-customer.component';
import { CustomerService } from './my-customer/customer.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { routers } from './routers';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightListComponent } from './flight-list/flight-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MyCustomerComponent,
    DashboardComponent,
    FlightListComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routers)],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
