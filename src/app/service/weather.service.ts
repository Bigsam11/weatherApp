import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, delay, catchError, retry } from 'rxjs/operators';
import {environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) { }

  baseUrl:string= environment.apiBaseUrl;
  appId:string = environment.endPoint;

  getWeatherByCity(cityName:string): Observable<any> {
    return this.http.get<any>(this.baseUrl + cityName + this.appId)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
