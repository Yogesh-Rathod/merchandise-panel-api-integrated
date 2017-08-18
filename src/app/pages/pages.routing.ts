import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from '../not-found/not-found.component';

import { AuthGuard } from '../gaurds';

export const routes: Routes = [

  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
  },
    { path: 'PageNotFound', component: NotFoundComponent },

  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule',
  },
  {
    path: '',
    component: Pages,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'merchandise/categories', pathMatch: 'full' },
      { path: 'merchandise', loadChildren: './merchandise/merchandise.module#MerchandiseModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
