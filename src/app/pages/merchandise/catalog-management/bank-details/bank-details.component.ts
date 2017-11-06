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
        total: 12000,
        status: 'Active'
      },
      {
        picture: 'assets/images/products/laptop-154091_640.png',
        name: 'First Prize Pies',
        sku: 'FIRST_PRP',
        price: 1000,
        quantity: 1,
        discount: 500,
        total: 500,
        status: 'Inactive'
      },
      {
        picture: 'assets/images/products/laptop-images.jpeg',
        name: 'HP 15 Core i3',
        sku: 'HP_15_Core_i3',
        price: 32990,
        quantity: 3,
        discount: 990,
        total: 32000,
        status: 'Active'
      }
    ],
    vendors: [
      {
        'id': 1,
        'first_name': 'Verla',
        'last_name': 'Spong',
        'email': 'test@test.com',
        'status': true,
        'suffix': 'VS',
        'company': 'HDFC',
        'phoneNumber': '1234567890',
        'website': 'https://www.india.com',
        'address': '101, Ruby Tower, dadar.',
        'city': 'Mumbai',
        'state': 'Maharashtra',
        'country': 'India',
        'zip': '400606'
      },
      {
        'id': 2,
        'first_name': 'Jade',
        'last_name': 'O Sharkey',
        'email': 'Jade.Sharkey@gmail.com',
        'status': false,
        'suffix': 'JO',
        'company': 'JIO',
        'phoneNumber': '9387654321',
        'website': 'https://www.JIO.com',
        'address': '101, Ruby Tower, dadar.',
        'city': 'Mumbai',
        'state': 'Maharashtra',
        'country': 'India',
        'zip': '400606'
      },
      {
        'id': 3,
        'first_name': 'Vernice',
        'last_name': 'Cicconettii',
        'email': 'Vernice.Cicconettii@gmail.com',
        'status': true,
        'suffix': 'VC',
        'company': 'Reliance',
        'phoneNumber': '9387654321',
        'website': 'https://www.Reliance.com',
        'address': '101, Ruby Tower, dadar.',
        'city': 'Mumbai',
        'state': 'Maharashtra',
        'country': 'India',
        'zip': '400606'
      }
    ]
  };
  banks: any;
  deleteLoader = false;
  bigLoader: false;
  
  constructor() { }

  ngOnInit() {
  }

}