import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import { MerchandiseService, ProductsService } from 'app/services';

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
    classes: 'col-8 no_padding'
  };
  selectedItems = [];
  bigLoader = true;
  productImageName;

  constructor(
    private _location: Location,
    private fb: FormBuilder,
    private productsService: ProductsService,
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
    this.bigLoader = false;
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
      'published': [''],
      'price': ['', Validators.required],
      'stockQuantity': ['', Validators.required],
      'categories': [[]],
      'pictureName': [''],
      'pictureAlt': [''],
      'pictureTitle': [''],
      'pictureDisplayorder': ['']
    });
  }

  addProduct(addProductForm) {
    console.log("addProductForm ", addProductForm);
    let productInfo = {
      id: Math.floor(Math.random() * 90000) + 10000,
      picture: [
        {
          url: this.productImageName,
          alt: addProductForm.pictureAlt,
          title: addProductForm.pictureTitle,
          displayOrder: addProductForm.pictureDisplayorder
        }
      ],
      name: addProductForm.name,
      shortDescription: addProductForm.shortDescription,
      fullDescription: addProductForm.fullDescription,
      sku: addProductForm.sku,
      price: addProductForm.price,
      stockQuantity: addProductForm.stockQuantity,
      productType: 'Simple',
      published: addProductForm.published,
      categories: addProductForm.categories
    };
    this.productsService.addProduct(productInfo);
    // const products = this.productsService.getProducts();
    // console.log("products ", products);
    // this.router.navigate(['../']);
    this._location.back();
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

  uploadProductImage(addProductForm) {
    console.log("addProductForm ", addProductForm);
  }

  productImageSelected(image) {
    if (image.target.files.length > 0) {
      this.productImageName = image.target.files[0].name;
    } else {
      this.productImageName = '';
    }
  }

  resetForm() {
    this.createForm();
  }

}
