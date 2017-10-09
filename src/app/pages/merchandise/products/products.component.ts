import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import { ProductsService } from 'app/services'; 
import { ProductsBulkUploadComponent } from "./bulk-upload/bulk-upload.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  addProductForm: FormGroup;
  products: any;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productsService: ProductsService) { }

  ngOnInit() {
    this.createForm();
    this.getAllProducts();
  }

  // For Creating Add Category Form
  createForm() {
    this.addProductForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      category: [null, Validators.required],
      // images: [null, Validators.required],
    });
  }

  getAllProducts() {
    this.products = this.productsService.getProducts();
    console.log("this.products", this.products);
  }

  addProduct(addProductForm) {
    console.log("addProductForm", addProductForm);

  }

  bulkUpload() {
    const activeModal = this.modalService.open(ProductsBulkUploadComponent, { size: 'sm' });
  }

}
