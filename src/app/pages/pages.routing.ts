import { AuthGuard } from './../guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from '../not-found/not-found.component';

export const routes: Routes = [
//   {
//     path: 'login',
//     canActivate: [AuthGuard],
//     loadChildren: 'lrshared_modules/pages/login/login.module#LoginModule'
//   },
  {
    path: '',
    component: Pages,
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'merchandise/categories',
        pathMatch: 'full'
      },
      {
        path: 'merchandise',
        loadChildren: './merchandise/merchandise.module#MerchandiseModule'
      },
      // {
      //   path: 'user-management',
      //   loadChildren: 'lrshared_modules/pages/user-management/user-management.module#UserManagementModule'
      // },
      {
        path: 'orders',
        loadChildren: './merchandise/orders/orders.module#OrdersModule'
      },
      {
        path: 'catalog-management',
        loadChildren: './merchandise/catalog-management/catalog-management.module#CatalogManagementModule'
      }
    ]
  },
  // To Be Done At The End
  {
    path: 'PageNotFound',
    component: NotFoundComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
