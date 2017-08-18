import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: '**', redirectTo: 'PageNotFound' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
