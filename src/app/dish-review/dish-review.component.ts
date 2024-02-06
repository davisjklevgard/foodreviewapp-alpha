import {Component, Inject, OnInit} from '@angular/core';
import { DishReviewService} from "../dish-review.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatSliderModule} from '@angular/material/slider';



@Component({
  selector: 'app-dish-review',
  templateUrl: './dish-review.component.html',
  styleUrls: ['./dish-review.component.css'],
})
export class DishReviewComponent implements OnInit {



  constructor(private dishReviewService: DishReviewService) {}

  ngOnInit(): void {

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
//
//
//   function generateUniqueRandomNumber(existingIds: number[]): number {
//     const maxAttempts = 1000; // Maximum attempts to generate a unique random number
//     const minNumber = 1;
//     const maxNumber = 1000; // Adjust the range based on your requirements
//
//     for (let attempt = 1; attempt <= maxAttempts; attempt++) {
//       const randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
//
//       if (!existingIds.includes(randomNum)) {
//         return randomNum;
//       }
//     }
//
//     throw new Error('Unable to generate a unique random number after multiple attempts.');
//   }
//
// // Example usage:
//   const existingIds = [1, 3, 5, 7, 9];
//   const uniqueRandomNumber = generateUniqueRandomNumber(existingIds);
//
//   function generateUniqueRandomNumberFromItems(items: YourItemType[]): number {
//     const existingIds = items.map(item => item.id);
//     return generateUniqueRandomNumber(existingIds);
//   }
//
// // Example usage:
//   const yourItems: YourItemType[] = [
//     { id: 1, name: 'Item A' },
//     { id: 2, name: 'Item B' },
//     { id: 3, name: 'Item C' },
//     // Add more items as needed
//   ];
//
//   const uniqueRandomNumber = generateUniqueRandomNumberFromItems(yourItems);
//
//   console.log('Unique Random Number:', uniqueRandomNumber);



}
