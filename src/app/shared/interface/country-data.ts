export interface CountryData {
    name: CountryName,
    population: string,
    capital: string,
    region: string,
    flags: CountryFlags,
    nativeName: string,
    topLevelDoamin: string[],
    currencies: Object,
    languages: Object[],
    subregion: string,
    borders: string[],
    alpha2Code: string,
    alpha3Code: string,
    cca3: string
}

export interface CountryName{
  common: string,
  nativeName: any,
  official: string
}

export interface CountryFlags{
  png: string,
  svg: string
}
