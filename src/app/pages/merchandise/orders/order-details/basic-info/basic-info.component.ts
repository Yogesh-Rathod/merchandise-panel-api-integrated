import { Component, OnInit, Input } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  @Input() orderInfo: any;
  orderCancelled = false;

  constructor() { }

  cancelOrder() {
    this.orderCancelled = true;
  }

  ngOnInit() {
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

}
