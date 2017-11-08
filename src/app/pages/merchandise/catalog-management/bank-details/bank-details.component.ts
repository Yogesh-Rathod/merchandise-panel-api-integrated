import { Component, OnInit } from '@angular/core';

import { CatalogManagementService } from 'app/services';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {

  bankId = 12233;
  bankInfo: any;
  banks: any;
  deleteLoader = false;
  bigLoader: false;

  constructor(
    private catalogManagementService: CatalogManagementService
  ) { }

  ngOnInit() {
    this.getBanks();
  }

  getBanks() {
    const banks = this.catalogManagementService.getBanks();
    this.bankInfo = banks[0];
  }

}
