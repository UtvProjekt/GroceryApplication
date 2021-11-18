import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { faAt, faCog, faLongArrowAltDown, faPen, faPlus, faSignInAlt, faUser, faSearch, faUserCircle, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

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
  //BOOLEANS
  darkOrLight: boolean = true
  settingsIsOpen: boolean = false


  constructor(public globalvar: AppComponent) { }

  ngOnInit(): void {
    this.displayBottomArrow()
  }
  displayBottomArrow(){
    window.onscroll = function(){
      let element = window
      
      if((element.innerHeight + element.scrollY) >= 1600){
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
