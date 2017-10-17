import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';

import { VendorsService } from 'app/services';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  vendorId: any;
  addVendorForm: FormGroup;
  public config = {
    uiColor: '#F0F3F4',
    height: '200'
  };
  deleteLoader = false;
  showLoader = false;
  vendors: any;
  vendorInfo: any;

  constructor(
    private fb: FormBuilder,
    private _location: Location,
    private vendorsService: VendorsService,
    private toastr: ToastsManager,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params =>
      this.vendorId = params['vendorId']
    )
  }

  ngOnInit() {
    this.createForm();
    this.getAllVendors();
    this.getVendorInfoForEdit();
  }

  createForm() {
    this.addVendorForm = this.fb.group({
      'id': [''],
      'first_name': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ])
      ],
      'last_name': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ])
      ],
      'description': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000)
        ])
      ],
      'email': [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ])
      ],
      'published': ['']
    });
  }

  getAllVendors() {
    this.vendors = this.vendorsService.getVendors();
  }

  addVendor(addVendorForm) {
    this.showLoader = true;
    if (addVendorForm.id) {
      const index = _.findIndex(this.vendors, { id: addVendorForm['id'] });
      this.vendors.splice(index, 1, addVendorForm);
      this.vendorsService.editVendor(this.vendors);
    } else {
      addVendorForm['id'] = Math.floor(Math.random() * 90000) + 10000;
      this.vendorsService.addVendor(addVendorForm);
    }
    this.toastr.success('Sucessfully Done!', 'Sucess!');
    this.showLoader = false;
    this._location.back();
  }

  getVendorInfoForEdit() {
    if (this.vendorId) {
      const vendors = this.vendorsService.getVendors();
      _.forEach(vendors, (vendor) => {
        if (vendor.id === parseInt(this.vendorId)) {
          this.vendorInfo = vendor;
          this.addVendorForm.controls['id'].setValue(vendor.id);
          this.addVendorForm.controls['description'].setValue(vendor.description);
          this.addVendorForm.controls['first_name'].setValue(vendor.first_name);
          this.addVendorForm.controls['last_name'].setValue(vendor.last_name);
          this.addVendorForm.controls['email'].setValue(vendor.email);
          this.addVendorForm.controls['published'].setValue(vendor.published);
        }
      });
    }
  }

  deleteVendor() {
    this.deleteLoader = true;
    _.remove(this.vendors, this.vendorInfo);
    this.vendorsService.editVendor(this.vendors);
    this.toastr.success('Sucessfully Deleted!', 'Sucess!');
    this.deleteLoader = false;
    this._location.back();
  }

}
