import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { faAt, faCog, faLongArrowAltDown, faPen, faPlus, faSignInAlt, faUser, faSearch, faUserCircle, faArrowAltCircleUp, faKey } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../header/header.component';
import { MyaccountComponent } from '../myaccount/myaccount.component';

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

  constructor(public globalvar: AppComponent, public headervar: HeaderComponent, public myacc: MyaccountComponent, public headercomp: HeaderComponent) { }

  ngOnInit(): void {
    this.isUserSignedIn()
    this.bindBottomArrow()
  }
  
  isUserSignedIn(){
    if(this.myacc.getCookieValue("isUserLoggedIn") === "true"){
      this.loggedInApp = true
    }
    this.firstnameForApp = this.myacc.getCookieValue("firstname")
  }

  bindBottomArrow(){
    window.onscroll = function(){
      if((window.innerHeight + window.scrollY) >= 1600){
        document.getElementById('scrolltotoparrow')!.style.visibility = "visible"
      } else{
        document.getElementById('scrolltotoparrow')!.style.visibility = "hidden"
      }
    }
  }
  openSettingsMenu() {
    document.getElementById('settings')!.style.visibility = "visible"
    document.getElementById('settings')!.style.opacity = "1"
    document.getElementById('coversonsettingopen')!.style.display = "block"
  }
  closeSettingsMenu() {
    document.getElementById('settings')!.style.visibility = "hidden"
    document.getElementById('settings')!.style.opacity = "0"
    document.getElementById('coversonsettingopen')!.style.display = "none"
  }

  toggleSettingsMenu() {
      this.headervar.setShowCartFalse()
      this.headervar.setShowMenuFalse()
    if (!this.settingsIsOpen) {
      this.openSettingsMenu()
    }
    else {
      this.closeSettingsMenu()
    }
    this.settingsIsOpen = !this.settingsIsOpen
  }

  darkLightMode(): void {
    if (this.darkOrLight) {
      this.globalvar.lightMode()
    }
    else {
      this.globalvar.darkMode()
    }
    this.darkOrLight = !this.darkOrLight
  }

}
