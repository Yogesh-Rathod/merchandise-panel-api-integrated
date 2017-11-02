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
  }

  bulkUpload() {
    const activeModal = this.modalService.open(CatalogBulkUploadComponent, { size: 'sm' });
  }

}
