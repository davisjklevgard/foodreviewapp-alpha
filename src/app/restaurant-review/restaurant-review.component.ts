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
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public restaurant: Restaurant, 
  ) {}
  
  ngOnInit(): void {
    console.log(this.restaurant)
  }
  
  submitReview(arg0: any) {
    throw new Error('Method not implemented.');
  }

}
