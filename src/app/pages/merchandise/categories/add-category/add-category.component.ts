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
  categories: any;
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
    this.getAllCategories();
    this.getCategoryInfoForEdit();
  }

  getAllCategories() {
    this.categories = this.merchandiseService.getCategories();
    console.log("this.categories", this.categories);
  }

  createForm() {
    this.addCategoryForm = this.fb.group({
      'id': [''],
      'name': ['', Validators.compose([Validators.required,
        Validators.minLength(1), Validators.maxLength(100)])],
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
      parent_name: addCategoryFormValues.parentCat.name,
      level: addCategoryFormValues.parentCat.level + 1,
      published: addCategoryFormValues.published,
      display_order: addCategoryFormValues.order,
      description: addCategoryFormValues.description,
      breadCrumb: `${addCategoryFormValues.parentCat.breadCrumb} >> ${addCategoryFormValues.name}`
    };
    if (addCategoryFormValues.id) {
      categoryInfo['id'] = addCategoryFormValues.id;
      const index = _.findIndex(this.categories, { id: categoryInfo['id'] } );
      this.categories.splice(index, 1, categoryInfo );
      this.merchandiseService.editCategories(this.categories);
    } else {
      this.merchandiseService.addCategory(categoryInfo);
    }
    this.showLoader = false;
    this.toastr.success('Sucessfully Done!', 'Sucess!');
    this.router.navigate(['../']);
  }

  imageUpload(event) {
    const uploadedImage = event.target.files[0] ? event.target.files[0].name : '';
    this.addCategoryForm.controls['picture'].setValue(uploadedImage);
  }

  getCategoryInfoForEdit() {
    if ( this.categoryId ) {
      const categories = this.merchandiseService.getCategories();
      _.forEach(categories, (category) => {
        if (category.id === parseInt(this.categoryId) ) {
          this.categoryInfo = category;
          this.addCategoryForm.controls['id'].setValue(category.id);
          this.addCategoryForm.controls['description'].setValue(category.description);
          this.addCategoryForm.controls['name'].setValue(category.name);
          this.addCategoryForm.controls['order'].setValue(category.display_order);
          this.addCategoryForm.controls['published'].setValue(category.published);
        }
      });
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
