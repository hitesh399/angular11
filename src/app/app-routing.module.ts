import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MyCustomerComponent } from './components/my-customer/my-customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { OrderComponent } from './components/order/order.component';
import { NormalOrderComponent } from './components/order/normal-order/normal-order.component';
import { PremiumOrderComponent } from './components/order/premium-order/premium-order.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrderComponent } from './components/my-order/my-order.component';

const routers: Routes = [
  { path: '', component: LoginComponent },
  { path: 'customer', component: MyCustomerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'flights', component: FlightListComponent },
  {
    path: 'order',
    component: OrderComponent,
    children: [
      { path: '', redirectTo: 'normal-order', pathMatch: 'full' },
      { path: 'normal-order', component: NormalOrderComponent },
      { path: 'premium-order', component: PremiumOrderComponent },
    ],
  },
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: 'my-order', component: MyOrderComponent },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./modules/feedback/feedback.module').then(
        (m) => m.FeedbackModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
