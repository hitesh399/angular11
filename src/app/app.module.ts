import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MyCustomerComponent } from './components/my-customer/my-customer.component';
import { AppComponent } from './app.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { BonusPipe } from './pipes/bonus.pipe';
import { HighlightRowDirective } from './directives/highlight-row.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { OrderComponent } from './components/order/order.component';
import { PremiumOrderComponent } from './components/order/premium-order/premium-order.component';
import { NormalOrderComponent } from './components/order/normal-order/normal-order.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrderComponent } from './components/my-order/my-order.component';

// import { FeedbackModule } from './modules/feedback/feedback.module';

@NgModule({
  declarations: [
    AppComponent,
    MyCustomerComponent,
    DashboardComponent,
    FlightListComponent,
    OrderComponent,
    BonusPipe,
    HighlightRowDirective,
    OrderComponent,
    PremiumOrderComponent,
    NormalOrderComponent,
    CheckoutComponent,
    MyOrderComponent,
  ],
  imports: [

  SharedModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/users/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
    NgbModule,
    // FeedbackModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
