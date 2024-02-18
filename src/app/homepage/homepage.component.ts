import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Restaurant } from '../restaurants';
import { RestaurantService } from '../restaurant.service';
import {Dish} from "../dish";
import {DishService} from "../dish.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.css' ]
})
export class HomepageComponent implements OnInit {
  restaurants: Restaurant[] = [];
  public dishes: Dish[] = [];
  public randomIndex: number = 0;
  randomRestaurant: Restaurant | null = null;



  constructor(private restaurantService: RestaurantService, private dishService: DishService) {
  }
  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  ngOnInit(): void {
    this.getRestaurants();
    this.getDishes();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe(restaurants => {
        this.restaurants = restaurants.slice(0, 5);
        this.randomIndex = this.getRandomNumber(this.restaurants.length);
        this.randomRestaurant = this.getRandomRestaurant();
        console.log("this is the index " + this.randomIndex); // Logging the random index here
        // You can use this.randomIndex here or in any other part of your TypeScript file
      });
    // this.getRandomNumber(this.restaurants.length); is placed inside the subscription callback of getRestaurants().
    // This ensures that randomIndex is initialized after this.restaurants has been populated with data.
  }


  getRandomRestaurant(): any{
    this.randomIndex = this.getRandomNumber(this.restaurants.length);
    console.log("this is the index" + this.randomIndex);
    console.log("this is the index" + this.randomRestaurant?.name);
    return this.randomRestaurant = this.restaurants[this.randomIndex];
  }


  getDishes(): void {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes);
  }
}


