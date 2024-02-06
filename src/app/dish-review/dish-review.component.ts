import {Component, Inject, OnInit} from '@angular/core';
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

  finalReviewScore: any = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dish: Dish, 
  ) {}

  ngOnInit(): void {
    console.log(this.dish)
  }
  
  submitDishReview(arg0: any) {
    throw new Error('Method not implemented.');
  }
  
  updateReviewScore() {
    const sumOfScores: number = this.scores.reduce((acc, score) => acc + score.value, 0)
    console.log(sumOfScores, this.scores.length)
    this.finalReviewScore = sumOfScores / this.scores.length
  }

}
