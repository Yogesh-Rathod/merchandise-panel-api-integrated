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
  deleteLoader: Number;
  banks = [
    {
      id: 12233,
      name: 'Saraswat',
      status: true,
      createdOn: '12/12/2017'
    },
    {
      id: 43221,
      name: 'SBI',
      status: false,
      createdOn: '01/01/2017'
    },
    {
      id: 56788,
      name: 'PNB',
      status: false,
      createdOn: '11/11/2016'
    }
  ];

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

  deleteBank(bank, index) {
    const activeModal = this.modalService.open(BankDeletePopupComponent, { size: 'sm' });

    activeModal.result.then((status) => {
      if (status) {
        this.deleteLoader = index;
        _.remove(this.banks, bank);
        this.deleteLoader = NaN;
        this.toastr.success('Successfully Deleted!', 'Success!');
      }
    });
  }

}
