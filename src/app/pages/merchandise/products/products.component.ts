import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
declare let $: any;

import { ProductsService, MerchandiseService } from 'app/services';
import { ProductsBulkUploadComponent } from "./bulk-upload/bulk-upload.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  searchProductForm: FormGroup;
  bigLoader = false;
  products: any;
  categories: any;
  stores = ['store 1', 'store 2', 'store 3'];
  productTypes = [
    'simple',
    'grouped (product with variants)'
  ];
  manufacturer = ['apple', 'lenovo', 'samsung'];
  published = ['published', 'unpublished'];
  vendor = ['vendor 1', 'vendor 2'];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private merchandiseService: MerchandiseService) {
  }

  ngOnInit() {
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.searchForm();
    this.getAllProducts();
    this.getAllCategories();
  }

  // For Creating Add Category Form
  searchForm() {
    this.searchProductForm = this.fb.group({
      name: [''],
      store: [''],
      category: [''],
      productType: [''],
      manufacturer: [''],
      published: [''],
      vendor: ['']
    });
  }

  getAllCategories() {
    this.categories = this.merchandiseService.getCategories();
  }

  getAllProducts() {
    this.products = this.productsService.getProducts();
  }

  searchProduct(searchProductForm) {
    console.log('searchProductForm', searchProductForm);
  }

  bulkUpload() {
    const activeModal = this.modalService.open(ProductsBulkUploadComponent, { size: 'sm' });
  }

  resetForm() {
    this.searchForm();
  }

}
