import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {

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
      shortDescription: '',
      fullDescription: '',
      sku: 'PG_CR_100',
      price: 56300,
      stockQuantity: null,
      productType: 'Simple',
      published: true,
      categories: ''
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
      sku: 'Dell_Inspiron_Core_20',
      price: 27990,
      stockQuantity: 20,
      productType: 'Simple',
      published: false,
      categories: ''
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