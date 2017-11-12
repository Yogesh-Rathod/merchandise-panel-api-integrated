import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';
declare let $: any;

import { VendorsService } from 'app/services';
import { RegEx } from './../../../regular-expressions';

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
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.createForm();
    this.getVendorInfoForEdit();
    // this.getAllVendors();
  }

  createForm() {
    this.addVendorForm = this.fb.group({
      'id': [''],
      'firstName': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ])
      ],
      'lastName': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100)
        ])
      ],
      "suffix": [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
      ],
      "company": [''],
      'email': [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegEx.Email)
        ])
      ],
      "phone": [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegEx.phoneNumber)
        ])
      ],
      "website": [
        '',
        Validators.compose([
          Validators.pattern(RegEx.websiteUrl)
        ])
      ],
      "listingFee": [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      "address": [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      "city": [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      "state": [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      "country": [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      "zip": [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(RegEx.zipCode)
        ])
      ],
      'status': [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  // getAllVendors() {
  //   this.vendorsService.getVendors('vendors').
  //   then( (successData) => {
  //     console.log("successData", successData);
  //   }).catch(error => console.log(error));
  // }

  validatenumber(e) {
    if (!RegEx.Numbers.test(`${e.key}`) && `${e.key}`.length === 1) {
      e.preventDefault();
    }
  }

  addVendor(addVendorForm) {
    this.showLoader = true;
    if (addVendorForm.id) {
      // addVendorForm['id'] = Math.floor(Math.random() * 90000) + 10000;
      this.vendorsService.addVendor(`updateVendor/${addVendorForm.id}`, addVendorForm).
      then( (success) => {
        this.toastr.success('Sucessfully Done!', 'Sucess!');
        this.showLoader = false;
        this._location.back();
      }).catch((error) => {
        console.log(error);
        this.toastr.error('Oops!!! Something went wrong.', 'Error!');
        this.showLoader = false;
      });

      // const index = _.findIndex(this.vendors, { id: addVendorForm['id'] });
      // this.vendors.splice(index, 1, addVendorForm);
      // this.vendorsService.editVendor(this.vendors);
    } else {
      // addVendorForm['id'] = Math.floor(Math.random() * 90000) + 10000;
      this.vendorsService.addVendor('vendor', addVendorForm).
      then( (success) => {
        this.toastr.success('Sucessfully Done!', 'Sucess!');
        this.showLoader = false;
        this._location.back();
      }).catch((error) => {
        console.log(error);
        this.toastr.error('Oops!!! Something went wrong.', 'Error!');
        this.showLoader = false;
      });
    }
  }

  getVendorInfoForEdit() {
    if (this.vendorId) {
      this.vendorsService.getVendors(`vendor/${this.vendorId}`).
      then( (successData) => {
        console.log("successData", successData);
        this.vendorInfo = successData.data;
        this.addVendorForm.controls['id'].setValue(this.vendorInfo[0]._id);
        this.addVendorForm.controls['firstName'].setValue(this.vendorInfo[0].firstName);
        this.addVendorForm.controls['lastName'].setValue(this.vendorInfo[0].lastName);
        this.addVendorForm.controls['suffix'].setValue(this.vendorInfo[0].suffix);
        this.addVendorForm.controls['company'].setValue(this.vendorInfo[0].company);
        this.addVendorForm.controls['email'].setValue(this.vendorInfo[0].email);
        this.addVendorForm.controls['phone'].setValue(this.vendorInfo[0].phone[0]);
        this.addVendorForm.controls['website'].setValue(this.vendorInfo[0].website);
        this.addVendorForm.controls['listingFee'].setValue(this.vendorInfo[0].listingFee);
        this.addVendorForm.controls['address'].setValue(this.vendorInfo[0].address);
        this.addVendorForm.controls['city'].setValue(this.vendorInfo[0].city);
        this.addVendorForm.controls['state'].setValue(this.vendorInfo[0].state);
        this.addVendorForm.controls['country'].setValue(this.vendorInfo[0].country);
        this.addVendorForm.controls['zip'].setValue(this.vendorInfo[0].zip);
        this.addVendorForm.controls['status'].setValue(this.vendorInfo[0].status);
      }).catch(error => console.log(error));
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
