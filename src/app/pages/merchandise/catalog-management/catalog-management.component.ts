import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
declare let $: any;

import { CatalogBulkUploadComponent } from './bulk-upload/bulk-upload.component';

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
      name: 'Saraswat',
      status: true,
      createdOn: '12/12/2017'
    },
    {
      name: 'SBI',
      status: false,
      createdOn: '01/01/2017'
    },
    {
      name: 'PNB',
      status: false,
      createdOn: '11/11/2016'
    }
  ];
  bankTobeDeleted = {
    bank: null,
    index: null
  };

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

  bankToBeDeleted(bank, index) {
    this.bankTobeDeleted.bank = bank;
    this.bankTobeDeleted.index = index;
  }

  deleteBank() {
    this.deleteLoader = this.bankTobeDeleted.index;
    _.remove(this.banks, this.bankTobeDeleted.bank);
    this.deleteLoader = NaN;
    this.toastr.success('Sucessfully Deleted!', 'Sucess!');
  }

}
