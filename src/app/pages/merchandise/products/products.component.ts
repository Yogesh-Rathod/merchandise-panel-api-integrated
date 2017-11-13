import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
declare let $: any;

import { ProductsService, MerchandiseService, VendorsService } from 'app/services';
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
  vendors: any;
  showSelectedDelete = false;
  selectAllCheckbox = false;
  atLeastOnePresent = false;
  vendorId: any;
  vendorInfo: any;
  dropDownAction = ['Delete Selected', 'Deactivate Selected', 'Approve Selected', 'Reject Selected'];

  constructor(
    public toastr: ToastsManager,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private vendorsService: VendorsService,
    private merchandiseService: MerchandiseService) {
    this.route.params.subscribe((params) => {
      this.vendorId = params['vendorId'];
    });
  }

  ngOnInit() {
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.searchForm();
    this.getAllProducts();
    this.getAllCategories();
    this.getAllVendors();
    this.bigLoader = false;
    if (this.vendorId) {
      this.getVendorInfo(this.vendorId);
    }
  }

  // For Creating Add Category Form
  searchForm() {
    this.searchProductForm = this.fb.group({
      name: [''],
      id: [''],
      category: [''],
      productType: [''],
      manufacturer: [''],
      status: [''],
      vendor: ['']
    });
  }

  getAllCategories() {
    this.merchandiseService.getCategories('categories').
      then((successData) => {
        console.log("getAllCategories successData ", successData);
        this.categories = successData.data;
      }).catch((error) => {
        console.log("error ", error);
      });
  }

  getAllProducts() {
    this.productsService.getProducts('products').
    then( (successData) => {
      console.log("successData ", successData);
      this.products = successData.data;
    }).catch(error => console.log(error) );
  }

  getAllVendors() {
    this.vendorsService.getVendors('vendors').
      then((successData) => {
        console.log("getAllVendors successData", successData);
        this.vendors = successData.data;
      }).catch(error => console.log(error));
  }

  atLeastOneFieldRequires(someObject) {
    if (someObject) {
      for (var key in someObject) {
        if (someObject.hasOwnProperty(key)) {
          if (someObject[key]) {
            this.atLeastOnePresent = false;
            return;
          } else {
            this.atLeastOnePresent = true;
          }
        }
      }
    }
  }

  searchProduct(searchProductForm) {
    this.atLeastOneFieldRequires(searchProductForm);
    if (!this.atLeastOnePresent) {
      let searchQuery = '';
      for (let key in searchProductForm) {
        if (searchProductForm.hasOwnProperty(key)) {
          if (searchProductForm[key]) {
            searchQuery += `&${key}=${searchProductForm[key]}`;
          }
        }
      }
      if (searchProductForm) {
        this.productsService.getProducts(`products?${searchQuery}`).
          then((successData) => {
            console.log("searchProduct successData IF", successData);
            this.products = successData.data;
          }).catch(error => console.log(error));
      } else {
        this.productsService.getProducts('products').
          then((successData) => {
            console.log("searchProduct successData ELSE", successData);
            this.products = successData.data;
          }).catch(error => console.log(error));
      }
    }
  }

  bulkUpload() {
    const activeModal = this.modalService.open(ProductsBulkUploadComponent, { size: 'sm' });
  }

  getVendorInfo(vendorId) {
    // const vendors = this.vendorsService.getVendors();
    // _.forEach(vendors, (vendor) => {
    //   if (parseInt(vendor.id) === parseInt(vendorId)) {
    //     this.vendorInfo = vendor;
    //     console.log("this.vendorInfo", this.vendorInfo );
    //     this.searchProductForm.controls['vendor'].setValue(vendor);
    //   }
    // });
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

  dropDownActionFunction(dropDownActionValue) {
    console.log("dropDownActionValue ", dropDownActionValue);
    switch (dropDownActionValue) {
      case 'Delete Selected':
        this.deleteAll();
        break;
      case 'Deactivate Selected':
        this.deactivateAll();
        break;
      case 'Approve Selected':
        this.approveAll();
        break;
      case 'Reject Selected':
        this.rejectAll();
        break;
      default:
        break;
    }
  }

  rejectAll() {
    if (this.selectAllCheckbox) {
      _.forEach(this.products, (item) => {
        item.approvalStatus = 'Rejected';
        item.isChecked = false;
      });
    } else {
      _.forEach(this.products, (item) => {
        if (item.isChecked) {
          item.approvalStatus = 'Rejected';
          item.isChecked = false;
        }
      });
    }
    this.selectAllCheckbox = false;
    this.showSelectedDelete = false;
  }

  approveAll() {
    if (this.selectAllCheckbox) {
      _.forEach(this.products, (item) => {
        item.approvalStatus = 'Approved';
        item.isChecked = false;
      });
    } else {
      _.forEach(this.products, (item) => {
        if (item.isChecked) {
          item.approvalStatus = 'Approved';
          item.isChecked = false;
        }
      });
    }
    this.selectAllCheckbox = false;
    this.showSelectedDelete = false;
  }


  deactivateAll() {
    if (this.selectAllCheckbox) {
      _.forEach(this.products, (item) => {
        item.status = 'Inactive';
        item.isChecked = false;
      });
    } else {
      _.forEach(this.products, (item) => {
        if (item.isChecked) {
          item.status = 'Inactive';
          item.isChecked = false;
        }
      });
    }
    this.selectAllCheckbox = false;
    this.showSelectedDelete = false;
  }

  deleteAll() {
    const activeModal = this.modalService.open(ProductsDeletePopupComponent, { size: 'sm' });
    activeModal.componentInstance.modalText = 'products';

    activeModal.result.then((status) => {
      if (status) {
        if (this.selectAllCheckbox) {
          this.products = [];
        } else {
          _.forEach(this.products, (item) => {
            if (item.isChecked) {
              _.remove(this.products, item);
            }
          });
          this.productsService.editProduct(this.products);
        }
        this.toastr.success('Successfully Deleted!', 'Success!');
        this.selectAllCheckbox = false;
        this.showSelectedDelete = false;
      }
    });
  }

  deleteProduct(item, index) {
    const activeModal = this.modalService.open(ProductsDeletePopupComponent, { size: 'sm' });
    activeModal.componentInstance.modalText = 'product';

    activeModal.result.then((status) => {
      if (status) {
        this.deleteLoader = index;
        this.productsService.getProducts(`deleteProduct/${item._id}`).
          then((success) => {
            this.toastr.success('Successfully Deleted!', 'Success!');
            this.deleteLoader = NaN;
            this.getAllProducts();
          }).catch((error) => {
            console.log(error);
            this.toastr.error('Oops!!! Something went wrong.', 'Error!');
            this.deleteLoader = NaN;
          });
      }
    });

  }

  resetForm() {
    this.searchForm();
  }

}
