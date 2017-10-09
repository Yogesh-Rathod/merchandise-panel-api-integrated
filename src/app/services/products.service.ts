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
      name: 'Apple MacBook Air',
      sku: 'PG_CR_100',
      price: 56300,
      stockQuantity: null,
      productType: 'Simple',
      published: true
    },
    {
      id: 12346,
      picture: [
        'assets/images/products/laptop-154091_640.png'
      ],
      name: 'Dell Inspiron Core',
      sku: 'Dell_Inspiron_Core_20',
      price: 27990,
      stockQuantity: 20,
      productType: 'Simple',
      published: false
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