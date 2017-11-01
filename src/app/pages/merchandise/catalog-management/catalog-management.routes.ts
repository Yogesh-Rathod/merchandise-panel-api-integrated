import { AuthGuard } from './../../../guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

import { CatalogManagementComponent } from './catalog-management.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogManagementComponent
  }
];

export const routing = RouterModule.forChild(routes);

