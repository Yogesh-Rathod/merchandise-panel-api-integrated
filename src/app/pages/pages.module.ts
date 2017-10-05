import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';

import { MerchandiseService } from 'app/services';
import { BulkUploadComponent } from './merchandise/categories/bulk-upload/bulk-upload.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
  ],
  declarations: [
    Pages,
    BulkUploadComponent
  ],
  providers: [
    MerchandiseService,
  ],
  entryComponents: [
    BulkUploadComponent
  ],
})
export class PagesModule {
}
