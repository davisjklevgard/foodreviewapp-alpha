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
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';
import { DishComponent } from './dish/dish.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RestaurantsComponent,
    RestaurantPageComponent,
    MessagesComponent,
    SearchComponent,
    DishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
      //InMemoryDataService, { dataEncapsulation: false }

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
