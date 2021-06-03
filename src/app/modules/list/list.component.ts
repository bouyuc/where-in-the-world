import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/shared/services/get-data.service'
import { HttpClient } from '@angular/common/http';
import { from, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";

export interface CountryData {
  name?: string,
  population?: string,
  capital?: string,
  region?: string,
  flag?: string,
  nativeName?: string,
  topLevelDoamin?: string[],
  currencies?: Object[],
  languages?: Object[],
  subregion?: string,
  borders?: string,
  alpha2Code?: string
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private subjectKeyUp = new Subject<any>();
  actAsFavorites = false;
  title = 'whereInTheWorld';
  countries: any;

  constructor(
    private getDataService: GetDataService
  ) { }

  ngOnInit(): void {
    this.actAsFavorites = window.location.pathname.includes('/favorites') ? true : false;
    if(this.actAsFavorites){
      this.getFavorites();
    }else{
      this.countries = this.getDataService.getAllCountries();
    }
    
    this.subjectKeyUp
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm.length !== 0) {
          this.countries = this.getDataService.getCountry(searchTerm);
        } else {
          this.countries = this.getDataService.getAllCountries();
        }
      });
  }

  onSearch(ev: any) {
    const value = ev.target.value;
    this.subjectKeyUp.next(value);
  }

  regionFilter(region: string) {
    this.countries = this.getDataService.getCountriesFromRegion(region);
  }

  getFavorites(){
    let favorites = window.localStorage.getItem('favorites');
    if(favorites){
      this.countries = this.getDataService.getCountriesUsingCodes(favorites.split(',').join(';'));
    }
  }
}
