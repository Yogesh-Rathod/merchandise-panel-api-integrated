import { DataTableModule } from 'angular2-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './vendor.routes';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { SearchVendorPipe } from './search-vendor.pipe';
import { VendorComponent} from './vendor.component';
import { VendorsService } from 'app/services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    routing,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    DataTableModule
  ],
  declarations: [
    VendorComponent,
    SearchVendorPipe
  ],
  providers: [
    VendorsService
  ],
})
export class VendorModule {}
