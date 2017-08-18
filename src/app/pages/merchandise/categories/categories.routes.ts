import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent} from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    // children: [
    //   { path: '', redirectTo: 'points', pathMatch: 'full'},
    //   { path: 'points', loadChildren: './points/points.module#PointsModule'}
    // ]
  },
];

export const routing = RouterModule.forChild(routes);

