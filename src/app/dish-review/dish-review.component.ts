import {Component, Inject, OnInit} from '@angular/core';
import { DishReviewService} from "../dish-review.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatSliderModule, MatSliderChange} from '@angular/material/slider';
import { Dish } from 'app/dish';
import { MatDividerModule } from '@angular/material/divider';
import {DishReview} from "../dish-review";

@Component({
  selector: 'app-dish-review',
  templateUrl: './dish-review.component.html',
  styleUrls: ['./dish-review.component.css'],
})
export class DishReviewComponent implements OnInit {

  // tastes = [
  //   { name: "Sweet", value: 0 },
  //   { name: "Savory", value: 0 },
  //   { name: "Salty", value: 0 },
  //   { name: "Bitter", value: 0 },
  //   { name: "Sour", value: 0 },
  // ];
  //
  // scores = [
  //   { name: "Price", value: 0 },
  //   { name: "Doneness", value: 0 },
  //   { name: "Temperature", value: 0 },
  //   { name: "Presentation", value: 0 },
  // ];

  dishReview: DishReview = {
    bitter: 0,
    doneness: 0,
    overall: 0,
    presentation: 0,
    value: 0,
    salty: 0,
    savory: 0,
    sour: 0,
    sweet: 0,
    temperature: 0,
    dishId: this.dish.id,
    comment: "",
  }

  boundScores: string[] = [
    "bitter",
    "salty",
    "savory",
    "sour",
    "sweet",
    "doneness",
    "presentation",
    "value",
    "temperature"
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public dish: Dish,
    private dishReviewService: DishReviewService
  ) {}

  ngOnInit(): void { }

  submitDishReview() {
    throw new Error('Method not implemented.');
  }

  updateReviewScore() {
      const sumOfScores: number = this.boundScores.reduce((acc, score) => acc + this.dishReview[score], 0);

      this.dishReview.overall = sumOfScores / this.boundScores.length;
  }

  public addReview(): void {
    this.dishReviewService.addDishReview(this.dishReview).subscribe();
  }



}
