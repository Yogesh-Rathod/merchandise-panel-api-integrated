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
      guid: 'db8db6cd-894d-4423-9c09-a948c728a2bc',
      customerInfo: {
        name: 'Victoria Terces',
        email: 'victoria_victoria@nopCommerce.com',
        ipAddress: '127.0.0.1'
      },
      store: 'store 1',
      subtotal: 11000,
      shipping: 500,
      createdOn: 1507725627158,
      orderTotal: 12000,
      paymentMethod: 'Check / Money Order',
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