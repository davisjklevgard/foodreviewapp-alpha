import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Dish } from './dish';
import { MessageService } from './message.service';
import {environment} from "../environments/environment";



@Injectable({ providedIn: 'root' })
export class DishService {

  private dishesUrl = environment.apiBaseUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  public  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.dishesUrl}/dish/all`);
  }

  public getDishById(dishId: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.dishesUrl}/dish/find/${dishId}`);

  }

  public addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${this.dishesUrl}/dish/add`, dish);
  }

  public updateDish(dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.dishesUrl}/dish/update`, dish);
  }

  public deleteDish(dishId: number): Observable<void> {
    return this.http.delete<void>(`${this.dishesUrl}/dish/delete/${dishId}`);
  }

  /** GET dish from the server */
  // getDishes(): Observable<Dish[]> {
  //   return this.http.get<Dish[]>(this.dishesUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched dishes')),
  //       catchError(this.handleError<Dish[]>('getDishes', []))
  //     );
  // }

  // getDishes(): Observable<Dish[]> {
  //   return of(Dish);
  // }

  /** GET dish by id. Return `undefined` when id not found */
  getDishNo404<Data>(id: number): Observable<Dish> {
    const url = `${this.dishesUrl}/?id=${id}`;
    return this.http.get<Dish[]>(url)
      .pipe(
        map(dish => dish[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} dish id=${id}`);
        }),
        catchError(this.handleError<Dish>(`getDish id=${id}`))
      );
  }

  /** GET dish by id. Will 404 if id not found */
  // getDish(id: number): Observable<Dish> {
  //   const url = `${this.dishesUrl}/${id}`;
  //   return this.http.get<Dish>(url).pipe(
  //     tap(_ => this.log(`fetched dish id=${id}`)),
  //     catchError(this.handleError<Dish>(`getDish id=${id}`))
  //   );
  // }

  /* GET dish whose name contains search term */
  // searchDishes(term: string): Observable<Dish[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty dish array.
  //     return of([]);
  //   }
  //   return this.http.get<Dish[]>(`${this.dishesUrl}/?name=$(term)`).pipe(
  //     tap(x => x.length ?
  //       this.log(`found dishes matching "${term}"`) :
  //       this.log(`no dishes matching "${term}"`)),
  //     catchError(this.handleError<Dish[]>('searchDishes', []))
  //   );
  //   console.log("did not do anything")
  // }

  //////// Save methods //////////

  /** POST: add a new dish to the server */
  // addDish(dish: Dish): Observable<Dish> {
  //   return this.http.post<Dish>(this.dishesUrl, dish, this.httpOptions).pipe(
  //     tap((newDish: Dish) => this.log(`added dish w/ id=${newDish.id}`)),
  //     catchError(this.handleError<Dish>('addDish'))
  //   );
  // }
  //
  // /** DELETE: delete the dish from the server */
  // deleteDish(id: number): Observable<Dish> {
  //   const url = `${this.dishesUrl}/${id}`;
  //
  //   return this.http.delete<Dish>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted dish id=${id}`)),
  //     catchError(this.handleError<Dish>('deleteDish'))
  //   );
  // }
  //
  // /** PUT: update the dish on the server */
  // updateDish(dish: Dish): Observable<any> {
  //   return this.http.put(this.dishesUrl, dish, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated dish id=${dish.id}`)),
  //     catchError(this.handleError<any>('updateDish'))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DishService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`DishService: ${message}`);
  }
}
