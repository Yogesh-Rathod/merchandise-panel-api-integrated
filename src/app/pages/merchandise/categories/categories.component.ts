import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { MerchandiseService } from 'app/services';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any[] = [];

  constructor(
    private modalService: NgbModal,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private fb: FormBuilder,
    private merchandiseService: MerchandiseService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllCategories();
    // this.bulkUpload();
  }

  getAllCategories() {
    this.categories = this.merchandiseService.getCategories();
  }

  bulkUpload() {
    const activeModal = this.modalService.open( BulkUploadComponent, { size: 'sm' } );
  }


}
