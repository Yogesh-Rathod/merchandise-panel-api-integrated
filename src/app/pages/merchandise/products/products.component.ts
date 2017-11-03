import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
declare let $: any;

import { ProductsService, MerchandiseService } from 'app/services';
import { ProductsBulkUploadComponent } from "./bulk-upload/bulk-upload.component";
import { ProductsDeletePopupComponent } from './delete-popup/delete-popup.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  searchProductForm: FormGroup;
  bigLoader = true;
  deleteLoader: Number;
  products: any;
  categories: any;
  stores = ['store 1', 'store 2', 'store 3'];
  productTypes = [
    'simple',
    'grouped (product with variants)'
  ];
  manufacturer = ['apple', 'lenovo', 'samsung'];
  status = ['Active', 'Inactive', 'Banned', 'Out of stock'];
  vendor = ['vendor 1', 'vendor 2'];
  showSelectedDelete = false;
  selectAllCheckbox = false;

  constructor(
    public toastr: ToastsManager,
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
    this.bigLoader = false;
  }

  // For Creating Add Category Form
  searchForm() {
    this.searchProductForm = this.fb.group({
      name: [''],
      store: [''],
      category: [''],
      productType: [''],
      manufacturer: [''],
      status: [''],
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

  selectAll(e) {
    if (e.target.checked) {
      this.selectAllCheckbox = true;
      _.forEach(this.products, (item) => {
        item.isChecked = true;
      });
      this.showSelectedDelete = true;
    } else {
      this.selectAllCheckbox = false;
      _.forEach(this.products, (item) => {
        item.isChecked = false;
      });
      this.showSelectedDelete = false;
    }
  }

  checkBoxSelected(e, item) {
    this.selectAllCheckbox = false;
    if (e.target.checked) {
      item.isChecked = true;
    } else {
      item.isChecked = false;
    }

    let isCheckedArray = [];
    
    _.forEach(this.products, (item) => {
      if (item.isChecked) {
        this.showSelectedDelete = true;
        isCheckedArray.push(item);
      }
    });

    if (isCheckedArray.length === 0) {
      this.showSelectedDelete = false;
    }

  }

  deactivateAll() {
    _.forEach(this.products, (item) => {
      item.status = 'Inactive';
    });
  }

  deleteAll() {
    const activeModal = this.modalService.open(ProductsDeletePopupComponent, { size: 'sm' });

    activeModal.result.then((status) => {
      if (status) {
        this.products = [];
        this.toastr.success('Successfully Deleted!', 'Success!');
        this.selectAllCheckbox = false;
        this.showSelectedDelete = false;
      }
    });
  }

  deleteProduct(item, index) {
    const activeModal = this.modalService.open(ProductsDeletePopupComponent, { size: 'sm' });

    activeModal.result.then((status) => {
      if (status) {
        this.deleteLoader = index;
        _.remove(this.products, item);
        this.productsService.editProduct(this.products);
        this.deleteLoader = NaN;
        this.toastr.success('Successfully Deleted!', 'Success!');
      }
    });
    
  }

  resetForm() {
    this.searchForm();
  }

}
