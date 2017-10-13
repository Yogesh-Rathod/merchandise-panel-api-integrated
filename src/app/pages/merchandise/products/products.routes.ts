import { AuthGuard } from './../../../guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: ProductsComponent
  },
  {
    path: 'add-product',
    // canActivate: [AuthGuard],
    component: AddProductComponent
  },
  {
    path: 'edit-product/:productId',
    // canActivate: [AuthGuard],
    component: AddProductComponent
  }
];

export const routing = RouterModule.forChild(routes);

