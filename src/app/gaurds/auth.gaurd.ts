import { Injectable, ViewContainerRef } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/first';
import { CookieService } from 'angular2-cookie/core';
import { AppState } from '../../app/app.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private _cookieService: CookieService,
        private global: AppState,
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const globalData = this.getCookie('globalData');
        this.global.set('globalData', globalData);
        if (!globalData) {
            return true;
        }
        this._cookieService.removeAll();
        // window.location.href = 'http://localhost:4300/login';
        return false;
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    }

    getCookie(key: string) {
        return this._cookieService.get(key);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
