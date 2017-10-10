import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import { MerchandiseService } from 'app/services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  public config = {
    uiColor: '#F0F3F4',
    height: '200'
  };
  productId: any;
  showLoader = false;
  categories = [];
  categoriesDropdownSettings = {
    singleSelection: false,
    text: "Select Categories",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'col-9'
  };
  selectedItems = [];

  constructor(
    private fb: FormBuilder,
    private merchandiseService: MerchandiseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params =>
      this.productId = params['productId']
    )
  }

  ngOnInit() {
    this.createForm();
    this.getAllCategories();
  }

  createForm() {
    this.addProductForm = this.fb.group({
      'id': [''],
      'name': ['', Validators.compose([Validators.required,
      Validators.minLength(1), Validators.maxLength(100)])],
      'shortDescription': ['', Validators.compose([Validators.required,
      Validators.minLength(1), Validators.maxLength(1000)])],
      'fullDescription': ['', Validators.compose([
        Validators.minLength(1), Validators.maxLength(5000)])],
      'sku': ['', Validators.required],
      'price': ['', Validators.required],
      'categories': [[]]
    });
  }

  addProduct(addProductForm) {
    console.log("addProductForm ", addProductForm);
  }

  getAllCategories() {
    this.categories = this.merchandiseService.getCategories();
    let categoriesArray = [];
    _.forEach(this.categories, (category) => {
      if (category.parent_name) {
        categoriesArray.push({
          id: `${category.parent_name} >> ${category.name}`,
          itemName: `${category.parent_name} >> ${category.name}`
        });
      } else {
        categoriesArray.push({
          id: category.name,
          itemName: category.name
        });
      }
    });
    this.categories = categoriesArray;
  }

  deleteProduct() { }

}
