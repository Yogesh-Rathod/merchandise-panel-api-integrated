import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../app.translation.module';
import { routing } from './products.routes';

import { ProductsComponent} from './products.component';
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
    ProductsComponent,
  ],
  providers: [
    MerchandiseService
  ],
})
export class ProductsModule {}
