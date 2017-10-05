import { Component, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';
import {Router, NavigationEnd} from '@angular/router';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
// import { CookieService } from 'angular2-cookie/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class App {

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });

    // if ( this._cookieService.get('userLoggedInData') ) {
    //   const userInfo = JSON.parse( this._cookieService.get('userLoggedInData') );
    //   // console.log("userInfo", userInfo);
    //   if ( userInfo.email !== 'yogeshr' && userInfo.password !== 'loylty'  ) {
    //     window.location.href = 'http://localhost:4300';
    //   }
    // } else {
    //   window.location.href = 'http://localhost:4300';
    // }

  }

  isMenuCollapsed: boolean = false;

  constructor(
              private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              private router: Router) {

    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load('assets/img/sky-bg.jpg'));
  }

}
