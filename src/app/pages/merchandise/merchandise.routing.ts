import { AuthGuard } from './../../guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

import { MerchandiseComponent } from './merchandise.component';
// import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: MerchandiseComponent,
    children: [
      {
        path: 'merchandise',
        // canActivate: [AuthGuard],
        redirectTo: 'merchandise',
        pathMatch: 'merchandise'
      },
      {
        path: 'categories',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        loadChildren: './categories/categories.module#CategoriesModule',
      },
      {
        path: 'products',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        loadChildren: './products/products.module#ProductsModule'
      },
      {
        path: 'vendors',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        loadChildren: './vendor/vendor.module#VendorModule'
      },
      {
        path: 'orders',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        loadChildren: './orders/orders.module#OrdersModule'
      }
    ],
  },
];

export const routing = RouterModule.forChild(routes);