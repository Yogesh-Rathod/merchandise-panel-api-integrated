import { DataTableModule } from 'angular2-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './vendor.routes';

import { SearchVendorPipe } from './search-vendor.pipe';
import { VendorComponent} from './vendor.component';
import { VendorsService } from 'app/services';
import { AddVendorComponent } from './add-vendor/add-vendor.component';

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
    VendorComponent,
    SearchVendorPipe,
    AddVendorComponent
  ],
  providers: [
    VendorsService
  ],
})
export class VendorModule {}
