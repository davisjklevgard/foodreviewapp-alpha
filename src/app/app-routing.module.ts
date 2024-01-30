import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantPageComponent } from './restaurant-page/restaurant-page.component';
import {DishComponent} from "./dish/dish.component";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'restaurant-page/:id', component: RestaurantPageComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'dish/:id', component: DishComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
