import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import * as $ from 'jquery';
import * as _ from 'lodash';
import 'datatables.net';

import { MerchandiseService } from 'app/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  vendorId: any = 1;
  allVendorProducts: any;
  vendorProducts: any[] = [];
  bulkUploadFileChosen: boolean = false;
  productForDeletion: any;

  constructor(
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private router: Router,
    private merchandiseService: MerchandiseService,
    private activatedRoute: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getVendorId();
    // this.getProducts();
    this.dataTablesInit();
  }

  getVendorId() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.vendorId = params['id'];
    });
  }

  // getProducts() {
  //   this.vendorProducts = [];
  //   this.allVendorProducts = this.merchandiseService.getProducts();
  //   _.forEach(this.allVendorProducts, (product) => {
  //     if ( parseInt(product.vendorId) === parseInt(this.vendorId) ) {
  //       this.vendorProducts.push(product);
  //     }
  //   });
  // }

  dataTablesInit() {
    $(document).ready( () => {
      (<any> $('#producttable')).DataTable({
        'lengthMenu': [[10, 20, 30, -1], [10, 20, 30, 'All']],
        'autoWidth': false,
        'language': {
          'emptyTable': 'There are no products for this vendor!',
        },
      });
    });
  }

  deleteProductPopUp(product) {
    this.productForDeletion = product;
  }

  // deleteProduct() {
  //   _.remove(this.allVendorProducts, this.productForDeletion);
  //   this.merchandiseService.deleteProduct(this.allVendorProducts);
  //   this.toastr.success('Item deleted successfully!', 'Success!', {toastLife: 2000} );
  //   (<any> $('#producttable')).dataTable().fnDestroy();
  //   this.ngOnInit();
  // }

  fileSelected(event) {
    const fileList: FileList = event.target.files;
    if ( fileList.length > 0) {
      this.bulkUploadFileChosen = true;
    } else {
      this.bulkUploadFileChosen = false;
    }
  }

}
