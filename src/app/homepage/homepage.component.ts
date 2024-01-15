import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurants';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.css' ]
})
export class HomepageComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants.slice(1, 5));
  }
}


