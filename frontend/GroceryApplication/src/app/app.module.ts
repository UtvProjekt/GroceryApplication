import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';         
//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ApplicationsectionComponent } from './applicationsection/applicationsection.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SigninpageComponent } from './signinpage/signinpage.component';
import { FooterComponent } from './footer/footer.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { SearchsectionComponent } from './searchsection/searchsection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ApplicationsectionComponent,
    SearchbarComponent,
    SigninpageComponent,
    FooterComponent,
    MyaccountComponent,
    SearchsectionComponent,
    SettingsComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
