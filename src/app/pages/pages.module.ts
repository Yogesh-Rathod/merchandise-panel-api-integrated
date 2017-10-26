import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { FileSelectDirective } from 'ng2-file-upload';

import { Pages } from './pages.component';

import { MerchandiseService } from 'app/services';
import { BulkUploadComponent } from './merchandise/categories/bulk-upload/bulk-upload.component';
import { ProductsBulkUploadComponent } from './merchandise/products/bulk-upload/bulk-upload.component';
import { VendorsBulkUploadComponent } from './merchandise/vendor/bulk-upload/bulk-upload.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
  ],
  declarations: [
    Pages,
    BulkUploadComponent,
    ProductsBulkUploadComponent,
    VendorsBulkUploadComponent,
    FileSelectDirective
  ],
  providers: [
    MerchandiseService,
  ],
  entryComponents: [
    BulkUploadComponent,
    ProductsBulkUploadComponent,
    VendorsBulkUploadComponent
  ],
})
export class PagesModule {
}
