import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MessageService } from './message.service';
import { RestaurantReview } from './restaurant-review';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RestaurantReviewService {

  private restaurantReviewUrl = environment.apiBaseUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  public getRestaurantReviews(): Observable<RestaurantReview[]> {
    console.log("we entered and got the restaurant reviews");
    return this.http.get<RestaurantReview[]>(`${this.restaurantReviewUrl}/restaurantReview/all`);
  }

  public getRestaurantReviewById(restaurantId: number): Observable<RestaurantReview> {
    return this.http.get<RestaurantReview>(`${this.restaurantReviewUrl}/restaurantReview/find?id=${restaurantId}`);
  }

  public addRestaurantReview(newReview: RestaurantReview): Observable<RestaurantReview> {
    return this.http.post<RestaurantReview>(`${this.restaurantReviewUrl}/restaurantReview/add`, newReview);
  }

  public updateRestaurantReview(restaurantReview: RestaurantReview): Observable<RestaurantReview> {
    return this.http.put<RestaurantReview>(`${this.restaurantReviewUrl}/restaurantReview/update`, restaurantReview);
  }

  public deleteRestaurantReview(restaurantReviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.restaurantReviewUrl}/restaurantReview/delete?id=${restaurantReviewId}`);
  }

}
