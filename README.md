**Author:** Bou-Yu Chen

## Running a development server
1. Make sure you have NPM and the Angular CLI installed globally (https://www.npmjs.com/get-npm and https://cli.angular.io/)

2. Run `npm install` in the project root folder to install app dependencies

3. Run `ng serve` in the project root folder for a dev server

4. Open `http://localhost:4200/` in a browser

## Live Version
1. Visit `https://www.bouyuc.com/where-in-the-world/`

## Implemented
1. List of countries page
    1. User can see country data from https://restcountries.eu/
    2. User can search for a country using the input field
    3. User can filter the list of countries by region
    4. User can click on any country to see more details
    5. Country data is cached in localstorage to improve performance
2. Country Details page
    1. Country borders are shown in country details and users can navigate to those countries
    2. User can add country to their favorite
3. Favorite countries page
    1. User can see countries that they added to their favorites
    2. Place holder for empty favorite page
## Not yet implemented
1. Dark mode
