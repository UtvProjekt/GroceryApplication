import { Component, OnInit } from '@angular/core';
import { faAt, faUser, faPen, faSignInAlt, faPlus, faCog } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';

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
  

  constructor(public globalvar: AppComponent) { }

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

  darkLightMode(): void{
    if(this.darkOrLight){
      this.globalvar.lightMode()
    }
    else{
      this.globalvar.darkMode()
    }
    this.darkOrLight = !this.darkOrLight
  }

}
