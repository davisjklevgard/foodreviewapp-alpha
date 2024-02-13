import { Component, OnInit } from '@angular/core';
import { Dish } from "../dish";
import { DishService} from "../dish.service";
import {ActivatedRoute} from "@angular/router";
import { DishReview } from "../dish-review";
import {DishReviewComponent} from "../dish-review/dish-review.component";
import { DishReviewService} from "../dish-review.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  dish?: Dish;
  public dishReview: DishReview[] = [];

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private dialog: MatDialog,
    private dishReviewService: DishReviewService
  ) {}

  ngOnInit(): void {
    this.getDish();
    this.getDishReview();
  }

  public getDish(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.dishService.getDishById(id).subscribe(dish => this.dish = dish);
  }

  public favoriteClick(dish: Dish): void {
    dish.favorite = !dish.favorite;
    if (dish.dislike) {
      dish.dislike = false;
    }

    this.dishService.updateDish(dish).subscribe(() => {
      console.log("Did we get to change the database????");
    })
  }

  // Add Dish to Dislikes
  public dislikeClick(dish: Dish): void {
    dish.dislike == !dish.dislike;
    if (dish.favorite) {
      dish.favorite = false;
    }

    this.dishService.updateDish(dish).subscribe(() => {
      console.log("Did we get to change the database????");
    })
  }

  public toTryClick(dish: Dish): void {
    dish.toTry = !dish.toTry;
    if (dish.dislike || dish.favorite) {
      dish.favorite = false;
      dish.dislike = false;
    }

    this.dishService.updateDish(dish).subscribe(() => {
      console.log("Did we get to change the database????");
    })
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



  openDialog(dish: Dish) {
    this.dialog.open(DishReviewComponent, {
      data: dish,
    });
  }



}
