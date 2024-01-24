// import { Component, OnInit } from '@angular/core';
import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Restaurant } from '../restaurants';
import { RestaurantService } from '../restaurant.service';
import { Dish } from '../dish';
import { DishService } from "../dish.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: [ './restaurant-page.component.css' ]
})
//export class RestaurantPageComponent implements OnInit
export class RestaurantPageComponent implements OnInit{
  // restaurant: Restaurant | undefined;

   restaurant?: Restaurant;
   public dishes: Dish[] = [];
  showAppetizer: boolean = false;
  showEntree: boolean = false;
  showSide: boolean = false;
  showDessert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private dishService: DishService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRestaurant();
    this.getDishes();
  }

  getRestaurant(): void {
    console.log("we entered get Restaurant");
    //const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getRestaurantById(id)
      .subscribe(restaurant => this.restaurant = restaurant);
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
