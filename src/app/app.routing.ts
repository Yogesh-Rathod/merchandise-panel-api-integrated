import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'PageNotFound' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
