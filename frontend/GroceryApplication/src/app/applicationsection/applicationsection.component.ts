import { Component, OnInit } from '@angular/core';
import { faAt, faUser, faPen, faSignInAlt, faPlus, faCog } from '@fortawesome/free-solid-svg-icons';

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
  //BOOLEANS
  darkOrLight: boolean = true
  settingsIsOpen: boolean = false
  

  constructor() { }

  ngOnInit(): void {
  }

  openSettingsMenu(){
    document.getElementById('settings')!.style.visibility = "visible"
    document.getElementById('settings')!.style.opacity = "1"
    document.getElementById('coversonsettingopen')!.style.display = "block"
  }
  closeSettingsMenu(){
    document.getElementById('settings')!.style.visibility = "hidden"
    document.getElementById('settings')!.style.opacity = "0"
    document.getElementById('coversonsettingopen')!.style.display = "none"
  }

  toggleSettingsMenu(){
    if(!this.settingsIsOpen){
      this.openSettingsMenu()
    }
    else{
      this.closeSettingsMenu()
    }
    this.settingsIsOpen = !this.settingsIsOpen
  }

  lightMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#fff')
    document.documentElement.style.setProperty('--primary-text-color', '#0e0e0e')
    document.documentElement.style.setProperty('--primary-color-brighter', '#570057')
    document.documentElement.style.setProperty('--darkmode-darker', '#f8f8f8')
    document.documentElement.style.setProperty('--box-shadow-color', '#d1d1d1')
  }
  
  darkMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#181818')
    document.documentElement.style.setProperty('--primary-text-color', '#fff')
    document.documentElement.style.setProperty('--primary-color-brighter', '#860086')
    document.documentElement.style.setProperty('--darkmode-darker', '#111111')
    document.documentElement.style.setProperty('--box-shadow-color', '#860086')
  }

  darkLightMode(): void{
    if(this.darkOrLight){
      this.lightMode()
    }
    else{
      this.darkMode()
    }
    this.darkOrLight = !this.darkOrLight
  }

}
