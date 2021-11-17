import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsectionComponent } from './addsection/addsection.component';
import { ApplicationsectionComponent } from './applicationsection/applicationsection.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { SearchsectionComponent } from './searchsection/searchsection.component';
import { SigninpageComponent } from './signinpage/signinpage.component';

const routes: Routes = [
  { path: '', component: ApplicationsectionComponent },
  { path: 'search', component: SearchsectionComponent },
  { path: 'add', component: AddsectionComponent },
  { path: 'login', component: SigninpageComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: '**', component: ErrorpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
