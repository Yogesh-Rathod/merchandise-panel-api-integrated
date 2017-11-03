import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.scss']
})
export class ProductsInfoComponent implements OnInit {

  @Input() bankInfo: any;

  constructor() { }

  ngOnInit() {
  }

}
