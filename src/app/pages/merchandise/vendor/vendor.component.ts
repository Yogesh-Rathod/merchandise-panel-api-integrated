import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import * as $ from 'jquery';
import * as _ from 'lodash';
import 'datatables.net';

import { MerchandiseService } from 'app/services';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: [`./vendor.component.scss`],
})
export class VendorComponent implements OnInit {
  vendorsList: any;
  vendorInDeleteMode: any;
  jquery: JQueryStatic;

  constructor(
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private merchandiseService: MerchandiseService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllVendors();
    this.dataTablesInit();
  }

  getAllVendors() {
    this.vendorsList = this.merchandiseService.getVendors();
  }

  dataTablesInit() {
    $(document).ready( () => {
      (<any> $('#vendortable')).DataTable({
        'lengthMenu': [[10, 20, 30, -1], [10, 20, 30, 'All']],
        'autoWidth': false,
        'language': {
          'emptyTable': 'There are no vendors!',
        },
      });
    });
  }

  deleteVendorPopUp(vendor) {
    this.vendorInDeleteMode = vendor;
  }

  deleteVendor() {
    _.remove(this.vendorsList, this.vendorInDeleteMode);
    this.merchandiseService.deleteVendor(this.vendorsList);
    this.toastr.success('Item deleted successfully!', 'Success!', {toastLife: 2000} );
    (<any> $('#vendortable')).dataTable().fnDestroy();
    this.ngOnInit();
  }

}
