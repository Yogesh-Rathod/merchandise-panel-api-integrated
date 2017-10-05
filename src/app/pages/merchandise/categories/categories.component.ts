import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { MerchandiseService } from 'app/services';


@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  addCategoryFormShow: boolean = true;
  categories: any[] = [];
  addCategoryForm: any;
  addCategoriesForm: FormGroup;
  subNodeSelected: boolean = false;
  updateSubNodeSelected: boolean = false;
  selectedIndex1: any;
  selectedIndex2: any;
  selectedIndex3: any;
  catObject: any;
  editSelectedIndex1: any;
  editSelectedIndex2: any;
  editSelectedIndex3: any;
  editSelectedIndex4: any;
  editInactiveParent: boolean = false;
  bulkUpload: boolean = false;
  bulkUploadFileChosen: boolean = false;

  constructor(
    private modalService: NgbModal,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private fb: FormBuilder,
    private merchandiseService: MerchandiseService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.createForm();
    this.getAllCategories();
  }

  // For Creating Add Category Form
  createForm() {
    this.addCategoriesForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      description: [null, Validators.maxLength(255)],
      status: [null, Validators.required],
    });
  }

  getAllCategories() {
    this.categories = this.merchandiseService.getCategories();
  }

  addCategory(addCategoryForm) {
    addCategoryForm.id = Math.floor(1000 + Math.random() * 9000);
    addCategoryForm.children = [];
    this.merchandiseService.addCategory(addCategoryForm);
    console.log("this.toastr", this.toastr);
    this.toastr.success('Category added successfully!', 'Success!', { toastLife: 2000 } );
    this.getAllCategories();
    setTimeout( () => {
      this.createForm();
    }, 500);
  }

  resetForm(addCategoryForm) {
    this.createForm();
  }

  editCategory( rootCategory, i1, i2?, i3?, i4?, level2category?, level3category?, level4category? ) {
    this.updateSubNodeSelected = true;
    this.editSelectedIndex1 = i1;
    this.editSelectedIndex2 = i2;
    this.editSelectedIndex3 = i3;
    this.editSelectedIndex4 = i4;
    this.catObject = rootCategory;

    if (i4 >= 0 && i4 !== null && i4 !== '') {
      if (level3category.status === 'Inactive' || level2category.status === 'Inactive' || level4category.status === 'Inactive') {
          this.editInactiveParent = true;
      } else {
        this.editInactiveParent = false;
      }
    } else if (i3 >= 0 && i3 !== null && i3 !== '') {
      if (level3category.status === 'Inactive' || level2category.status === 'Inactive') {
          this.editInactiveParent = true;
      } else {
        this.editInactiveParent = false;
      }
    } else if (i2 >= 0 && i2 !== null && i2 !== '') {
      if (level2category.status === 'Inactive') {
          this.editInactiveParent = true;
      } else {
        this.editInactiveParent = false;
      }
    } else {
     this.editInactiveParent = false;
    }

    this.addCategoriesForm = this.fb.group({
      id: [rootCategory.id],
      name: [rootCategory.name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      description: [rootCategory.description, Validators.maxLength(255)],
      status: [rootCategory.status, Validators.required],
    });

  }

  // Update Category
  updateCategories(addCategoriesForm) {
    let index = 0;
    if (this.editSelectedIndex4 >= 0 && this.editSelectedIndex4 !== null && this.editSelectedIndex4 !== '' ) {
      index = _.findIndex(this.categories[this.editSelectedIndex1].children[this.editSelectedIndex2].children[this.editSelectedIndex3].children, {id: addCategoriesForm.id});
      this.categories[this.editSelectedIndex1].children[this.editSelectedIndex2].children[this.editSelectedIndex3].children.splice(index, 1, {id: addCategoriesForm.id, name: addCategoriesForm.name, description: addCategoriesForm.description, status: addCategoriesForm.status, children: this.catObject.children });
    } else if (this.editSelectedIndex3 >= 0 && this.editSelectedIndex3 !== null && this.editSelectedIndex3 !== '') {
      index = _.findIndex(this.categories[this.editSelectedIndex1].children[this.editSelectedIndex2].children, {id: addCategoriesForm.id});
      this.categories[this.editSelectedIndex1].children[this.editSelectedIndex2].children.splice(index, 1, {id: addCategoriesForm.id, name: addCategoriesForm.name, description: addCategoriesForm.description, status: addCategoriesForm.status, children: this.catObject.children });
    } else if (this.editSelectedIndex2 >= 0 && this.editSelectedIndex2 !== null && this.editSelectedIndex2 !== '') {
      index = _.findIndex(this.categories[this.editSelectedIndex1].children, {id: addCategoriesForm.id});
      this.categories[this.editSelectedIndex1].children.splice(index, 1, {id: addCategoriesForm.id, name: addCategoriesForm.name, description: addCategoriesForm.description, status: addCategoriesForm.status, children: this.catObject.children });
    } else {
      index = _.findIndex(this.categories, {id: addCategoriesForm.id});
      this.categories.splice(index, 1, {id: addCategoriesForm.id, name: addCategoriesForm.name, description: addCategoriesForm.description, status: addCategoriesForm.status, children: this.catObject.children });
    }

    this.toastr.success('Category updated successfully!', 'Success!', { toastLife: 2000 } );

    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('categories', JSON.stringify(this.categories) );
    }

    setTimeout( () => {
      this.formDismissed();
    }, 100);
  }

  // Slide Toggle For Categories Tree
  slideToggleDropDowns(event, i1, i2?, i3?, i4?) {
    event.stopPropagation();
    if (i3 >= 0 && i3 !== null) {
      this.categories[i1].children[i2].children[i3].slideDown = !this.categories[i1].children[i2].children[i3].slideDown;
    } else if (i2 >= 0 && i2 !== null) {
      this.categories[i1].children[i2].slideDown = !this.categories[i1].children[i2].slideDown;
    } else {
      this.categories[i1].slideDown = !this.categories[i1].slideDown;
    }
  }

  // DissMissing the Form Modal
  formDismissed() {
    this.updateSubNodeSelected = false;
    this.subNodeSelected = false;
    this.bulkUpload = false;
    this.editInactiveParent = false;
    this.createForm();
  }

  // When Adding A Sub Node
  addNode(event, rootCategory, i1, i2?, i3?, i4? ) {
    this.subNodeSelected = true;
    this.selectedIndex1 = i1;
    this.selectedIndex2 = i2;
    this.selectedIndex3 = i3;
    this.catObject = rootCategory;
  }


  addChildCategory(addCategoryForm) {
    addCategoryForm.id = Math.floor(1000 + Math.random() * 9000);
    addCategoryForm.children = [];

    if (this.selectedIndex3 >= 0 && this.selectedIndex3 !== null) {
      this.categories[this.selectedIndex1].children[this.selectedIndex2].children[this.selectedIndex3].children.push(addCategoryForm);
    } else if (this.selectedIndex2 >= 0 && this.selectedIndex2 !== null) {
      this.categories[this.selectedIndex1].children[this.selectedIndex2].children.push(addCategoryForm);
    } else {
      this.categories[this.selectedIndex1].children.push(addCategoryForm);
    }

    this.toastr.success('Category added successfully!', 'Success!', { toastLife: 2000 } );

    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('categories', JSON.stringify(this.categories) );
    }

    setTimeout( () => {
      this.formDismissed();
    }, 100);
  }

  // Delete A Category Node
  deleteNode(category, i1, i2?, i3?, i4?) {
    const confirmDelete = confirm('Are you sure you want to delete the category?');
    if (confirmDelete === true) {
      if (i4 >= 0 && i4 !== null) {
        _.remove(this.categories[i1].children[i2].children[i3].children, category );
      } else if (i3 >= 0 && i3 !== null) {
        _.remove(this.categories[i1].children[i2].children, category );
      } else if (i2 >= 0 && i2 !== null) {
        _.remove(this.categories[i1].children, category );
      } else {
        _.remove(this.categories, category);
      }
      this.toastr.success('Category deleted successfully!', 'Success!', { toastLife: 2000 } );
    }


    if (typeof(Storage) !== 'undefined') {
      localStorage.setItem('categories', JSON.stringify(this.categories) );
    }
  }

  fileSelected(event) {
    const fileList: FileList = event.target.files;
    if ( fileList.length > 0) {
      this.bulkUploadFileChosen = true;
    } else {
      this.bulkUploadFileChosen = false;
    }
  }


}
