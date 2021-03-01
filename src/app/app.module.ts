import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MyCustomerComponent } from './my-customer/my-customer.component';
import { AppComponent } from './app.component';
import { routers } from './routers';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { BonusPipe } from './pipes/bonus.pipe';
import { HighlightRowDirective } from './directives/highlight-row.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyCustomerComponent,
    DashboardComponent,
    FlightListComponent,
    BonusPipe,
    HighlightRowDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routers),
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/users/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
