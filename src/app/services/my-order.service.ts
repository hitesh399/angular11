import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { MyOrder, MyOrderInterface } from '../models/my-order.model';

@Injectable({
  providedIn: 'root',
})
export class MyOrderService {
  public myOrders: Array<MyOrder> = [];

  constructor(private http: HttpClient) {
    // this.myOrders = [];
  }

  async fetchMyOrder() {
    this.myOrders = [];
    const response: any = await this.http.get('http://localhost:7000/orders/list').toPromise();
    response.forEach((order: MyOrderInterface) => {
      this.myOrders.push(new MyOrder(order));
    });
  }
}
