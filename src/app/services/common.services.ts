import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments';
import { AppState } from 'app/app.service';

@Injectable()
export class CommonService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private global: AppState) {

    }

    getCorporates(): Promise<any> {
        const url = `${environment.apiUrl}/tms/api/corporate`;
        return this.http.get(url)
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    getPrograms(corporateID): Promise<any> {
        const url = `${environment.apiUrl}/tms/api/corporate/corporateId/${corporateID}/program`;
        return this.http.get(url)
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        return Promise.reject(JSON.parse(error._body) || error);
    }

    handleResponse(response: any): Promise<any> {
        const emptyArr: any = [];
        if (response.status >= 200 && response.status < 204) {
            return response.json();
        } else if (response.status === 204) {
            return emptyArr;
        }
    }

    getUserData() {
        return JSON.parse(this.global.get('userData'));
    }
}
