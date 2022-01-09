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
import { AddsectionComponent } from './addsection/addsection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { SearchsectionComponent } from './searchsection/searchsection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ApplicationsectionComponent,
    SearchbarComponent,
    ResultsComponent,
    SigninpageComponent,
    FooterComponent,
    AddsectionComponent,
    MyaccountComponent,
    SearchsectionComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
