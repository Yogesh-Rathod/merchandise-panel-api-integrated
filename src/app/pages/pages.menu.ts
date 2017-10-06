
const menus = [
  {
    path: 'merchandise',
    data: {
      menu: {
        title: 'Merchandise',
        icon: 'ion-bag',
        selected: true,
        expanded: true,
        order: 0
      }
    },
    children: [
      {
        path: 'categories',
        data: {
          menu: {
            title: 'Categories',
            pathMatch: 'partial'
          }
        }
      },
      {
        path: 'vendors',
        data: {
          menu: {
            title: 'Vendors',
            pathMatch: 'partial'
          }
        }
      },
      {
        path: 'products',
        data: {
          menu: {
            title: 'Products',
            pathMatch: 'partial'
          }
        }
      }
    ]
  }
];


export const PAGES_MENU = [
  {
    path: '',
    children: menus
  }
];
