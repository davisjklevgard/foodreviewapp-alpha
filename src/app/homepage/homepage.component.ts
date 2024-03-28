import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Restaurant } from '../restaurants';
import { RestaurantService } from '../restaurant.service';
import {Dish} from "../dish";
import {DishService} from "../dish.service";
import {Sort} from "@angular/material/sort";
import {DishReviewService} from "../dish-review.service";
import {DishReview} from "../dish-review";
import {HttpErrorResponse} from "@angular/common/http";


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

  public dishReview: DishReview[] = [];

  public favoriteDishes: Dish[] = [];
  public toTryDishes: Dish[] = [];





  constructor(private restaurantService: RestaurantService, private dishService: DishService, private dishReviewService: DishReviewService) {
  }

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  ngOnInit(): void {
    this.getRestaurants();
    this.getDishes();
    this.getDishReview();
    this.populateListArrays();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe(restaurants => {
        this.restaurants = restaurants.slice(0, 5);
        this.randomIndex = this.getRandomNumber(this.restaurants.length);
        this.randomRestaurant = this.getRandomRestaurant();// Logging the random index here
        // You can use this.randomIndex here or in any other part of your TypeScript file
      });
    // this.getRandomNumber(this.restaurants.length); is placed inside the subscription callback of getRestaurants().
    // This ensures that randomIndex is initialized after this.restaurants has been populated with data.
  }


  getRandomRestaurant(): any {
    this.randomIndex = this.getRandomNumber(this.restaurants.length);
    return this.randomRestaurant = this.restaurants[this.randomIndex];
  }


  getDishes(): void {
    this.dishService.getDishes()
      .subscribe(dishes => {
        this.dishes = dishes;
        this.populateListArrays();
      });
  }

  public getDishReview(): void{
    this.dishReviewService.getDishReviews().subscribe(
      (response: DishReview[]) => {
        this.dishReview = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  populateListArrays() {
    for (let dish of this.dishes) {
      if (dish.favorite) {
        this.favoriteDishes.push(dish);
      } else if  (dish.toTry) {
        this.toTryDishes.push(dish);
      }
    }
  }

  sortDataFavorite(sort: Sort) {
    const data = this.favoriteDishes.slice();
    if (!sort.active || sort.direction === '') {
      this.favoriteDishes = data;
      return;
    }

    this.favoriteDishes = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      function compare(restaurant: string, restaurant2: string, isAsc: boolean) {
        return (restaurant < restaurant2 ? -1 : 1) * (isAsc ? 1 : -1);
      }

      function compareNumbers(dish: number, dish2: number, isAsc: boolean) {
        return (dish < dish2 ? -1 : 1) * (isAsc ? 1 : -1);
      }

      function compareDateTime(dateTime1: string, dateTime2: string, isAsc: boolean) {
        const date1 = new Date(dateTime1);
        const date2 = new Date(dateTime2);

        // Compare dates
        if (date1 < date2) {
          return isAsc ? -1 : 1;
        } else if (date1 > date2) {
          return isAsc ? 1 : -1;
        } else {
          return 0;
        }
      }


      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'course':
          return compare(a.course, b.course, isAsc);
        case 'restaurant':
          return compare(a.restaurant, b.restaurant, isAsc);
        case 'rating':
          return compareNumbers(a.overallScore, b.overallScore, isAsc);
        case 'date':
          return compareDateTime(a.dateTime, b.dateTime, isAsc);
        default:
          return 0;
      }
    });
  }

  sortDataToTry(sort: Sort) {
    const data = this.toTryDishes.slice();
    if (!sort.active || sort.direction === '') {
      this.toTryDishes = data;
      return;
    }

    this.toTryDishes = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      function compare(restaurant: string, restaurant2: string, isAsc: boolean) {
        return (restaurant < restaurant2 ? -1 : 1) * (isAsc ? 1 : -1);
      }

      function compareNumbers(dish: number, dish2: number, isAsc: boolean) {
        return (dish < dish2 ? -1 : 1) * (isAsc ? 1 : -1);
      }

      function compareDateTimeToTry(dateTime1: string, dateTime2: string, isAsc: boolean) {
        const date1 = new Date(dateTime1);
        const date2 = new Date(dateTime2);

        // Compare dates
        if (date1 < date2) {
          return isAsc ? -1 : 1;
        } else if (date1 > date2) {
          return isAsc ? 1 : -1;
        } else {
          return 0;
        }
      }


      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'course':
          return compare(a.course, b.course, isAsc);
        case 'restaurant':
          return compare(a.restaurant, b.restaurant, isAsc);
        case 'rating':
          return compareNumbers(a.overallScore, b.overallScore, isAsc);
        case 'date':
          return compareDateTimeToTry(a.dateTime, b.dateTime, isAsc);
        default:
          return 0;
      }
    });
  }
}
