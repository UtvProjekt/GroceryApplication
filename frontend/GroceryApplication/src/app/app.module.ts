import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ApplicationsectionComponent } from './applicationsection/applicationsection.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ResultsComponent } from './results/results.component';
import { SigninpageComponent } from './signinpage/signinpage.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { SearchsectionComponent } from './searchsection/searchsection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ApplicationsectionComponent },
  { path: 'search', component: SearchsectionComponent },
  { path: 'signin', component: SigninpageComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ApplicationsectionComponent,
    SearchbarComponent,
    ResultsComponent,
    SigninpageComponent,
    FooterComponent,
    MyaccountComponent,
    SearchsectionComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule, 
    [RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    })],

  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
