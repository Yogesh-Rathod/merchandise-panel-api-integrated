import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'order-details/:orderId',
    component: OrderDetailsComponent
  }
];

export const routing = RouterModule.forChild(routes);

