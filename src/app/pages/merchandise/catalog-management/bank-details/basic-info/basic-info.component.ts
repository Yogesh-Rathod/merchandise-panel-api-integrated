import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bank-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  @Input() bankInfo: any;

  constructor() { }

  ngOnInit() {
  }

}
