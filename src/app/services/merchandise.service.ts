import { Injectable } from '@angular/core';

@Injectable()
export class MerchandiseService {
  // All Operations Related To Categories
  private categories: any[] = [
    {
      id: 1,
      name: 'Computers',
      parent_name: null,
      published: true,
      display_order: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 2,
      name: 'Desktops',
      parent_name: 'Computers',
      published: false,
      display_order: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 3,
      name: 'Software',
      parent_name: 'Computers',
      published: true,
      display_order: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 4,
      name: 'Electronics',
      parent_name: null,
      published: true,
      display_order: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 5,
      name: 'Cell phones',
      parent_name: 'Electronics',
      published: false,
      display_order: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 6,
      name: 'Others',
      parent_name: 'Electronics',
      published: true,
      display_order: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 7,
      name: 'Apparel',
      parent_name: null,
      published: false,
      display_order: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 8,
      name: 'Clothing',
      parent_name: 'Apparel',
      published: true,
      display_order: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    },
    {
      id: 9,
      name: 'Accessories',
      parent_name: 'Apparel',
      published: false,
      display_order: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque earum placeat officiis culpa est maiores. Optio sint earum odit cumque, blanditiis eligendi ipsum eveniet accusamus illo. Aspernatur, assumenda, at.'
    }

    // {
    //   id: 1,
    //   name: 'Electronics',
    //   description: 'description 1',
    //   status: 'Active',
    //   children: [
    //   {
    //     id: 2,
    //     name: 'TV',
    //     description: 'description 1',
    //     status: 'Active',
    //     children: [
    //     {
    //       id: 6,
    //       name: 'ONIDA',
    //       description: 'description 1',
    //       status: 'Active',
    //       children: [
    //       {
    //         id: 15,
    //         name: 'ONIDA Black',
    //         description: 'description 1',
    //         status: 'Inactive',
    //         children: [],
    //       },
    //       ],
    //     },
    //     ],
    //   },
    //   {
    //     id: 3,
    //     name: 'Mobiles',
    //     description: 'description 1',
    //     status: 'Inactive',
    //     children: [
    //     {
    //       id: 7,
    //       name: 'MI',
    //       description: 'description 1',
    //       status: 'Active',
    //       children: [
    //       {
    //         id: 16,
    //         name: 'Redmi Series',
    //         description: 'description 1',
    //         status: 'Active',
    //         children: [],
    //       },
    //       ],
    //     },
    //     ],
    //   },
    //   ],
    // },
    // {
    //   id: 5,
    //   name: 'Furniture',
    //   description: 'description 1',
    //   status: 'Inactive',
    //   children: [
    //   {
    //     id: 8,
    //     name: 'Home Decor',
    //     description: 'description 1',
    //     status: 'Active',
    //     children: [
    //     {
    //       id: 9,
    //       name: 'Paintings',
    //       description: 'description 1',
    //       status: 'Inactive',
    //       children: [
    //       {
    //         id: 9,
    //         name: 'Monalisa',
    //         description: 'description 1',
    //         status: 'Active',
    //         children: [
    //         ],
    //       },
    //       ],
    //     },
    //     ],
    //   },
    //   {
    //     id: 10,
    //     name: 'Kitchen & Dining',
    //     description: 'description 1',
    //     status: 'Active',
    //     children: [
    //     {
    //       id: 19,
    //       name: 'Dining Table',
    //       description: 'description 1',
    //       status: 'Inactive',
    //       children: [
    //       {
    //         id: 20,
    //         name: 'Wooden Table',
    //         description: 'description 1',
    //         status: 'Active',
    //         children: [],
    //       },
    //       ],
    //     },
    //     ],
    //   },
    //   ],
    // },
  ];

  constructor() {}

  getCategories() {
    return this.categories;
  }

  addCategory(categoryInfo) {
    this.categories.push(categoryInfo);
    // localStorage.setItem('categories', JSON.stringify(this.categories) );
    return this.categories;
  }

  editCategories(categories) {
    this.categories = categories;
    return this.categories;
  }

}
