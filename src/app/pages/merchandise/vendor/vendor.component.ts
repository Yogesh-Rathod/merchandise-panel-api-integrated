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
  checkedItemsArray = [];

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
        this.checkedItemsArray.push(item._id);
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
    if (e.target.checked) {
      if (!(this.checkedItemsArray.indexOf(item._id) > -1)) {
        this.checkedItemsArray.push(item._id);
      }
    } else {
      var index = this.checkedItemsArray.indexOf(item._id);
      if (index >= 0) {
        this.checkedItemsArray.splice( index, 1 );
      }
    }
    if (this.checkedItemsArray.length > 0) {
      this.showSelectedDelete = true;
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

    const ids = {
      ids : this.checkedItemsArray
    };
    activeModal.result.then((status) => {
      if (status) {
        this.vendorsService.addVendor('deleteMultipleVendors', ids).
        then( (success) => {
          this.toastr.success('Successfully Deleted!', 'Success!');
          this.selectAllCheckbox = false;
          this.showSelectedDelete = false;
          this.getAllVendors();
        }).catch(error => console.log(error));
        // this.vendorsList = [];
      }
    });
  }

  bulkUpload() {
    const activeModal = this.modalService.open(VendorsBulkUploadComponent, { size: 'sm' });

    activeModal.result.then(() => {
      this.getAllVendors();
    });
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
