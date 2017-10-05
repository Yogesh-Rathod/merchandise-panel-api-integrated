import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import './ckeditor.loader';
import 'ckeditor';

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
  showLoader: false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addCategoryForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required,
        Validators.minLength(1), Validators.maxLength(100)])],
      'description': ['', Validators.compose([Validators.required,
        Validators.minLength(1), Validators.maxLength(1000)])],
      'picture': [''],
      'parentCat': ['', Validators.compose([Validators.required])],
      'order': ['', Validators.compose([Validators.required])]
    });
  }

  addCategory(addCategoryFormValues) {
    console.log("addCategoryFormValues", addCategoryFormValues);
  }

  imageUpload(event) {
    const uploadedImage = event.target.files[0] ? event.target.files[0].name : '';
    this.addCategoryForm.controls['picture'].setValue(uploadedImage);
  }

  resetForm() {
    this.createForm();
  }

}
