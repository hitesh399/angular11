import { Component, OnInit } from '@angular/core';
import { MyOrderService } from '../../services/my-order.service';

@Component({
  selector: 'app-my-order[class="w-100 h-100"]',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  constructor(public orders: MyOrderService) {}

  ngOnInit(): void {
    this.orders.fetchMyOrder()
  }
}
