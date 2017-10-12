import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
  products: any;
  productInfo: any;
  showLoader = false;
  deleteLoader = false;
  categories = [];
  categoriesDropdownSettings = {
    singleSelection: false,
    text: "Select Categories",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'col-8 no_padding'
  };
  bigLoader = true;
  productImageName;

  constructor(
    public toastr: ToastsManager,
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
    this.getProductInfoForEdit();
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
      'MrpPrice': ['', Validators.required],
      'retailPrice': ['', Validators.required],
      'stockQuantity': ['', Validators.required],
      'categories': [[], Validators.required],
      'pictureName': [''],
      'pictureAlt': [''],
      'pictureTitle': [''],
      'pictureDisplayorder': [''],
      'type': ['']
    });
  }

  getProductInfoForEdit() {
    if (this.productId) {
      this.products = this.productsService.getProducts();
      _.forEach(this.products, (product) => {
        if (product.id === parseInt(this.productId)) {
          this.productInfo = product;
          console.log("this.productInfo ", this.productInfo);
          this.addProductForm.controls['id'].setValue(product.id);
          this.addProductForm.controls['name'].setValue(product.name);
          this.addProductForm.controls['shortDescription'].setValue(product.shortDescription);
          this.addProductForm.controls['fullDescription'].setValue(product.fullDescription);
          this.addProductForm.controls['sku'].setValue(product.sku);
          this.addProductForm.controls['published'].setValue(product.published); 
          this.addProductForm.controls['MrpPrice'].setValue(product.MrpPrice);
          this.addProductForm.controls['retailPrice'].setValue(product.retailPrice);
          this.addProductForm.controls['stockQuantity'].setValue(product.stockQuantity);
          // this.addProductForm.controls['pictureName'].setValue(product.picture[0].url);
          this.addProductForm.controls['pictureAlt'].setValue(product.picture[0].alt);
          this.addProductForm.controls['pictureTitle'].setValue(product.picture[0].title);
          this.addProductForm.controls['pictureDisplayorder'].setValue(product.picture[0].displayOrder);
          this.addProductForm.controls['categories'].setValue(product.categories);
          this.addProductForm.controls['type'].setValue(product.type);
        }
      });
    }
  }

  addProduct(addProductForm) {
    this.showLoader = true;
    console.log("addProductForm ", addProductForm);
    let productInfo = {
      id: Math.floor(Math.random() * 90000) + 10000,
      picture: [
        {
          url: this.productImageName ? this.productImageName : undefined,
          alt: addProductForm.pictureAlt ? addProductForm.pictureAlt : undefined,
          title: addProductForm.pictureTitle ? addProductForm.pictureTitle : undefined,
          displayOrder: addProductForm.pictureDisplayorder ? addProductForm.pictureDisplayorder : undefined
        }
      ],
      name: addProductForm.name ? addProductForm.name : undefined,
      shortDescription: addProductForm.shortDescription,
      fullDescription: addProductForm.fullDescription,
      sku: addProductForm.sku,
      price: addProductForm.price,
      stockQuantity: addProductForm.stockQuantity,
      productType: 'Simple',
      published: addProductForm.published,
      categories: addProductForm.categories
    };

    if (addProductForm.id) {
      productInfo['id'] = addProductForm.id;
      const index = _.findIndex(this.products, { id: productInfo['id'] });
      this.products.splice(index, 1, productInfo);
      this.productsService.editProduct(this.products);
    } else {
      this.productsService.addProduct(productInfo);
    }

    this.toastr.success('Sucessfully Done!', 'Sucess!');
    this.showLoader = false;
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

  deleteProduct() {
    this.deleteLoader = true;
    _.remove(this.products, this.productInfo);
    this.productsService.editProduct(this.products);
    this.deleteLoader = false;
    this._location.back();
  }

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
