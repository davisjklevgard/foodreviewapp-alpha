import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Restaurant } from './restaurants';
import { MessageService } from './message.service';
import {environment} from "../environments/environment";

// interface GetResponse {
//   _embedded: {
//     restaurants: Restaurant[];
//     _links: {self: {href: string}};
//   };
// }
@Injectable({ providedIn: 'root' })
export class RestaurantService {

  private restaurantsUrl = environment.apiBaseUrl;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }



  /** GET restaurants from the server */
  // getRestaurants(): Observable<Restaurant[]> {
  //   return this.http.get<Restaurant[]>(this.restaurantsUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched restaurants')),
  //       catchError(this.handleError<Restaurant[]>('getRestaurants', []))
  //     );
  // }

  public getRestaurants(): Observable<Restaurant[]> {
    console.log("this is the get restaurant getting all the restaurants");
    return this.http.get<Restaurant[]>(`${this.restaurantsUrl}/restaurant/all`);
  }

  public getRestaurantById(restaurantId: number): Observable<Restaurant> {
    console.log("we entered get res by id");
    return this.http.get<Restaurant>(`${this.restaurantsUrl}/restaurant/find?id=${restaurantId}`);

  }

  public addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.restaurantsUrl}/restaurant/add`, restaurant);
  }

  public updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.restaurantsUrl}/restaurant/update`, restaurant);
  }

  public deleteRestaurant(restaurantId: number): Observable<void> {
    return this.http.delete<void>(`${this.restaurantsUrl}/restaurant/delete?id=${restaurantId}`);
  }

  /** GET restaurant by id. Return `undefined` when id not found */
  getRestaurantNo404<Data>(id: number): Observable<Restaurant> {
    const url = `${this.restaurantsUrl}/?id=${id}`;
    return this.http.get<Restaurant[]>(url)
      .pipe(
        map(restaurants => restaurants[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} restaurant id=${id}`);
        }),
        catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
      );
  }

  /** GET restaurant by id. Will 404 if id not found */
  getRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.restaurantsUrl}/${id}`;
    return this.http.get<Restaurant>(url).pipe(
      tap(_ => this.log(`fetched restaurant id=${id}`)),
      catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
    );
  }

  /* GET restaurants whose name contains search term */
  searchRestaurants(term: string): Observable<Restaurant[]> {
    if (!term.trim()) {
      // if not search term, return empty restaurant array.
      return of([]);
    }
    return this.http.get<Restaurant[]>(`${this.restaurantsUrl}/?name=$(term)`).pipe(
      tap(x => x.length ?
        this.log(`found restaurants matching "${term}"`) :
        this.log(`no restaurants matching "${term}"`)),
      catchError(this.handleError<Restaurant[]>('searchRestaurants', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new restaurant to the server */
  // addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
  //   return this.http.post<Restaurant>(this.restaurantsUrl, restaurant, this.httpOptions).pipe(
  //     tap((newRestaurant: Restaurant) => this.log(`added restaurant w/ id=${newRestaurant.id}`)),
  //     catchError(this.handleError<Restaurant>('addRestaurant'))
  //   );
  // }

  /** DELETE: delete the restaurant from the server */
  // deleteRestaurant(id: number): Observable<Restaurant> {
  //   const url = `${this.restaurantsUrl}/${id}`;
  //
  //   return this.http.delete<Restaurant>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted restaurant id=${id}`)),
  //     catchError(this.handleError<Restaurant>('deleteRestaurant'))
  //   );
  // }

  /** PUT: update the restaurant on the server */
  // updateRestaurant(restaurant: Restaurant): Observable<any> {
  //   return this.http.put(this.restaurantsUrl, restaurant, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated restaurant id=${restaurant.id}`)),
  //     catchError(this.handleError<any>('updateRestaurant'))
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

  /** Log a RestaurantService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RestaurantService: ${message}`);
  }
}
