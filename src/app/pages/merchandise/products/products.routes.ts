import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
    // children: [
    //   { path: '', redirectTo: 'points', pathMatch: 'full'},
    //   { path: 'points', loadChildren: './points/points.module#PointsModule'}
    // ]
  }
];

export const routing = RouterModule.forChild(routes);

