import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { Restaurant } from 'app/restaurants';

@Component({
  selector: 'app-restaurant-review',
  templateUrl: './restaurant-review.component.html',
  styleUrls: ['./restaurant-review.component.css']
})
export class RestaurantReviewComponent implements OnInit {

  scores = [
    { name: "Price", value: 0 },
    { name: "Service", value: 0 },
    { name: "Cleanliness", value: 0 },
    { name: "Atmosphere", value: 0 },
    { name: "Accessibility", value: 0 },
    { name: "Location", value: 0 },
  ];

  finalReviewScore: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public restaurant: Restaurant,
  ) {}

  ngOnInit(): void { }

  formatLabel(value: number): number {
    if (value >= 1) {
      return Math.round(value / 10);
    }

    return value;
  }

  submitRestaurantReview(restaurant: Restaurant) {
    throw new Error('Method not implemented.');
  }

  updateReviewScore() {
    const sumOfScores: number = this.scores.reduce((acc, score) => acc + score.value, 0);

    this.finalReviewScore = sumOfScores / this.scores.length;
  }

}
