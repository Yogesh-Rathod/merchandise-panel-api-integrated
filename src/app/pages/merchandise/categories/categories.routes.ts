import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  },
];

export const routing = RouterModule.forChild(routes);

