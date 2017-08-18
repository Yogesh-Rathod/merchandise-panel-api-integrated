/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-08-03 14:51:31 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2017-08-03 14:51:31 
 */


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments';
import { CommonService } from './common.services';


@Injectable()
export class CrmService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private commSer: CommonService) {

    }

    getCustomerInfo(programId, customerId): Promise<any> {
        const url = `${environment.crm_url}/program/${programId}/customer/${customerId}`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

    getAccrual(programId, customerId): Promise<any> {
        // const url = `${environment.api_url}/tenant/${programId}/customer/${customerId}/accrual`;
        
        const url = `${environment.crm_url}/program/${programId}/customer/${customerId}/accruals/`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

    getTickets(): Promise<any> {
        // console.log(environment.api_url);
        const url = 'http://demo8066088.mockable.io/getTickets';
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

    getCommunications(programId, customerId): Promise<any> {
        // const url = `${environment.api_url}/tenant/${programId}/customer/${customerId}/communication`;
        const url = `${environment.crm_url}/program/${programId}/customer/${customerId}/comunication/`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

     getRedemption(programId, customerId): Promise<any> {
        // const url = `${environment.api_url}/tenant/${programId}/customer/${customerId}/communication`;
        const url = `${environment.crm_url}/program/${programId}/customer/${customerId}/redemption/`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

    getAgents(): Promise<any> {
        const url = `${environment.crm_url}/agents/`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

    getAgent(agentId): Promise<any> {
        const url = `${environment.crm_url}/agent/${agentId}/`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

    getAgentTicket(): Promise<any> {
        const url = `${environment.crm_url}/agent/${this.commSer.getUserData().username}/tickets/`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

    getTicketInfo(ticketId): Promise<any> {
        const url = `${environment.crm_url}/ticket/${ticketId}`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

    createTicket(data): Promise<any> {
        const url = `${environment.crm_url}/ticket/`;
        const options = new RequestOptions({ headers: this.headers });
        return this.http.post(url, data, options)
            .toPromise()
            .then(this.commSer.handleResponse)
            .catch(this.commSer.handleError);
    }

    editTicket(data): Promise<any> {
        const url = `${environment.crm_url}/ticket/`;
        const options = new RequestOptions({ headers: this.headers });
        return this.http.patch(url, data, options)
            .toPromise()
            .then(this.commSer.handleResponse)
            .catch(this.commSer.handleError);
    }

    offers(selectedProgram, transactionId): Promise<any> {
        const url = `${environment.crm_url}/program/${selectedProgram}/accrualDetails/${transactionId}`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }

    assignTicket(agentId, ticketId): Promise<any> {
        const url = `${environment.crm_url}/agent/${agentId}/ticket/${ticketId}`;
        const options = new RequestOptions({ headers: this.headers });
        return this.http.post(url, '', options)
            .toPromise()
            .then(this.commSer.handleResponse)
            .catch(this.commSer.handleError);
    }

    createComment(data): Promise<any> {
        const url = `${environment.crm_url}/ticketComment`;
        const options = new RequestOptions({ headers: this.headers });
        return this.http.post(url, data, options)
            .toPromise()
            .then(this.commSer.handleResponse)
            .catch(this.commSer.handleError);
    }

    searchTicket(queryParams): Promise<any> {
        const url = `${environment.crm_url}/tickets?${queryParams}&agentId=${this.commSer.getUserData().username}`;
        return this.http.get(url)
        .toPromise()
        .then(this.commSer.handleResponse)
        .catch(this.commSer.handleError);
    }
}
