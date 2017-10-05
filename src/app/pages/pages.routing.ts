import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from '../not-found/not-found.component';
// import { LoginComponent } from 'app/lrshared_modules/pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'lrshared_modules/pages/login/login.module#LoginModule'
  },
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
