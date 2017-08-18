import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import * as _ from 'lodash';

import { MerchandiseService } from 'app/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private merchandiseService: MerchandiseService) { }

  ngOnInit() {
    this.createForm();
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

  addProduct(addProductForm) {
    console.log("addProductForm", addProductForm);

  }

}
