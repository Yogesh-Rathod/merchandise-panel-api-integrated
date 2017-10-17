import { Injectable } from '@angular/core';

@Injectable()
export class VendorsService {

  constructor() { }

  // All Operations Related To Vendors
  private vendors: any[] = [
    {
      'id': 1,
      'first_name': 'Verla',
      'last_name': 'Spong',
      'email': 'test@test.com',
      'published': true
    },
    {
      'id': 2,
      'first_name': 'Jade',
      'last_name': 'O Sharkey',
      'email': 'Jade.Sharkey@gmail.com'
    },
    {
      'id': 3,
      'first_name': 'Vernice',
      'last_name': 'Cicconettii',
      'email': 'Vernice.Cicconettii@gmail.com',
      'published': true
    },
    {
      'id': 4,
      'first_name': 'Benjy',
      'last_name': 'Bugby',
      'email': 'Benjy.Bugby@gmail.com'
    },
    {
      'id': 5,
      'first_name': 'Wallis',
      'last_name': 'Stemp',
      'email': 'Wallis.Stemp@gmail.com',
      'published': true
    },
    {
      'id': 6,
      'first_name': 'Guss',
      'last_name': 'Deboo',
      'email': 'Guss.Deboo@gmail.com'
    },
    {
      'id': 7,
      'first_name': 'Hubey',
      'last_name': 'Manie',
      'email': 'Hubey.Manie@gmail.com',
      'published': true
    },
    {
      'id': 8,
      'first_name': 'Jacki',
      'last_name': 'Kryszkiecicz',
    },
    {
      'id': 9,
      'first_name': 'Pasquale',
      'last_name': 'Warner',
      'published': true
    },
    {
      'id': 10,
      'first_name': 'Pamelina',
      'last_name': 'Whitehall',
    },
    {
      'id': 11,
      'first_name': 'Harv',
      'last_name': 'Rapsey',
      'published': true
    },
    {
      'id': 12,
      'first_name': 'Millicent',
      'last_name': 'Woodall',
    },
    {
      'id': 13,
      'first_name': 'Gabbie',
      'last_name': 'Hazeldine',
    },
    {
      'id': 14,
      'first_name': 'Donnajean',
      'last_name': 'Raoul',
    },
    {
      'id': 15,
      'first_name': 'Osbourne',
      'last_name': 'Doey',
    },
    {
      'id': 16,
      'first_name': 'Doug',
      'last_name': 'Kingswood',
    },
    {
      'id': 17,
      'first_name': 'Brear',
      'last_name': 'Feather',
    },
    {
      'id': 18,
      'first_name': 'Chloe',
      'last_name': 'Dodd',
    },
    {
      'id': 19,
      'first_name': 'Merill',
      'last_name': 'Wickham',
    },
    {
      'id': 20,
      'first_name': 'Ddene',
      'last_name': 'Fishenden',
    },
    {
      'id': 21,
      'first_name': 'Ludvig',
      'last_name': 'Tweddle',
    },
    {
      'id': 22,
      'first_name': 'Shalna',
      'last_name': 'Fozzard',
    },
    {
      'id': 23,
      'first_name': 'Gerty',
      'last_name': 'Biswell',
    },
    {
      'id': 24,
      'first_name': 'Odelle',
      'last_name': 'Parysiak',
    },
    {
      'id': 25,
      'first_name': 'Perrine',
      'last_name': 'Champain',
    },
    {
      'id': 26,
      'first_name': 'Britney',
      'last_name': 'Shemilt',
    },
    {
      'id': 27,
      'first_name': 'Elke',
      'last_name': 'Dulake',
    },
    {
      'id': 28,
      'first_name': 'Ethelda',
      'last_name': 'Chazelas',
    },
    {
      'id': 29,
      'first_name': 'Ruby',
      'last_name': 'Viste',
    },
    {
      'id': 30,
      'first_name': 'Saunderson',
      'last_name': 'Veart',
    },
    {
      'id': 31,
      'first_name': 'Helena',
      'last_name': 'Jest',
    },
    {
      'id': 32,
      'first_name': 'Udall',
      'last_name': 'Baughan',
    },
    {
      'id': 33,
      'first_name': 'Juline',
      'last_name': 'St. Hill',
    },
    {
      'id': 34,
      'first_name': 'Nataline',
      'last_name': 'Gohn',
    },
    {
      'id': 35,
      'first_name': 'Andonis',
      'last_name': 'Siddell',
    },
    {
      'id': 36,
      'first_name': 'Agna',
      'last_name': 'Turrell',
    },
    {
      'id': 37,
      'first_name': 'Gerry',
      'last_name': 'Elies',
    },
    {
      'id': 38,
      'first_name': 'Torrance',
      'last_name': 'Pavlishchev',
    },
    {
      'id': 39,
      'first_name': 'King',
      'last_name': 'Keneford',
    },
    {
      'id': 40,
      'first_name': 'Kathryn',
      'last_name': 'Blything',
    },
    {
      'id': 41,
      'first_name': 'Annabal',
      'last_name': 'Gorghetto',
    },
    {
      'id': 42,
      'first_name': 'Llewellyn',
      'last_name': 'Kropach',
    },
    {
      'id': 43,
      'first_name': 'Filippo',
      'last_name': 'Scardifield',
    },
    {
      'id': 44,
      'first_name': 'Emmet',
      'last_name': 'Moisey',
    },
    {
      'id': 45,
      'first_name': 'Else',
      'last_name': 'Tempest',
    },
    {
      'id': 46,
      'first_name': 'Jemmy',
      'last_name': 'O Brian',
    },
    {
      'id': 47,
      'first_name': 'Lamar',
      'last_name': 'Yateman',
    },
    {
      'id': 48,
      'first_name': 'Chris',
      'last_name': 'Waycott',
    },
    {
      'id': 49,
      'first_name': 'Clemente',
      'last_name': 'Hammarberg',
    },
    {
      'id': 50,
      'first_name': 'Tedman',
      'last_name': 'Kearsley',
    },
    {
      'id': 51,
      'first_name': 'Stacy',
      'last_name': 'Gurko',
    },
    {
      'id': 52,
      'first_name': 'Lindsay',
      'last_name': 'Last',
    },
    {
      'id': 53,
      'first_name': 'Pietra',
      'last_name': 'Wardall',
    },
    {
      'id': 54,
      'first_name': 'Marsh',
      'last_name': 'Manuele',
    },
    {
      'id': 55,
      'first_name': 'Broderick',
      'last_name': 'Sessions',
    },
    {
      'id': 56,
      'first_name': 'Tandie',
      'last_name': 'O Neill',
    },
    {
      'id': 57,
      'first_name': 'Yoshi',
      'last_name': 'Pearlman',
    },
    {
      'id': 58,
      'first_name': 'Abbie',
      'last_name': 'Braunstein',
    },
    {
      'id': 59,
      'first_name': 'Delmore',
      'last_name': 'Hanwell',
    },
    {
      'id': 60,
      'first_name': 'Richardo',
      'last_name': 'Duffett',
    },
    {
      'id': 61,
      'first_name': 'Hogan',
      'last_name': 'Blowfield',
    },
    {
      'id': 62,
      'first_name': 'Sig',
      'last_name': 'Strippel',
    },
    {
      'id': 63,
      'first_name': 'Heindrick',
      'last_name': 'Clampe',
    },
    {
      'id': 64,
      'first_name': 'Carlin',
      'last_name': 'Brownjohn',
    },
    {
      'id': 65,
      'first_name': 'Ryann',
      'last_name': 'Dell Casa',
    },
    {
      'id': 66,
      'first_name': 'Hoebart',
      'last_name': 'Shearmer',
    },
    {
      'id': 67,
      'first_name': 'Klara',
      'last_name': 'Peschet',
    },
    {
      'id': 68,
      'first_name': 'Saxe',
      'last_name': 'Insko',
    },
    {
      'id': 69,
      'first_name': 'Evaleen',
      'last_name': 'Dransfield',
    },
    {
      'id': 70,
      'first_name': 'Trevar',
      'last_name': 'Dodsley',
    },
    {
      'id': 71,
      'first_name': 'Avrit',
      'last_name': 'Schreiner',
    },
    {
      'id': 72,
      'first_name': 'Ginny',
      'last_name': 'Polding',
    },
    {
      'id': 73,
      'first_name': 'Sam',
      'last_name': 'Redemile',
    },
    {
      'id': 74,
      'first_name': 'Kristi',
      'last_name': 'Girdler',
    },
    {
      'id': 75,
      'first_name': 'Aubrey',
      'last_name': 'Rodie',
    },
    {
      'id': 76,
      'first_name': 'Penn',
      'last_name': 'Pervew',
    },
    {
      'id': 77,
      'first_name': 'Di',
      'last_name': 'Ximenez',
    },
    {
      'id': 78,
      'first_name': 'Mauricio',
      'last_name': 'Potkin',
    },
    {
      'id': 79,
      'first_name': 'Yule',
      'last_name': 'Leverett',
    },
    {
      'id': 80,
      'first_name': 'Camel',
      'last_name': 'Lenthall',
    },
    {
      'id': 81,
      'first_name': 'Bibbie',
      'last_name': 'Flanne',
    },
    {
      'id': 82,
      'first_name': 'Deeann',
      'last_name': 'Rattenbury',
    },
    {
      'id': 83,
      'first_name': 'Honey',
      'last_name': 'Bahike',
    },
    {
      'id': 84,
      'first_name': 'Marianne',
      'last_name': 'Storie',
    },
    {
      'id': 85,
      'first_name': 'Nikolaus',
      'last_name': 'Fison',
    },
    {
      'id': 86,
      'first_name': 'Minda',
      'last_name': 'Jacquemot',
    },
    {
      'id': 87,
      'first_name': 'Lambert',
      'last_name': 'Sivyour',
    },
    {
      'id': 88,
      'first_name': 'Hazel',
      'last_name': 'Keast',
    },
    {
      'id': 89,
      'first_name': 'Bordie',
      'last_name': 'Byrne',
    },
    {
      'id': 90,
      'first_name': 'Cordey',
      'last_name': 'Justham',
    },
    {
      'id': 91,
      'first_name': 'Garry',
      'last_name': 'Siene',
    },
    {
      'id': 92,
      'first_name': 'Hilario',
      'last_name': 'Vsanelli',
    },
    {
      'id': 93,
      'first_name': 'Shawnee',
      'last_name': 'McClaren',
    },
    {
      'id': 94,
      'first_name': 'Hilde',
      'last_name': 'Dinsdale',
    },
    {
      'id': 95,
      'first_name': 'Cecilius',
      'last_name': 'Pearde',
    },
    {
      'id': 96,
      'first_name': 'Sarah',
      'last_name': 'Trevance',
    },
    {
      'id': 97,
      'first_name': 'Elwood',
      'last_name': 'Mitchinson',
    },
    {
      'id': 98,
      'first_name': 'Hedi',
      'last_name': 'Popplestone',
    },
    {
      'id': 99,
      'first_name': 'Mattie',
      'last_name': 'Muck',
    },
    {
      'id': 100,
      'first_name': 'Fayre',
      'last_name': 'Sooper',
    },
  ];

  getVendors() {
    return this.vendors;
  }

  addVendor(vendor) {
    this.vendors.push(vendor);
    return this.vendors;
  }

  editVendor(vendors) {
    this.vendors = vendors;
    return this.vendors;
  }

}