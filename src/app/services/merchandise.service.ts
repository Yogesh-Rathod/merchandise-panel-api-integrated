import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }
  from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MerchandiseService {
  headers: Headers;
  options: RequestOptions;
  baseUrl = 'https://merchandise-panel-back-end.herokuapp.com/api/'

  // All Operations Related To Categories
  private categories: any[] = [
    {
      id: 1,
      name: 'Computers',
      level: 1,
      parent_name: null,
      published: true,
      display_order: 1,
      breadCrumb: 'Computers',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 2,
      name: 'Desktops',
      level: 2,
      parent_name: 'Computers',
      published: false,
      display_order: 1,
      breadCrumb: 'Computers >> Desktops',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 3,
      name: 'Software',
      level: 2,
      parent_name: 'Computers',
      published: true,
      display_order: 2,
      breadCrumb: 'Computers >> Software',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 4,
      name: 'Electronics',
      level: 1,
      parent_name: null,
      published: true,
      display_order: 2,
      breadCrumb: 'Electronics',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 5,
      name: 'Cell phones',
      level: 2,
      parent_name: 'Electronics',
      published: false,
      display_order: 1,
      breadCrumb: 'Electronics >> Cell phones',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 6,
      name: 'Others',
      level: 2,
      parent_name: 'Electronics',
      published: true,
      display_order: 2,
      breadCrumb: 'Electronics >> Others',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 7,
      name: 'Apparel',
      level: 1,
      parent_name: null,
      published: false,
      display_order: 3,
      breadCrumb: 'Apparel',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 8,
      name: 'Clothing',
      level: 2,
      parent_name: 'Apparel',
      published: true,
      display_order: 1,
      breadCrumb: 'Apparel >> Clothing',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 9,
      name: 'Accessories',
      level: 2,
      parent_name: 'Apparel',
      published: false,
      display_order: 2,
      breadCrumb: 'Apparel >> Accessories',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 10,
      name: 'Caps',
      level: 3,
      parent_name: 'Apparel >> Accessories',
      published: false,
      display_order: 3,
      breadCrumb: 'Apparel >> Accessories >> Caps',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 11,
      name: 'Armani Caps',
      level: 4,
      parent_name: 'Apparel >> Accessories >> Caps',
      published: true,
      display_order: 4,
      breadCrumb: 'Apparel >> Accessories >> Caps >> Armani Caps',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    }
  ];

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }


  getCategories(url: string): Promise<any> {
    return this.http
      .get(`${this.baseUrl}${url}`, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addCategory(url, categoryInfo) {
    console.log("categoryInfo ", categoryInfo);
    return this.http
      .post(`${this.baseUrl}${url}`, categoryInfo, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  editCategories(categories) {
    this.categories = categories;
    return this.categories;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
