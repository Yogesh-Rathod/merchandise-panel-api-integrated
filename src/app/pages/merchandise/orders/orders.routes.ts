import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
// import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'add-order',
    // component: AddCategoryComponent
  }
];

export const routing = RouterModule.forChild(routes);

