import { Routes, RouterModule } from '@angular/router';

import { VendorComponent} from './vendor.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';

const routes: Routes = [
  {
    path: '',
    component: VendorComponent,
  },
  {
    path: 'add-vendor',
    component: AddVendorComponent
  },
  {
    path: 'edit-vendor/:categoryId',
    component: AddVendorComponent
  }
];

export const routing = RouterModule.forChild(routes);

