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
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AuthGuard } from './guards/auth.guard';

const routers: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  { path: 'auth', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'customer',
    component: MyCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'flights', component: FlightListComponent, canActivate: [AuthGuard] },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'normal-order', pathMatch: 'full' },
      { path: 'normal-order', component: NormalOrderComponent },
      { path: 'premium-order', component: PremiumOrderComponent },
    ],
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my-order', component: MyOrderComponent, canActivate: [AuthGuard] },
  { path: 'pie-chart', component: PieChartComponent, canActivate: [AuthGuard] },
  {
    path: 'feedback',
    canActivate: [AuthGuard],
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
