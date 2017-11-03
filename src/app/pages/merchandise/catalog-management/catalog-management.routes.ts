import { AuthGuard } from './../../../guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

import { CatalogManagementComponent } from './catalog-management.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogManagementComponent
  },
   {
     path: 'bank-details/:bankId',
    component: BankDetailsComponent
  }
];

export const routing = RouterModule.forChild(routes);

