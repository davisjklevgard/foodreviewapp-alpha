import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {DishReview} from "./dish-review";
import { MessageService } from './message.service';
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class DishReviewService {

  private dishReviewUrl = environment.apiBaseUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  public getDishReviews(): Observable<DishReview[]> {
    return this.http.get<DishReview[]>(`${this.dishReviewUrl}/dishReview/all`);
  }

  public getDishReviewById(dishReviewId: number): Observable<DishReview> {
    return this.http.get<DishReview>(`${this.dishReviewUrl}/dishReview/find/${dishReviewId}`);
  }

  public addDishReview(dishReview: DishReview): Observable<DishReview> {
    return this.http.post<DishReview>(`${this.dishReviewUrl}/dishReview/add`, dishReview);
  }

  public updateDishReview(dishReview: DishReview): Observable<DishReview> {
    return this.http.put<DishReview>(`${this.dishReviewUrl}/dishReview/update`, dishReview);
  }

  public deleteDishReview(dishReviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.dishReviewUrl}/dishReview/delete/${dishReviewId}`);
  }
}
