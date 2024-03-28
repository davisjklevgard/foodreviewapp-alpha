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
  public dishCount: number = 0;
  toTryColor: string = '';
  favoriteColor: string = '';
  dislikeColor: string = '';


  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private dialog: MatDialog,
    private dishReviewService: DishReviewService
  ) {
  }

  ngOnInit(): void {
    this.getDish();
    this.getDishReview();
    if (this.dish?.favorite) {
      this.favoriteColor = 'green';
    } else if (this.dish?.dislike) {
      this.dislikeColor = 'red';
    } else if (this.dish?.toTry) {
      this.toTryColor = 'gold';
    } else {
      this.toTryColor = '';
      this.favoriteColor = '';
      this.dislikeColor = '';
    }
  }

  public getDish(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.dishService.getDishById(id).subscribe(dish => {
      this.dish = dish;
    });
  }

  public favoriteClick(dish: Dish): void {
    dish.favorite = !dish.favorite;
    if (dish.favorite) {
      this.favoriteColor = 'green';
    } else {
      this.favoriteColor = '';
    }
    if (dish.dislike || dish.toTry) {
      dish.dislike = false;
      dish.toTry = false;
      this.dislikeColor = '';
      this.toTryColor = '';
    }
    dish.dateTime = new Date().toISOString();

    this.dishService.updateDish(dish).subscribe(() => {
      //console.log("Did we get to change the database????");
      //console.log(dish.dateTime);
    })
  }

  // Add Dish to Dislikes
  public dislikeClick(dish: Dish): void {
    dish.dislike = !dish.dislike;
    if (dish.dislike) {
      this.dislikeColor = 'red';
    } else {
      this.dislikeColor = '';
    }
    if (dish.favorite || dish.toTry) {
      dish.favorite = false;
      dish.toTry = false;
      this.favoriteColor = '';
      this.toTryColor = '';
    }
    dish.dateTime = new Date().toISOString();

    this.dishService.updateDish(dish).subscribe(() => {
      //console.log(dish.dateTime);
    })
  }

  public toTryClick(dish: Dish): void {
    dish.toTry = !dish.toTry;
    if (dish.toTry) {
      this.toTryColor = 'gold';
    } else {
      this.toTryColor = '';
    }
    if (dish.dislike || dish.favorite) {
      dish.favorite = false;
      dish.dislike = false
      this.favoriteColor = '';
      this.dislikeColor = '';
    }
    dish.dateTime = new Date().toISOString();

    this.dishService.updateDish(dish).subscribe(() => {
      //console.log("Did we get to change the database????");
      //console.log(dish.dateTime);
    })
  }

  public getDishReview(): void {
    this.dishReviewService.getDishReviews().subscribe(
      (response: DishReview[]) => {
        this.dishReview = response;
        this.getOverallDishScore();
      }
    )
  }

  getOverallDishScore(): void {
    for (let review of this.dishReview) {
      if (review.dishId == this.dish?.id) {
        this.dishCount++;
        this.dish.overallScore += review.overall;
      }
    }
    // @ts-ignore
    this.dish.overallScore /= this.dishCount;
    // @ts-ignore
    this.dish.overallScore = parseFloat(this.dish?.overallScore.toFixed(2));
  }


  openDialog(dish: Dish) {
    this.dialog.open(DishReviewComponent, {
      data: dish,
    });
  }

}
