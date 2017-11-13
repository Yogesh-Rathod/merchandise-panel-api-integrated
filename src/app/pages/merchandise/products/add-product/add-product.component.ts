import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';

import { RegEx } from 'app/pages/regular-expressions';
import { MerchandiseService, ProductsService, VendorsService } from 'app/services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  config = {
    uiColor: '#F0F3F4',
    height: '200',
    toolbarCanCollapse: true
  };
  productId: any;
  products: any;
  productInfo: any;
  showLoader = false;
  deleteLoader = false;
  categories = [];
  vendors: any;
  categoriesDropdownSettings = {
    singleSelection: false,
    text: "Select Categories",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'col-8 no_padding'
  };
  currencyOptions = ['₹ (INR)', '$ (US)'];
  statusOptions = ['Active', 'Inactive', 'Banned', 'Out of stock'];
  bigLoader = true;
  productImageName;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    editableDateField: false,
    openSelectorOnInputClick: true
  };
  bankId: any;
  vendorId: any;

  constructor(
    public toastr: ToastsManager,
    private _location: Location,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private merchandiseService: MerchandiseService,
    private vendorsService: VendorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.productId = params['productId'];
      this.bankId = params['bankId'];
      this.vendorId = params['vendorId'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.getProductInfoForEdit(this.productId);
    this.getAllVendors();
    this.getAllCategories();
    this.bigLoader = false;
  }

  createForm() {
    this.addProductForm = this.fb.group({
      'id': [''],
      'name': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ])
      ],
      'shortDescription': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000)
        ])
      ],
      'fullDescription': [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(5000)
        ])
      ],
      'sku': [
        '',
        Validators.required
      ],
      'status': [
        '',
        Validators.required
      ],
      'currency': [''],
      'netPrice': [
        '',
        Validators.required
      ],
      'netShipping': [
        '',
        Validators.required
      ],
      'MrpPrice': [
        '',
        Validators.required
      ],
      'oldPrice': [''],
      'retailPrice': [
        '',
        Validators.required
      ],
      'retailShipping': [
        '',
        Validators.required
      ],
      'rpi': [
        '',
        Validators.required
      ],
      'applicableDate': [''],
      'stockQuantity': [
        '',
        Validators.required
      ],
      'categories': [
        [],
        // Validators.required
      ],
      'vendor': [
        '',
        // Validators.required
      ],
      'pictureName': [''],
      'pictureAlt': [''],
      'pictureTitle': [''],
      'pictureDisplayorder': [''],
      'type': [''],
      'brand': ['']
    });
  }

  getAllVendors() {
    this.vendorsService.getVendors('vendors').
      then((successData) => {
        console.log("getAllVendors successData", successData);
        this.vendors = successData.data;
      }).catch(error => console.log(error));
  }

  validatenumber(e) {
    if (!RegEx.Numbers.test(`${e.key}`) && `${e.key}`.length === 1) {
      e.preventDefault();
    }
  }

  getProductInfoForEdit(productId) {
    if (this.productId) {
      this.productsService.getProducts(`product/${productId}`).
      then( (successData) => {
 console.log("successData ", successData);
        this.productInfo = successData.data;
        this.addProductForm.controls['id'].setValue(this.productInfo[0]._id);
        this.addProductForm.controls['name'].setValue(this.productInfo[0].name);
          this.addProductForm.controls['shortDescription'].setValue(this.productInfo[0].shortDescription);
          this.addProductForm.controls['fullDescription'].setValue(this.productInfo[0].fullDescription);
          this.addProductForm.controls['sku'].setValue(this.productInfo[0].sku);
          this.addProductForm.controls['status'].setValue(this.productInfo[0].status);
          this.addProductForm.controls['currency'].setValue(this.productInfo[0].currency);
          this.addProductForm.controls['netPrice'].setValue(this.productInfo[0].netPrice);
          this.addProductForm.controls['netShipping'].setValue(this.productInfo[0].netShipping);
          this.addProductForm.controls['MrpPrice'].setValue(this.productInfo[0].MrpPrice);
          this.addProductForm.controls['oldPrice'].setValue(this.productInfo[0].MrpPrice);
          this.addProductForm.controls['retailPrice'].setValue(this.productInfo[0].retailPrice);
          this.addProductForm.controls['retailShipping'].setValue(this.productInfo[0].retailShipping);
          this.addProductForm.controls['rpi'].setValue(this.productInfo[0].rpi);
          this.addProductForm.controls['stockQuantity'].setValue(this.productInfo[0].stockQuantity);
          this.addProductForm.controls['vendor'].setValue(this.productInfo[0].vendor);
          // this.addProductForm.controls['pictureName'].setValue(this.productInfo[0].picture[0].url);
          // this.addProductForm.controls['pictureAlt'].setValue(this.productInfo[0].picture[0].alt);
          // this.addProductForm.controls['pictureTitle'].setValue(this.productInfo[0].picture[0].title);
          // this.addProductForm.controls['pictureDisplayorder'].setValue(this.productInfo[0].picture[0].displayOrder);
          // this.addProductForm.controls['categories'].setValue([this.productInfo[0].categories]);
          this.addProductForm.controls['type'].setValue(this.productInfo[0].type);
          this.addProductForm.controls['brand'].setValue(this.productInfo[0].brand);
      }).catch(error => console.log(error));
    }
  }

  addProduct(addProductForm) {
    this.showLoader = true;
    console.log("addProductForm ", addProductForm);
    let productInfo = {
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
      MrpPrice: addProductForm.MrpPrice,
      oldPrice: addProductForm.oldPrice,
      vendor: addProductForm.vendor,
      retailPrice: addProductForm.retailPrice,
      stockQuantity: addProductForm.stockQuantity,
      productType: 'Simple',
      status: addProductForm.status,
      categories: addProductForm.categories
    };

    if (addProductForm.id) {
      this.productsService.addProduct(`updateProduct/${this.productId}`, productInfo).
        then((success) => {
          this.toastr.success('Sucessfully Done!', 'Sucess!');
          this.showLoader = false;
          this.goBack();
        }).catch((error) => {
          this.toastr.error('Oops!!! Something went wrong.', 'Error!');
          this.showLoader = false;
        });
    } else {
      this.productsService.addProduct('product', productInfo).
        then((success) => {
          console.log("Save data success ", success);
          this.toastr.success('Sucessfully Done!', 'Sucess!');
          this.showLoader = false;
          this.goBack();
        }).catch((error) => {
          this.toastr.error('Oops!!! Something went wrong.', 'Error!');
          this.showLoader = false;
        });
    }
  }

  getAllCategories() {
    this.merchandiseService.getCategories('categories').
      then((successData) => {
        console.log("getAllCategories successData ", successData);
        _.forEach(successData.data , (eachcategory) => {
          this.categories.push({
            id: eachcategory._id,
            itemName: eachcategory.breadCrumb
          });
        });
      }).catch((error) => {
        console.log("error ", error);
      });
  }

  deleteProduct() {
    this.deleteLoader = true;
    _.remove(this.products, this.productInfo);
    this.productsService.editProduct(this.products);
    this.deleteLoader = false;
    this.goBack();
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

  goBack() {
    this._location.back();
  }

  resetForm() {
    this.createForm();
  }

}
