import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryModule } from './country.module';
import { CountryComponent } from './country.component'

const routes: Routes = [
  {
    path: '',
    component: CountryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
