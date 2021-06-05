import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryData } from 'src/app/shared/interface/country-data'

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  countries: Observable<CountryData[]> | undefined;
  constructor(
    private http: HttpClient
  ) {
    this.initData();
  }

  initData() {
    let cached = window.localStorage.getItem('allCountries');

    if (cached) {
      this.countries = of(JSON.parse(cached)) as Observable<CountryData[]> | undefined;
    } else {
      let tmp = this.http.get("https://restcountries.eu/rest/v2/all")
      this.countries = tmp.pipe(map((d: any) => d));
      tmp.subscribe((data) => {
        window.localStorage.setItem("allCountries", JSON.stringify(data));
      })
    }
  }

  getAllCountries(): Observable<CountryData[]> | undefined {
    return this.countries;
  }

  getCountryFromQuery(name: string): Observable<any> {
    return this.http.get(`https://restcountries.eu/rest/v2/name/${name}`).pipe(map((d: any) => d));
  }

  getCountryUsingCode(code: string): Observable<CountryData> | undefined {
    // return this.http.get(`https://restcountries.eu/rest/v2/alpha/${code}`).pipe(first((d: any) => d));
    return this.countries?.pipe(
      map(countries => countries.find(country => country.alpha3Code == code))
    ) as Observable<CountryData> | undefined

  }

  getCountriesUsingCodes(codes: string[]): Observable<CountryData[]> | undefined {
    // return this.http.get(`https://restcountries.eu/rest/v2/alpha?codes=${codes}`).pipe(map((d: any) => d));
    return this.countries?.pipe(
      map(countries => countries.filter(country =>
        codes.find((code) => {
          return country.alpha3Code == code;
        })
      )))
  }

}
