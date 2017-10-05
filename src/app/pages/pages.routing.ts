import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from '../not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: Pages,
    children: [
      { path: '', redirectTo: 'merchandise/categories', pathMatch: 'full' },
      { path: 'merchandise', loadChildren: './merchandise/merchandise.module#MerchandiseModule' },
    ],
  },
  {
    path: 'PageNotFound',
    component: NotFoundComponent,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
