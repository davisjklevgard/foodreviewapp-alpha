import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantPageComponent } from './restaurant-page/restaurant-page.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchComponent } from './search/search.component';
import { DishComponent } from './dish/dish.component';
import { DishReviewComponent } from './dish-review/dish-review.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatSliderModule } from "@angular/material/slider";
import { MatDividerModule } from "@angular/material/divider";
import { RestaurantReviewComponent } from './restaurant-review/restaurant-review.component';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RestaurantsComponent,
    RestaurantPageComponent,
    MessagesComponent,
    SearchComponent,
    DishComponent,
    DishReviewComponent,
    RestaurantReviewComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatSliderModule,
        MatDividerModule,
        MatSortModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
