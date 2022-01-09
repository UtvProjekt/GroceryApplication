import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleUp, faAt, faCog, faKey, faLongArrowAltDown, faPen, faPlus, faSearch, faSignInAlt, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  //Fa Icons
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

  constructor(public globalvar: AppComponent, public headervar: HeaderComponent) { }

  ngOnInit(): void {
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

}
