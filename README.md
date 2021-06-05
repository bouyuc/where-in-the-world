**Author:** Bou-Yu Chen

## Running a development server
1. Make sure you have NPM and the Angular CLI installed globally (https://www.npmjs.com/get-npm and https://cli.angular.io/)

2. Run `npm install` in the project root folder to install app dependencies

3. Run `ng serve` in the project root folder for a dev server

4. Open `http://localhost:4200/` in a browser

## Live Version
1. Visit `https://www.bouyuc.com/where-in-the-world/`


## Design decisions
There are 2 strategies to approach this website:
1. Get all the countries from the API and cache them in localstorage (local storage has 10mb of space and all the country data is 50kb)
    - Pros:
        1. The API will only need be called once
        2. If using a mobile device, bad reception wouldn't be an issue
    - Cons:
        1. User won't get the latest updates
        2. Takes up space in user's device
2. Call the https://restcountries.eu/ API for all actions
    - Pros:
        1. Always the newest data
    - Cons: 
        1. Increases traffic of https://restcountries.eu/

## Implemented
1. Displaying country data from https://restcountries.eu/
2. Search for a country using the input field
3. Filter the list of countries by region
4. Click on any country to see more details
5. Country borders are shown in country details and users can navigate to those countries
6. Allow user to add favorite countries
7. Page that shows the user countries that they added as favorites
8. Place holder for empty favorite page
## Not yet implemented
1. Dark mode