// import { Component, OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Restaurant } from '../restaurants';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: [ './restaurant-page.component.css' ]
})
//export class RestaurantPageComponent implements OnInit
export class RestaurantPageComponent {
  // restaurant: Restaurant | undefined;
  @Input() restaurant?: Restaurant;
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRestaurant();
  }

  getRestaurant(): void {
    //const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getRestaurant(id)
      .subscribe(restaurant => this.restaurant = restaurant);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.restaurant) {
      this.restaurantService.updateRestaurant(this.restaurant)
        .subscribe(() => this.goBack());
    }
  }
}
