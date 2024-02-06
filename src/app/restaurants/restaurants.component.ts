import { Component, OnInit } from '@angular/core';
import {Restaurant} from "../restaurants";
import {RestaurantService} from "../restaurant.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  public restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.restaurantService.addRestaurant({ name } as Restaurant)
      .subscribe(restaurant => {
        this.restaurants.push(restaurant);
      });
  }

  delete(restaurant: Restaurant): void {
    this.restaurants = this.restaurants.filter(h => h !== restaurant);
    this.restaurantService.deleteRestaurant(restaurant.id).subscribe();
  }
}
