import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GetDataService } from 'src/app/shared/services/get-data.service'
import { CountryData } from 'src/app/shared/interface/country-data'
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  countryCode: any;
  country: any;
  favorites: any;
  companyInFavorite = false;
  borders: any;

  constructor(private route: ActivatedRoute, private getDataService: GetDataService) { }

  ngOnInit(): void {
    this.favorites = window.localStorage.getItem('favorites')?.split(',') || [];
    this.route.paramMap.subscribe(paramMap => {
      this.countryCode = paramMap.get('countryCode');
      this.companyInFavorite = this.favorites.indexOf(this.countryCode) !== -1;
      this.getDataService.getCountryUsingCode(this.countryCode)?.subscribe(data => {
        console.log(data);
        this.country = data;
        console.log(this.country.borders);
        if (this.country.borders.length > 0) {
          this.getDataService.getCountriesUsingCodes(this.country.borders)?.subscribe(countries => {
            console.log(countries);
            this.borders = countries.map((countryData: CountryData) => {
              return { 'code': countryData.alpha3Code, 'name': countryData.name }
            })
          })
        }
      });
    });
  }

  addToFavorite() {
    this.favorites.push(this.countryCode)
    this.companyInFavorite = true;
    this.favorites = this.favorites.sort((a: string, b: string) => a.charCodeAt(0) - b.charCodeAt(0))
    window.localStorage.setItem('favorites', this.favorites.join(','));
  }

  removeFromFavorite() {
    let idx = this.favorites.indexOf(this.countryCode);
    this.favorites.splice(idx, 1);
    this.companyInFavorite = false;
    window.localStorage.setItem('favorites', this.favorites.join(','));
  }
}
