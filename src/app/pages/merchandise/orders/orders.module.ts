import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './orders.routes';
import { DataTableModule } from "angular2-datatable";

import { CKEditorModule } from 'ng2-ckeditor';
import { MerchandiseService } from 'app/services';

import { OrdersComponent } from "./orders.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    routing,
    ReactiveFormsModule,
    CKEditorModule,
    DataTableModule
  ],
  declarations: [
    OrdersComponent
  ],
  providers: [
    MerchandiseService
  ],
  entryComponents: [
  ]
})
export class OrdersModule {}
