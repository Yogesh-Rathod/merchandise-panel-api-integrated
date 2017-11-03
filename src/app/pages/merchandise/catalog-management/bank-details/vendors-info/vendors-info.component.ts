import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vendors-info',
  templateUrl: './vendors-info.component.html',
  styleUrls: ['./vendors-info.component.scss']
})
export class VendorsInfoComponent implements OnInit {

  @Input() bankInfo: any;

  constructor() { }

  ngOnInit() {
  }

}
