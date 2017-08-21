import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import * as _ from 'lodash';

import { MerchandiseService } from 'app/services';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
})
export class AddproductComponent implements OnInit {
  categories: any[] = [];
  addProductForm: FormGroup;
  allProducts: any;
  vendorId: any = 1;
  productId: any = 0;
  productInfo: any;
  allCategoriesArray: any[] = [];
  categoriesLevelsSelected: any;

  constructor(
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private merchandiseService: MerchandiseService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getVendorAndProductId();
    this.getCategories();
    this.createForm();
    if (this.productId > 0) {
      this.getProductToBeEdited();
    }
  }

  // For Creating Add Category Form
  createForm() {
    this.addProductForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      code: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      category: [null, Validators.required],
    });
  }

  getVendorAndProductId() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.vendorId = params['id'];
      this.productId = params['product'];
    });
  }

  getProductToBeEdited() {
    this.allProducts = this.merchandiseService.getProducts();
    _.forEach(this.allProducts, (product) => {
      if ( product.id === parseInt(this.productId) ) {
        this.productInfo = product;
        this.categoriesLevelsSelected = product.categories;
      }
    });

    this.addProductForm = this.fb.group({
      id: [this.productInfo.id],
      name: [this.productInfo.name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      code: [this.productInfo.name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      description: [this.productInfo.desc, Validators.compose([Validators.required, Validators.maxLength(255)])],
      category: [this.productInfo.categories.level4, Validators.required],
    });
  }

  getCategories() {
    this.categories = this.merchandiseService.getCategories();
    _.forEach( this.categories , (category) => {
      _.forEach(category.children , (category1) => {
        _.forEach(category1.children, (category2) => {
          _.forEach(category2.children, (category3) => {
            this.allCategoriesArray.push({
              level1: category.name,
              level2: category1.name,
              level3: category2.name,
              level4: category3.name,
            });
          });
        });
      });
    });
  }

  backClicked() {
    this._location.back();
  }

  addProduct(addProductForm) {
    const productInfo = {
      id: Math.floor(Math.random() * 90000) + 10000,
      name: addProductForm.name,
      code: addProductForm.code,
      desc: addProductForm.description,
      vendorId: this.vendorId,
      categories: this.categoriesLevelsSelected,
    };

    this.merchandiseService.addProduct(productInfo);
    this.toastr.success('Product Added successfully!', 'Success!', {toastLife: 2000} );
    this.createForm();
    setTimeout( () => {
      this.backClicked();
    }, 1000);
  }

  categorySelected(addProductForm) {
    _.forEach(this.allCategoriesArray, (allLevels) => {
      if ( addProductForm.category === allLevels.level4 ) {
        this.categoriesLevelsSelected = allLevels;
      }
    });
  }

  updateProduct(addProductForm) {
    const productToBeEdited = _.findIndex(this.allProducts, { id: addProductForm.id });
    const productInfo = {
      id: addProductForm.id,
      name: addProductForm.name,
      code: addProductForm.code,
      desc: addProductForm.description,
      vendorId: this.vendorId,
      categories: this.categoriesLevelsSelected,
    };
    this.allProducts.splice(productToBeEdited, 1, productInfo);
    this.merchandiseService.editProduct(this.allProducts);
    this.toastr.success('Product Updated successfully!', 'Success!', {toastLife: 2000 } );
    this.createForm();
    setTimeout( () => {
      this.backClicked();
    }, 1000);
  }

  resetForm() {
    this.createForm();
  }

}
