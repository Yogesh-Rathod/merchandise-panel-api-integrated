import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { CookieService } from 'angular2-cookie/core';
import { AppState } from 'app/app.service';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html'
})
export class Pages {

  constructor(
    private _menuService: BaMenuService,
    private _cookieService: CookieService,
    private global: AppState,
  ) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

    const globalData = this.getCookie('userData');
    this.global.set('userData', (globalData));
  }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }

}
