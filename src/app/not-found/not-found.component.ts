import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  template: `<div class="jumbotron text-center">
      <h1>404 Not Found</h1>
      <p>You may be lost. Follow the breadcrumbs <a href="#" (click)="backClicked()">back</a>.</p>
    </div>`,
})
export class NotFoundComponent {
  constructor(private _location: Location) {
    }
    backClicked() {
        this._location.back();
    }
} 
