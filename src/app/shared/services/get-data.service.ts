import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  countries: Object[] = [];
  constructor(
    private http: HttpClient
  ) {

  }

  test() {
    let cachedData = window.localStorage.getItem('all')
    if (cachedData) {
      alert('from cache');
      this.countries = JSON.parse(cachedData);
      console.log(this.countries);
    } else {
      this.http.get("https://restcountries.eu/rest/v2/all").subscribe((data: any) => {
        alert('fresh');
        this.countries = data;
        console.log(this.countries);
        window.localStorage.setItem('all', JSON.stringify(data));

      });
    }
  }

  getAllCountries(): Observable<any> {
    return this.http.get("https://restcountries.eu/rest/v2/all").pipe(map((d: any) => d));
  }

  getCountriesFromRegion(region: string): Observable<any> {
    return this.http.get(`https://restcountries.eu/rest/v2/region/${region}`).pipe(map((d: any) => d));
  }

  getCountry(name: string): Observable<any> {
    return this.http.get(`https://restcountries.eu/rest/v2/name/${name}`).pipe(map((d: any) => d));
  }

  getCountryUsingCode(code: string): Observable<any> {
    return this.http.get(`https://restcountries.eu/rest/v2/alpha/${code}`).pipe(first((d: any) => d));
  }

  getCountriesUsingCodes(codes: string): Observable<any> {
    return this.http.get(`https://restcountries.eu/rest/v2/alpha?codes=${codes}`).pipe(map((d: any) => d));
  }

}
