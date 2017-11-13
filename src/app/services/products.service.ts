import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }
  from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductsService {
  headers: Headers;
  options: RequestOptions;
  baseUrl = 'https://merchandise-panel-back-end.herokuapp.com/api/'

  // Vendor Products
  private products = [
    {
      id: 12345,
      picture: [
        {
          url: 'assets/images/products/home-office-336373_640.jpg',
          alt: 'some text',
          title: 'some text',
          displayOrder: 1
        }
      ],
      name: 'Apple MacBook Air',
      shortDescription: 'some short description',
      fullDescription: 'Full Description',
      sku: 'PG_CR_100',
      currency: '₹ (INR)',
      netPrice: 1000,
      netShipping: 100,
      MrpPrice: 156300,
      oldPrice: null,
      retailPrice: 155300,
      retailShipping: 1000,
      rpi: 1000,
      stockQuantity: 2,
      categories: '',
      vendor: 'vendor 1',
      productType: 'Simple',
      type: 'Type of product',
      status: 'Active',
      brand: 'Spykar',
      approvalStatus: 'Approved'
    },
    {
      id: 12346,
      picture: [
        {
          url: 'assets/images/products/laptop-154091_640.png',
          alt: 'some text',
          title: 'some text',
          displayOrder: 1
        }
      ],
      name: 'Dell Inspiron Core',
      shortDescription: '',
      fullDescription: '',
      sku: 'Dell_Inspiron_Core_20',
      MrpPrice: 27990,
      retailPrice: 26990,
      stockQuantity: 20,
      productType: 'Simple',
      status: 'Inative',
      categories: '',
      approvalStatus: 'Rejected'
    },
    {
      id: 12347,
      picture: [
        {
          url: 'assets/images/products/laptop-images.jpeg',
          alt: 'some text',
          title: 'some text',
          displayOrder: 1
        }
      ],
      name: 'HP 15 Core i3',
      shortDescription: '',
      fullDescription: '',
      sku: 'HP_15_Core_i3',
      MrpPrice: 32990,
      retailPrice: 26990,
      stockQuantity: 20,
      productType: 'Simple',
      status: 'Active',
      categories: '',
      approvalStatus: 'Pending'
    }
  ];

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getProducts(url: string): Promise<any> {
    return this.http
      .get(`${this.baseUrl}${url}`, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addProduct(url, productInfo) {
    return this.http
      .post(`${this.baseUrl}${url}`, productInfo, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  editProduct(products) {
    this.products = products;
    return this.products;
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