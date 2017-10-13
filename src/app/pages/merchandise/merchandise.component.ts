import { Component } from '@angular/core';

@Component({
  selector: 'merchandise',
  template: `<router-outlet (activate)="onActivate($event, outlet)" #outlet></router-outlet>`,
})
export class MerchandiseComponent {
  constructor() {}

  onActivate(e, outlet): void {
    window.scrollTo(0, 0);
  }
}
