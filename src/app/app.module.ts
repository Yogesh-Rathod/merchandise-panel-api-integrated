import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';
import { CookieService } from 'angular2-cookie/services/cookies.service';
// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { NotFoundComponent } from './not-found/not-found.component';
import {
  SharedModule,
} from './shared';
import { CommonService } from './services';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CustomToast } from './providers/custome_toast';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { AuthGuard } from './gaurds';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  CommonService,
  {provide: ToastOptions, useClass: CustomToast},
  AuthGuard,
  CookieService,
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void,
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    NotFoundComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    PagesModule,
    routing,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
  ],
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
