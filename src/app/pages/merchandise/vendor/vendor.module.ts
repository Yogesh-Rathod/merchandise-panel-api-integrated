import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './vendor.routes';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { VendorComponent} from './vendor.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    routing,
    ReactiveFormsModule,
    ToastModule.forRoot(),
  ],
  declarations: [
    VendorComponent,
    ProductsComponent,
    AddproductComponent,
  ],
  providers: [
  ],
})
export class VendorModule {}
