
const menus = [
  {
    path: 'merchandise',
    data: {
      menu: {
        title: 'Merchandise',
        icon: 'ion-bag',
        selected: true,
        expanded: true,
        order: 0,
      },
    },
    children: [
    {
      path: 'categories',
      data: {
        menu: {
          title: 'Categories',
        },
      },
    },
    {
      path: 'vendors',
      data: {
        menu: {
          title: 'Vendors',
        },
      },
    },
    ],
  },
];


export const PAGES_MENU = [
  {
    path: '',
    children: menus,
  },
];
