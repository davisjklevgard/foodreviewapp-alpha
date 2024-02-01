import { Component, OnInit } from '@angular/core';
import { Dish } from "../dish";
import { DishService} from "../dish.service";
import {ActivatedRoute} from "@angular/router";
//import {MatDialog,  MAT_DIALOG_DATA,  MatDialogTitle,  MatDialogContent,} from '@angular/material/dialog';
import { DishReview } from "../dish-review";
import {DishReviewComponent} from "../dish-review/dish-review.component";
import { DishReviewService} from "../dish-review.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatButtonModule} from '@angular/material/button';

// export interface DialogData {
//   dish: Dish;
// }


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
    //private dialog: MatDialog,
    private dishReviewService: DishReviewService
  ) {}

  ngOnInit(): void {
    this.getDish();
    this.getDishReview();
  }

  public getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dishService.getDishById(id).subscribe(dish => this.dish = dish);
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



  // public openReview(dish: Dish): void{
  //   const dialogRef= this.dialog.open(DishReviewComponent, {
  //     width: '250px',
  //     data: dish,
  //   });
  //
  //
  //   dialogRef.afterClosed().subscribe((result)=>{
  //     console.log('The review can be brought up');
  //     console.log(result);
  //   })
  // }



}
