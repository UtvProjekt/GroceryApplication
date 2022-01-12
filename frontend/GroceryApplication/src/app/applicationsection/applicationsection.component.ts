import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { faAt, faCog, faLongArrowAltDown, faPen, faPlus, faSignInAlt, faUser, faSearch, faUserCircle, faArrowAltCircleUp, faKey } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../header/header.component';
import { MyaccountComponent } from '../myaccount/myaccount.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-applicationsection',
  templateUrl: './applicationsection.component.html',
  styleUrls: ['./applicationsection.component.scss']
})
export class ApplicationsectionComponent implements OnInit {
  //ICONS
  faUser = faUser
  faPen = faPen
  faAt = faAt
  faSignInAlt = faSignInAlt
  faPlus = faPlus
  faCog = faCog
  faLongArrowAltDown = faLongArrowAltDown
  faSearch = faSearch
  faUserCircle = faUserCircle
  faArrowAltCircleUp = faArrowAltCircleUp
  faKey = faKey
  //BOOLEANS
  darkOrLight: boolean = true
  settingsIsOpen: boolean = false

  public firstnameForApp: string = ""
  public loggedInApp: boolean = false

  constructor(public globalvar: AppComponent, public headervar: HeaderComponent, public myacc: MyaccountComponent, public headercomp: HeaderComponent, public settings: SettingsComponent) { }

  ngOnInit(): void {
    this.isUserSignedIn()
    this.bindBottomArrow()

    if(this.globalvar.getCookieValue("appearance") == "light"){
      this.settings.darkLightMode()
    }
  }
  
  isUserSignedIn(){
    if(this.globalvar.getCookieValue("isUserLoggedIn") === "true"){
      this.loggedInApp = true
    }
    this.firstnameForApp = this.globalvar.getCookieValue("firstname")
  }

  bindBottomArrow(){
    window.onscroll = function(){
      if((window.innerHeight + window.scrollY) >= 1700){
        document.getElementById('scrolltotoparrow')!.style.visibility = "visible"
      } else{
        document.getElementById('scrolltotoparrow')!.style.visibility = "hidden"
      }
    }
  }

}
