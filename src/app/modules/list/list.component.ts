import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/shared/services/get-data.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CountryData } from 'src/app/shared/interface/country-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  private subjectKeyUp = new Subject<any>();
  actAsFavorites = false;
  countries: Observable<CountryData[]> | undefined;
  region: string = '';
  selectedRegion: HTMLElement | undefined;

  constructor(private getDataService: GetDataService) {}

  ngOnInit(): void {
    this.actAsFavorites = window.location.pathname.includes('/favorites')
      ? true
      : false;
    if (this.actAsFavorites) {
      this.getFavorites();
    } else {
      this.countries = this.getDataService.getAllCountries();
    }

    this.subjectKeyUp
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm.length !== 0) {
          this.countries = this.getDataService.getCountryFromQuery(searchTerm);
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
    Array.from(document.getElementsByClassName('dropdown-item')).forEach(
      (element) => {
        element.classList.remove('active');
      }
    );
    if (this.region !== region) {
      document.getElementById(`region-${region}`)?.classList.add('active');
      this.region = region;
    } else {
      this.region = '';
    }
  }

  getFavorites() {
    let favorites = window.localStorage.getItem('favorites');
    if (favorites) {
      this.countries = this.getDataService.getCountriesUsingCodes(
        favorites.split(',')
      );
    }
  }
}
