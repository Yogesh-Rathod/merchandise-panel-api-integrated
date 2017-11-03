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
    purchasesCount: 222,
    productsInfo: [
      {
        picture: 'assets/images/products/home-office-336373_640.jpg',
        name: 'Pride and Prejudice',
        sku: 'PRIDE_PRJ',
        price: 13000,
        quantity: 1,
        discount: 1000,
        total: 12000
      },
      {
        picture: 'assets/images/products/laptop-154091_640.png',
        name: 'First Prize Pies',
        sku: 'FIRST_PRP',
        price: 1000,
        quantity: 1,
        discount: 500,
        total: 500
      }
    ],
  };
  banks: any;
  deleteLoader = false;
  bigLoader: false;
  
  constructor() { }

  ngOnInit() {
  }

}
