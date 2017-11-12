import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';

import { Config } from 'app/pages/app-config';
import { MerchandiseService } from 'app/services';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public config = {
    uiColor: '#F0F3F4',
    height: '200'
  };
  addCategoryForm: FormGroup;
  showLoader = false;
  deleteLoader = false;
  categoriesMaxLevel = Config.categoriesMaxLevel;
  categories: any[];
  categoryId: any;
  categoryInfo: any;

  constructor(
    private fb: FormBuilder,
    private merchandiseService: MerchandiseService,
    private toastr: ToastsManager,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe( params =>
      this.categoryId = params['categoryId']
    )
  }

  ngOnInit() {
    this.createForm();
    this.getCategoryInfoForEdit();
    this.getAllCategories();
  }

  getAllCategories() {
    this.merchandiseService.getCategories('categories').
    then((successData) => {
      this.categories = successData.data;
      console.log("this.categories", this.categories);
    }).catch(error => console.log(error));
  }

  createForm() {
    this.addCategoryForm = this.fb.group({
      'id': [''],
      'name': ['', Validators.compose([Validators.required,
        Validators.minLength(1), Validators.maxLength(100)])],
      'display_name': [],
      'description': ['', Validators.compose([Validators.required,
        Validators.minLength(1), Validators.maxLength(1000)])],
      'picture': [''],
      'parentCat': [''],
      'order': ['', Validators.compose([Validators.required])],
      'published': ['']
    });
  }

  addCategory(addCategoryFormValues) {
    console.log("addCategoryFormValues ", addCategoryFormValues);
    this.showLoader = true;
    const categoryInfo = {
      name: addCategoryFormValues.name,
      display_name: addCategoryFormValues.display_name,
      parent: addCategoryFormValues.parentCat ? addCategoryFormValues.parentCat.breadCrumb : null,
      status: addCategoryFormValues.published,
      displayOrder: addCategoryFormValues.order,
      description: addCategoryFormValues.description,
      breadCrumb: addCategoryFormValues.parentCat ? `${addCategoryFormValues.parentCat.breadCrumb} >> ${addCategoryFormValues.name}` : addCategoryFormValues.name
    };
    if (addCategoryFormValues.id) {
      categoryInfo['id'] = addCategoryFormValues.id;
      var dataToSend = {};
      for (let key in categoryInfo) {
        if (categoryInfo.hasOwnProperty(key)) {
          if (categoryInfo[key]) {
            dataToSend[key] = categoryInfo[key];
          }
        }

      }
      this.merchandiseService.addCategory(`updateCategory/${categoryInfo['id']}`, dataToSend).
      then((successData) => {
        this.showLoader = false;
        this.toastr.success('Sucessfully Done!', 'Sucess!');
        this.router.navigate(['../']);
      }).catch((error) => {
        console.log("error ", error);
        this.showLoader = false;
        this.toastr.error('Oops!!! Something is wrong!', 'Error!');
      });

    } else {
      var dataToSend = {};
      for (let key in categoryInfo) {
        if (categoryInfo.hasOwnProperty(key)) {
          if (categoryInfo[key]) {
            dataToSend[key] = categoryInfo[key];
          }
        }

      }
      this.merchandiseService.addCategory('category', dataToSend).
      then((successData) => {
        this.showLoader = false;
        this.toastr.success('Sucessfully Done!', 'Sucess!');
        this.router.navigate(['../']);
      }).catch((error) => {
        console.log("error ", error);
        this.showLoader = false;
        this.toastr.error('Oops!!! Something is wrong!', 'Error!');
      });
    }
  }

  imageUpload(event) {
    const uploadedImage = event.target.files[0] ? event.target.files[0].name : '';
    this.addCategoryForm.controls['picture'].setValue(uploadedImage);
  }

  getCategoryInfoForEdit() {
    if ( this.categoryId ) {
      this.merchandiseService.getCategories('category/'+this.categoryId).
      then((successData) => {
        this.categoryInfo = successData.data;
        console.log("this.successData", successData);
        this.addCategoryForm.controls['id'].setValue(this.categoryInfo[0]._id);
        this.addCategoryForm.controls['name'].setValue(this.categoryInfo[0].name);
        this.addCategoryForm.controls['display_name'].setValue(this.categoryInfo[0].display_name);
        this.addCategoryForm.controls['description'].setValue(this.categoryInfo[0].description);
        this.addCategoryForm.controls['order'].setValue(this.categoryInfo[0].displayOrder);
        this.addCategoryForm.controls['published'].setValue(this.categoryInfo[0].status);
      }).catch(error => console.log(error));
    }
  }

  deleteCategory() {
    this.deleteLoader = true;
    _.remove(this.categories, this.categoryInfo );
    this.merchandiseService.editCategories(this.categories);
    this.toastr.success('Sucessfully Deleted!', 'Sucess!');
    this.deleteLoader = false;
    this.router.navigate(['../']);
  }

  resetForm() {
    this.createForm();
  }

}
