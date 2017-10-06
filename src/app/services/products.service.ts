import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {

// Vendor Products
  private products = [
    {
      id: 12345,
      picture: [
        'assets/images/products/home-office-336373_640.jpg'
      ],
      name: '$100 Physical Gift Card',
      sku: 'PG_CR_100',
      price: 100,
      stockQuantity: null,
      productType: 'Simple',
      published: true
    }
  ];

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    this.products.push(product);
    return this.products;
  }

  editProduct(products) {
    this.products = products;
    return this.products;
  }

  deleteProduct(products) {
    this.products = products;
    return this.products;
  }


}