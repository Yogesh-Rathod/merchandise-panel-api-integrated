import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { VendorsService } from 'app/services';
import { VendorsBulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { VendorDeletePopupComponent } from './delete-popup/delete-popup.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: [`./vendor.component.scss`],
})
export class VendorComponent implements OnInit {

  vendorsList: any;
  searchTerm: any;
  bigLoader = false;
  deleteLoader: Number;
  showSelectedDelete = false;
  selectAllCheckbox = false;

  constructor(
    private modalService: NgbModal,
    public toastr: ToastsManager,
    private route: ActivatedRoute,
    private router: Router,
    private vendorsService: VendorsService) {
  }

  ngOnInit() {
    this.getAllVendors();
  }

  selectAll(e) {
    if (e.target.checked) {
      this.selectAllCheckbox = true;
      _.forEach(this.vendorsList, (item) => {
        item.isChecked = true;
      });
      this.showSelectedDelete = true;
    } else {
      this.selectAllCheckbox = false;
      _.forEach(this.vendorsList, (item) => {
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

    _.forEach(this.vendorsList, (item) => {
      if (item.isChecked) {
        this.showSelectedDelete = true;
        isCheckedArray.push(item);
      }
    });

    if (isCheckedArray.length === 0) {
      this.showSelectedDelete = false;
    }

  }

  getAllVendors() {
    this.vendorsService.getVendors('vendors').
    then( (successData) => {
      console.log("successData", successData);
      this.vendorsList = successData.data;
    }).catch(error => console.log(error));
  }

  searchVendor(searchText) {
    this.searchTerm = searchText;
    if (this.searchTerm) {
      this.vendorsService.getVendors(`vendors?name=${this.searchTerm}`).
      then( (successData) => {
        this.vendorsList = successData.data;
      }).catch(error => console.log(error));
    } else {
      this.vendorsService.getVendors('vendors').
      then( (successData) => {
        console.log("successData", successData);
        this.vendorsList = successData.data;
      }).catch(error => console.log(error));
    }
  }

  deactivateAll() {
    if (this.selectAllCheckbox) {
      _.forEach(this.vendorsList, (item) => {
        item.status = false;
        item.isChecked = false;
      });
    } else {
      _.forEach(this.vendorsList, (item) => {
        if (item.isChecked) {
          item.status = false;
          item.isChecked = false;
        }
      });
    }
    this.selectAllCheckbox = false;
    this.showSelectedDelete = false;
  }

  deleteAll() {
    const activeModal = this.modalService.open(VendorDeletePopupComponent, { size: 'sm' });
    activeModal.componentInstance.modalText = 'vendors';

    activeModal.result.then((status) => {
      if (status) {
        this.vendorsList = [];
        this.toastr.success('Successfully Deleted!', 'Success!');
        this.selectAllCheckbox = false;
        this.showSelectedDelete = false;
      }
    });
  }

  bulkUpload() {
    const activeModal = this.modalService.open(VendorsBulkUploadComponent, { size: 'sm' });
  }

  deleteVendor(item, index) {
    this.deleteLoader = index;
    const activeModal = this.modalService.open(VendorDeletePopupComponent, { size: 'sm' });
    activeModal.componentInstance.modalText = 'vendor';

    console.log("item", item);
    activeModal.result.then( (status) => {
      if (status) {
        this.vendorsService.getVendors(`deleteVendor/${item._id}`).
        then( (success) => {
          console.log("success", success);
          this.toastr.success('Successfully Deleted!', 'Success!');
          this.deleteLoader = NaN;
          this.getAllVendors();
        }).catch((error) => {
            console.log(error);
            this.toastr.error('Oops!!! Something went wrong.', 'Error!');
            this.deleteLoader = NaN;
        });
      }
    });
  }

}
