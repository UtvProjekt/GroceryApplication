import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ApplicationsectionComponent } from './applicationsection/applicationsection.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ResultsComponent } from './results/results.component';
import { OrganizemenuComponent } from './organizemenu/organizemenu.component';
import { ButtonComponent } from './button/button.component';
import { SigninpageComponent } from './signinpage/signinpage.component';
import { FooterComponent } from './footer/footer.component';
import { AddsectionComponent } from './addsection/addsection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ApplicationsectionComponent,
    SearchbarComponent,
    ResultsComponent,
    OrganizemenuComponent,
    ButtonComponent,
    SigninpageComponent,
    FooterComponent,
    AddsectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
