import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { VendorsService } from 'app/services';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: [`./vendor.component.scss`],
})
export class VendorComponent implements OnInit {

  vendorsList: any;
  searchTerm: any;

  constructor(
    public toastr: ToastsManager,
    private route: ActivatedRoute,
    private router: Router,
    private vendorsService: VendorsService) {
  }

  ngOnInit() {
    this.getAllVendors();
  }

  getAllVendors() {
    this.vendorsList = this.vendorsService.getVendors();
    console.log("this.vendorsList ", this.vendorsList);
  }

  searchVendor(searchText) {
    this.searchTerm = searchText;
  }

  bulkUpload() {}

  deleteVendor() {
    // _.remove(this.vendorsList, this.vendorInDeleteMode);
    this.vendorsService.editVendor(this.vendorsList);
    this.toastr.success('Vendor deleted successfully!', 'Success!');
  }

}
