import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import { OrdersService } from 'app/services';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderId: any;
  orderInfo: any;
  orders: any;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params =>
      this.orderId = params['orderId']
    )
  }

  ngOnInit() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    if (this.orderId) {
      this.orders = this.ordersService.getOrders();
      _.forEach(this.orders, (order) => {
        if (order.id === parseInt(this.orderId)) {
          this.orderInfo = order;
          console.log("this.orderInfo ", this.orderInfo);
        }
      });
    }
  }

}
