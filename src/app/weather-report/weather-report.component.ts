import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, filter, concatMap, tap, takeUntil } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {
  data$:Observable<string>;
  private unsubscribe$ = new Subject<void>();
  
  result:any={}
  weatherImage:string;

  today: Date = new Date();

  loading = false;
  city = new FormControl('', [Validators.required]);
  
  location: string;
  cities$: Observable<string>;
  errorMessage: any;

  constructor(
    private weatherService: WeatherService,
    private route: Router
  ) {

   }

  ngOnInit() {
      // console.log("it got hereas an instruction " + this.city);
      // this.getCityLocation(this.city.value);
      
    this.city.valueChanges
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(value => {
     this.getCityLocation(value)
     
    });
  
  }
 

  getCityLocation(city:string){
    this.loading = true;
    return this.weatherService.getWeatherByCity(city).subscribe((data: {}) => {
      this.result = data;
      this.weatherImage = "http://openweathermap.org/img/wn/"+this.result.weather[0].icon +"@2x.png";
      this.loading = false;
    },
    (error) => {                     
      console.error('error caught in component'+  error.status)
      this.errorMessage = error.message;
      this.loading = false;
    }
    )
    
  }


}
