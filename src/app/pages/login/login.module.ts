import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';
import { routing } from './login.routing';
import { SharedModule } from 'app/shared';


@NgModule({
  imports: [
    NgaModule,
    routing,
    SharedModule,
  ],
  declarations: [
    Login,
  ],
})
export class LoginModule { }
