import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
declare let $: any;

import { CatalogBulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { BankDeletePopupComponent } from './delete-popup/delete-popup.component';

@Component({
  selector: 'app-catalog-management',
  templateUrl: './catalog-management.component.html',
  styleUrls: ['./catalog-management.component.scss']
})
export class CatalogManagementComponent implements OnInit {

  searchTerm: any;
  showLoader = false;
  banks = [
    {
      id: 12233,
      name: 'Saraswat',
      status: true,
      createdOn: '12/12/2017',
      isChecked: false
    },
    {
      id: 43221,
      name: 'SBI',
      status: false,
      createdOn: '01/01/2017',
      isChecked: false
    },
    {
      id: 56788,
      name: 'PNB',
      status: false,
      createdOn: '11/11/2016',
      isChecked: false
    }
  ];
  showSelectedDelete = false;
  selectAllCheckbox = false;

  constructor(
    private modalService: NgbModal,
    public toastr: ToastsManager,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  searchBank(searchText) {
    console.log("searchText ", searchText);
    this.searchTerm = searchText;
  }

  bulkUpload() {
    const activeModal = this.modalService.open(CatalogBulkUploadComponent, { size: 'sm' });
  }

  selectAll(e) {
    if (e.target.checked) {
      this.selectAllCheckbox = true;
      _.forEach(this.banks, (item) => {
        item.isChecked = true;
      });
      this.showSelectedDelete = true;
    } else {
      this.selectAllCheckbox = false;
      _.forEach(this.banks, (item) => {
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

    _.forEach(this.banks, (item) => {
      if (item.isChecked) {
        this.showSelectedDelete = true;
        isCheckedArray.push(item);
      }
    });

    if (isCheckedArray.length === 0) {
      this.showSelectedDelete = false;
    }

  }

  // deactivateAll() {
  //   if (this.selectAllCheckbox) {
  //     _.forEach(this.products, (item) => {
  //       item.status = 'Inactive';
  //       item.isChecked = false;
  //     });
  //   } else {
  //     _.forEach(this.banks, (item) => {
  //       if (item.isChecked) {
  //         item.status = 'Inactive';
  //         item.isChecked = false;
  //       }
  //     });
  //   }
  //   this.selectAllCheckbox = false;
  //   this.showSelectedDelete = false;
  // }


}
