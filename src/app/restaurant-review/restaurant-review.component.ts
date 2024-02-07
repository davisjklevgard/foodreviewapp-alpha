import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { RestaurantReview } from 'app/restaurant-review';
import { RestaurantReviewService } from 'app/restaurant-review.service';
import { Restaurant } from 'app/restaurants';

@Component({
  selector: 'app-restaurant-review',
  templateUrl: './restaurant-review.component.html',
  styleUrls: ['./restaurant-review.component.css']
})
export class RestaurantReviewComponent implements OnInit {

  review: RestaurantReview = {
    // id: 0,
    priceScore: 0,
    serviceScore: 0,
    locationScore: 0,
    atmosphereScore: 0,
    cleanlinessScore: 0,
    availabilityScore: 0,
    accessibilityScore: 0,
    overallScore: 0,
    comments: "",
    restaurantId: this.restaurant.id,
  }

  boundScores: string[] = [
    "priceScore",
    "serviceScore",
    "locationScore",
    "atmosphereScore",
    "cleanlinessScore",
    "availabilityScore",
    "accessibilityScore",
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public restaurant: Restaurant,
    private restaurantReviewService: RestaurantReviewService,
  ) {}

  ngOnInit(): void {
    console.log(this.restaurant)
  }

  updateReviewScore() {
    const sumOfScores: number = this.boundScores.reduce((acc, score) => acc + this.review[score], 0);

    this.review.overallScore = sumOfScores / this.boundScores.length;
  }

  submitRestaurantReview(): void {    

    console.log(this.review)

    this.restaurantReviewService.addRestaurantReview(this.review)
    
    // .subscribe(restaurant => {
      //   this.restaurants.push(restaurant);
      // });
  }

}
