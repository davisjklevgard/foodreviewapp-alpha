import {Component, Inject, OnInit} from '@angular/core';
import { DishReviewService} from "../dish-review.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatSliderModule, MatSliderChange} from '@angular/material/slider';
import { Dish } from 'app/dish';

@Component({
  selector: 'app-dish-review',
  templateUrl: './dish-review.component.html',
  styleUrls: ['./dish-review.component.css'],
})
export class DishReviewComponent implements OnInit {

  scores = [
    { name: "Presentation", value: 0 },
    { name: "Price", value: 0 },
    { name: "Temperature", value: 0 },
    { name: "Doneness", value: 0 }
  ];
  finalReviewScore: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dish: Dish, 
    private dishReviewService: DishReviewService
  ) {}

  ngOnInit(): void { }

  submitDishReview(arg0: any) {
    throw new Error('Method not implemented.');
  }

  updateReviewScore() {
    const sumOfScores: number = this.scores.reduce((acc, score) => acc + score.value, 0);

    this.finalReviewScore = sumOfScores / this.scores.length;
  }

  //   public addReview(bitter: number,
  //   donenessScore: number,
  //   overallScore: number,
  //   presentationScore: number,
  //   priceScore: number,
  //   salty: number,
  //   savory: number,
  //   sour: number,
  //   sweet: number,
  //   temperatureScore: number): void {
  //     if (!bitter && !donenessScore && !overallScore && !presentationScore && !priceScore
  //          && !salty && !savory && !sour && !sweet && !temperatureScore) { return; }
  //     this.dishReviewService.addDishReview({bitter, overallScore, presentationScore, priceScore, donenessScore, salty, savory, sour, sweet, temperatureScore})
  //   }

}