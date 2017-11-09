import { AuthGuard } from './../../../guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: ':vendorId',
    component: ProductsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'edit-product/:productId',
    component: AddProductComponent
  },
  {
    path: 'edit-product/:productId/:bankId',
    component: AddProductComponent
  }
];

export const routing = RouterModule.forChild(routes);

