import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: CategoriesComponent
  },
  {
    path: 'add-category',
    // canActivate: [AuthGuard],
    component: AddCategoryComponent
  },
  {
    path: 'edit-category/:categoryId',
    // canActivate: [AuthGuard],
  	component: AddCategoryComponent
  }
];

export const routing = RouterModule.forChild(routes);

