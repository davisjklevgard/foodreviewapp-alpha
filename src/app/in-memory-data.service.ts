import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Restaurant } from './restaurants';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {
  }
  createDb() {
    const restaurants = [
      { id: 12, name: 'Randys' },
      { id: 13, name: 'Rice Palace' },
      { id: 14, name: 'Texas Roadhouse' },
      { id: 15, name: 'Red Lobster' },
      { id: 16, name: 'McDonalds' },
      { id: 17, name: 'Wendys' },
      { id: 18, name: 'China Wok' },
      { id: 19, name: 'Akame' },
      { id: 20, name: 'Olive Garden' }
    ];
    return {restaurants};
  }

  // Overrides the genId method to ensure that a restaurant always has an id.
  // If the restaurants array is empty,
  // the method below returns the initial number (11).
  // if the restaurants array is not empty, the method below returns the highest
  // restaurant id + 1.
  genId(restaurants: Restaurant[]): number {
    return restaurants.length > 0 ? Math.max(...restaurants.map(restaurant => restaurant.id)) + 1 : 11;
  }
}


