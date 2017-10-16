import { Routes, RouterModule } from '@angular/router';

import { MerchandiseComponent } from './merchandise.component';

const routes: Routes = [
  {
    path: '',
    component: MerchandiseComponent,
    children: [
      {
        path: 'merchandise',
        redirectTo: 'merchandise',
        pathMatch: 'merchandise'
      },
      {
        path: 'categories',
        loadChildren: './categories/categories.module#CategoriesModule',
      },
      {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule'
      },
      {
        path: 'vendors',
        loadChildren: './vendor/vendor.module#VendorModule'
      },
      {
        path: 'orders',
        loadChildren: './orders/orders.module#OrdersModule'
      }
    ],
  },
];

export const routing = RouterModule.forChild(routes);