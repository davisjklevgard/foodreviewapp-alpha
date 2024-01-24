import {Component, OnInit} from '@angular/core';
import {Restaurant} from "./restaurants";
import {RestaurantService} from "./restaurant.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'foodreviewapp-alpha';

  public restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.getRestaurants();
  }

  public getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (response: Restaurant[]) => {
        this.restaurants = response;
      },
      (error: HttpErrorResponse)  => {
        alert(error.message);
      }
    )

  }

}
