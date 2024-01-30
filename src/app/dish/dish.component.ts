import { Component, OnInit } from '@angular/core';
import { Dish } from "../dish";
import { DishService} from "../dish.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  dish?: Dish;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDish();
  }

  public getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dishService.getDishById(id).subscribe(dish => this.dish = dish);
  }

}
