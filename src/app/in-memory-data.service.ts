// import { Injectable } from '@angular/core';
// import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { Restaurant } from './restaurants';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class InMemoryDataService implements InMemoryDbService {
//   constructor() {
//   }
//   createDb() {
//     const restaurants = [
//       { id: 12, name: 'Randys', address: "1132 W MacArthur Ave, Eau Claire, WI 54701", phone: '(715) 839-8449', cuisine: 'Family' },
//       { id: 13, name: 'Rice Palace', address: '210 S Barstow St, Eau Claire, WI 54701', phone: '(715) 514-0460', cuisine: 'Thai' },
//       { id: 14, name: 'Texas Roadhouse', address: '5019 Keystone Crossing, Eau Claire, WI 54701', phone: '(715) 838-0035', cuisine: 'Steak House' },
//       { id: 15, name: 'Red Lobster', address: 'Shopko Plaza, 1019 W Clairemont Ave, Eau Claire, WI 54701', phone: '(715) 833-0184', cuisine: 'Seafood' },
//       { id: 16, name: 'McDonalds', address: '1513 S Hastings Way, Eau Claire, WI 54701', phone: '(715) 835-9919', cuisine: 'Fast Food' },
//       { id: 17, name: 'Wendys', address: '959 W Clairemont Ave, Eau Claire, WI 54701', phone: '(715) 531-0122', cuisine: 'Fast Food' },
//       { id: 18, name: 'China Wok', address: '2605 Golf Rd, Eau Claire, WI 54701', phone: '(715) 838-7268', cuisine: 'Chinese' },
//       { id: 19, name: 'Akame', address: '4056 Commonwealth Ave, Eau Claire, WI 54701', phone: '(715) 895-6658', cuisine: 'Sushi' },
//       { id: 20, name: 'Olive Garden', address: '4920 Golf Rd, Eau Claire, WI 54701', phone: '(715) 838-0707', cuisine: 'Italian' }
//     ];
//     const dishes = [
//       {id: 1, name: 'Cheeseburger', restaurant: 'Randys', price: '7.89', course: 'Entree'},
//       {id: 2, name: 'Drunken Noodles', restaurant: 'Rice Palace', price: '12.48', course: 'Entree'},
//       {id: 3, name: 'Rib Eye Steak', restaurant: 'Texas Roadhous', price: '21.89', course: 'Entree'},
//       {id: 4, name: 'Cheese biscuits', restaurant: 'Red Lobster', price: '2.32', course: 'Side'},
//       {id: 5, name: 'Big Mac', restaurant: 'McDonalds', price: '6.89', course: 'Entree'},
//       {id: 6, name: 'Frosty', restaurant: 'Wendys', price: '6.89', course: 'Dessert'},
//       {id: 7, name: 'Egg Roll', restaurant: 'China Wok', price: '1.70', course: 'Appetizer'},
//       {id: 8, name: 'Eel Don', restaurant: 'Akame', price: '7.89', course: 'Entree'},
//       {id: 9, name: 'Salad', restaurant: 'Olive Garden', price: '7.89', course: 'Side'}
//     ]
//     return {restaurants, dishes};
//   }
//
//   // Overrides the genId method to ensure that a restaurant always has an id.
//   // If the restaurants array is empty,
//   // the method below returns the initial number (11).
//   // if the restaurants array is not empty, the method below returns the highest
//   // restaurant id + 1.
//   genId(restaurants: Restaurant[]): number {
//     return restaurants.length > 0 ? Math.max(...restaurants.map(restaurant => restaurant.id)) + 1 : 11;
//   }
// }
//
// // ( 13,   '210 S Barstow St, Eau Claire, WI 54701',                     'Thai'       , 'Rice Palace',    '(715) 514-0460'    ),
// // ( 14,  '5019 Keystone Crossing, Eau Claire, WI 54701',               'Steak House', 'Texas Roadhouse', '(715) 838-0035'    ),
// // ( 15,   'Shopko Plaza, 1019 W Clairemont Ave, Eau Claire, WI 54701',  'Seafood'    , 'Red Lobster',    '(715) 833-0184'    ),
// // ( 16,   '1513 S Hastings Way, Eau Claire, WI 54701',                  'Fast Food'  , 'McDonalds',      '(715) 835-9919'    ),
// // ( 17,   '959 W Clairemont Ave, Eau Claire, WI 54701',                 'Fast Food'  , 'Wendys',         '(715) 531-0122'    ),
// // ( 18,   '2605 Golf Rd, Eau Claire, WI 54701',                         'Chinese'    , 'China Wok',      '(715) 838-7268'    ),
// // ( 19,   '4056 Commonwealth Ave, Eau Claire, WI 54701',                'Sushi'      , 'Akame',          '(715) 895-6658'    ),
// // ( 20,   '4920 Golf Rd, Eau Claire, WI 54701',                         'Italian'    , 'Olive Garden',   '(715) 838-0707'    )
//
// // (1, 'Entree', 'Cheeseburger',      '7.89', 'Randys'         ),
// // (2, 'Entree', 'Drunken Noodles',   '12.48','Rice Palace'    ),
// // (3, 'Entree', 'Rib Eye Steak',     '21.89', 'Texas Roadhous' ),
// // (4, 'Side', 'Cheese biscuits',     '2.32', 'Red Lobster'    ),
// // (5, 'Entree', 'Big Mac',           '6.89', 'McDonalds'      ),
// // (6, 'Dessert', 'Frosty',           '6.89', 'Wendys'         ),
// // (7, 'Appetizer', 'Egg Roll',       '1.70', 'China Wok'     ),
// // (8, 'Entree', 'Eel Don',           '7.89', 'Akame'          ),
// // (9, 'Side', 'Salad',               '7.89', 'Olive Garden'   )
