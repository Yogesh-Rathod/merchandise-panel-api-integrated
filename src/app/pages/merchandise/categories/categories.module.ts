import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './categories.routes';

import { CKEditorModule } from 'ng2-ckeditor';
import { CategoriesComponent } from './categories.component';
import { MerchandiseService } from 'app/services';
import { AddCategoryComponent } from './add-category/add-category.component';
// import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    routing,
    ReactiveFormsModule,
    CKEditorModule
  ],
  declarations: [
    CategoriesComponent,
    AddCategoryComponent,
    // BulkUploadComponent
  ],
  providers: [
    MerchandiseService
  ],
  entryComponents: [
    // BulkUploadComponent
  ]
})
export class CategoriesModule {}
