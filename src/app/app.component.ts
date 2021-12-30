import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  darkTheme = false;

  constructor(
  ) {

  }

  ngOnInit() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if(prefersDarkScheme){
      document.body.classList.toggle('dark-theme', true);
      this.darkTheme = true;
    }
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
    this.darkTheme = !this.darkTheme;
  }

}


