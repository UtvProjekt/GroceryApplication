import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsectionComponent } from './applicationsection/applicationsection.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { SigninpageComponent } from './signinpage/signinpage.component';

const routes: Routes = [
  { path: '', component: ApplicationsectionComponent },
  { path: 'login', component: SigninpageComponent },
  { path: 'myaccount', component: MyaccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
