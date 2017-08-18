import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './categories.routes';

import { CategoriesComponent } from './categories.component';
import { MerchandiseService } from 'app/services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    routing,
    ReactiveFormsModule,
  ],
  declarations: [
    CategoriesComponent,
  ],
  providers: [
    MerchandiseService
  ],
})
export class CategoriesModule {}
