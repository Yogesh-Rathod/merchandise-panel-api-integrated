import { AuthGuard } from './../../../guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: OrdersComponent
  },
  {
    path: 'order-details/:orderId',
    // canActivate: [AuthGuard],
    component: OrderDetailsComponent
  }
];

export const routing = RouterModule.forChild(routes);

