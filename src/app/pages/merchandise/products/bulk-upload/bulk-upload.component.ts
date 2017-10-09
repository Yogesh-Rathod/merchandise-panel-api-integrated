import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class ProductsBulkUploadComponent implements OnInit {

  submitDisabled = true;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  excelUploaded(event) {
    const uploadedImage = event.target.files[0] ? event.target.files[0].name : '';
    if (uploadedImage !== '') {
      this.submitDisabled = false;
    } else {
      this.submitDisabled = true;
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
