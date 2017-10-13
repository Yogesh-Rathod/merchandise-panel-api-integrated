import { AuthGuard } from './../guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from '../not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: 'lrshared_modules/pages/login/login.module#LoginModule'
  },
  {
    path: '',
    component: Pages,
    children: [
      { 
        path: '', 
        canActivate: [AuthGuard], 
        canActivateChild: [AuthGuard], 
        redirectTo: 'merchandise/categories', 
        pathMatch: 'full' 
      },
      { 
        path: 'merchandise', 
        canActivate: [AuthGuard], 
        canActivateChild: [AuthGuard], 
        loadChildren: './merchandise/merchandise.module#MerchandiseModule' 
      },
      {
        path: 'user-management',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: 'lrshared_modules/pages/user-management/user-management.module#UserManagementModule'
      }
    ]
  },
  {
    path: 'PageNotFound',
    component: NotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
