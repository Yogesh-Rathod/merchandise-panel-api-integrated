import { Routes, RouterModule } from '@angular/router';

import { VendorComponent} from './vendor.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';

const routes: Routes = [
  {
    path: '',
    component: VendorComponent,
  },
  {
    path: ':id/products',
    component: ProductsComponent,
  },
  {
    path: ':id/addproduct/:product',
    component: AddproductComponent,
  },
  {
    path: ':id/editproduct/:product',
    component: AddproductComponent,
  },
];

export const routing = RouterModule.forChild(routes);

