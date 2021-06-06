import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () =>
      import("src/app/modules/list/list.module").then((m) => m.ListModule)
  },
  { path: 'country',   redirectTo: '', pathMatch: 'full' },
  {
    path: 'favorites/', loadChildren: () =>
      import("src/app/modules/list/list.module").then((m) => m.ListModule)
  },
  {
    path: 'country/:countryCode', loadChildren: () =>
      import("src/app/modules/country/country.module").then((m) => m.CountryModule)
  },
  {
    path: 'favorites/:countryCode', loadChildren: () =>
      import("src/app/modules/country/country.module").then((m) => m.CountryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
