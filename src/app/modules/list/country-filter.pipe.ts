import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first, filter } from 'rxjs/operators';
import { CountryData } from 'src/app/shared/interface/country-data'

@Pipe({
  name: 'countryFilter'
})

export class CountryFilterPipe implements PipeTransform {

  transform(countries: Observable<CountryData[]> | undefined, region: string): Observable<CountryData[]> | undefined {
    if (countries && region !== '') {
      return countries?.pipe(
        map(countries => countries.filter(country => country.region == region))
      );
    } else {
      return countries;
    }
  }
}
