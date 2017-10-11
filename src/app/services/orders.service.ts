import { Injectable } from '@angular/core';

@Injectable()
export class OrdersService {

  ordersInfo = [
    {
      id: 12333,
      no: 1,
      orderStatus: 'Processing',
      paymentStatus: 'Refunded',
      shippingStatus: 'Delivered',
      customerInfo: {
        name: 'Victoria Terces',
        email: 'victoria_victoria@nopCommerce.com'
      },
      store: 'store 1',
      createdOn: 1507725627158,
      orderTotal: 12000,
      paymentMethod: 'Check / Money Order' 
    },
    {
      id: 12334,
      no: 2,
      orderStatus: 'Pending',
      paymentStatus: 'Paid',
      shippingStatus: 'Shipping not required',
      customerInfo: {
        name: 'James Pan',
        email: 'james_pan@nopCommerce.com'
      },
      store: 'store 2',
      createdOn: 751141800000,
      orderTotal: 13000,
      paymentMethod: 'Credit Card'
    }
  ];

  getOrders() {
    return this.ordersInfo;
  }
}