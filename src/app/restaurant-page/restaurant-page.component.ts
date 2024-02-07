import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Restaurant } from '../restaurants';
import { RestaurantService } from '../restaurant.service';
import { Dish } from '../dish';
import { DishService } from "../dish.service";
import {HttpErrorResponse} from "@angular/common/http";
import { MatDialog } from '@angular/material/dialog';
import { RestaurantReviewComponent } from 'app/restaurant-review/restaurant-review.component';
import { RestaurantReview } from 'app/restaurant-review';
import { RestaurantReviewService } from 'app/restaurant-review.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: [ './restaurant-page.component.css' ]
})
export class RestaurantPageComponent implements OnInit{

  restaurant?: Restaurant;

  public restaurantReviews: RestaurantReview[] = [];
  public dishes: Dish[] = [];
  
  showAppetizer: boolean = false;
  showEntree: boolean = false;
  showSide: boolean = false;
  showDessert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private restaurantReviewService: RestaurantReviewService,
    private dishService: DishService,
    private location: Location,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getRestaurant();
    this.getDishes();
    // this.getRestaurantReviews();
  }

  getRestaurant(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.restaurantService.getRestaurantById(id)
      .subscribe(restaurant => { 
        this.restaurant = restaurant; 
        this.getRestaurantReviews();
      });
  }

  public getDishes(): void {
    this.dishService.getDishes().subscribe(
      (response: Dish[]) => {
        this.dishes = response;
      },
      (error: HttpErrorResponse)  => {
        alert(error.message);
      }
    )
  }

  public getRestaurantReviews(): void {
    if (!this.restaurant) return;

    console.log(this.restaurant)

    this.restaurantReviewService.getRestaurantReviewsByRestaurantId(this.restaurant.id).subscribe(
      (response: RestaurantReview[]) => {
        this.restaurantReviews = response;
        console.log(this.restaurantReviews)
      },
      (error: HttpErrorResponse) => {
      alert(error.message);
      }
    )
  }

  openDialog(restaurant: Restaurant) {
    this.dialog.open(RestaurantReviewComponent, {
      data: restaurant,
    });
  }

  toggleSection(section: string): void {
    // Toggle the corresponding boolean flag based on the clicked section
    switch (section) {
      case 'Appetizer':
        this.showAppetizer = !this.showAppetizer;
        break;
      case 'Entree':
        this.showEntree = !this.showEntree;
        break;
      case 'Side':
        this.showSide = !this.showSide;
        break;
      case 'Dessert':
        this.showDessert = !this.showDessert;
        break;
    }
  }


//   // Add Dish to Favorites
//   public favoriteClick(dish: Dish): void {
//     dish.favorite = !dish.favorite;
//     if (dish.dislike = true) {
//       dish.dislike = false;
//     }
//   }
//
//   // Add Dish to Dislikes
//   public dislikeClick(dish: Dish): void {
//     dish.dislike = !dish.dislike;
//     if (dish.favorite = true) {
//       dish.favorite = false;
//     }
//   }
//
//   //Add or decrease the rating
//   public increaseRating(dish: Dish): void {
//     if (dish.rating < 5) {
//       dish.rating++;
//     }
//   }
//
//   public decreaseRating(dish: Dish): void {
//     if (dish.rating != 0) {
//       dish.rating--;
//     }
//   }
//
// }


  // getDishes(): void {
  //   this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
  // }

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
