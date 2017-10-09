import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './products.routes';
import { DataTableModule } from "angular2-datatable";

import { ProductsComponent} from './products.component';
import { ProductsService } from 'app/services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    routing,
    ReactiveFormsModule,
    DataTableModule
  ],
  declarations: [
    ProductsComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule {}
