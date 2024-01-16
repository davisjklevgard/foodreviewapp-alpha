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
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
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


