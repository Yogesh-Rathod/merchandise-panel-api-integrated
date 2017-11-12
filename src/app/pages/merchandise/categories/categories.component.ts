import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
declare let $: any;

import { MerchandiseService } from 'app/services';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { CategoryDeletePopupComponent } from './delete-popup/delete-popup.component';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any[] = [];
  searchTerm: any;
  showLoader = false;
  deleteLoader: Number;

  constructor(
    private modalService: NgbModal,
    public toastr: ToastsManager,
    private fb: FormBuilder,
    private merchandiseService: MerchandiseService) {
  }

  ngOnInit() {
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.getAllCategories();
    // this.bulkUpload();
  }

  getAllCategories() {
    this.merchandiseService.getCategories('categories').
      then((successData) => {
          console.log("successData getAllCategories", successData);
        this.categories = successData.data;
      }).catch((error) => {
        console.log("error ", error);
      });
  }

  searchCategory(searchTerm) {
    if (searchTerm) {
      this.merchandiseService.getCategories(`categories?name=${searchTerm}`).
      then((successData) => {
        this.categories = successData.data;
      }).catch((error) => {
        console.log("error ", error);
      });
    } else {
      this.merchandiseService.getCategories('categories').
      then((successData) => {
        this.categories = successData.data;
      }).catch((error) => {
        console.log("error ", error);
      });
    }

  }

  deleteCategory(item, index) {

    const activeModal = this.modalService.open(CategoryDeletePopupComponent, { size: 'sm' });

    activeModal.result.then((status) => {
      if (status) {
        this.deleteLoader = index;
        // _.remove(this.categories, item);
        this.merchandiseService.getCategories(`deleteCategory/${item._id}`).
          then((successData) => {
            this.toastr.success('Successfully Deleted!', 'Success!');
            this.deleteLoader = NaN;
            this.getAllCategories();
          }).catch((error) => {
            console.log("error ", error);
          });
      }
    });
  }

  bulkUpload() {
    const activeModal = this.modalService.open( BulkUploadComponent, { size: 'sm' } );
  }


}
