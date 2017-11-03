import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {

  bankId = 12233;
  bankInfo: any = {
    id: 12233,
    name: 'Saraswat',
    status: true,
    createdOn: '12/12/2017',
    vendorCount: 10,
    productsCount: 2000,
    purchasesCount: 222
  };
  banks: any;
  deleteLoader = false;
  bigLoader: false;
  
  constructor() { }

  ngOnInit() {
  }

}
