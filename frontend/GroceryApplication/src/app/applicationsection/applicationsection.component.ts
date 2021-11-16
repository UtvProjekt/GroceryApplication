import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicationsection',
  templateUrl: './applicationsection.component.html',
  styleUrls: ['./applicationsection.component.scss']
})
export class ApplicationsectionComponent implements OnInit {
  darkOrLight: boolean = true
  settings: boolean = false
  

  constructor() { }

  ngOnInit(): void {
  }

  openSettings(){
    document.getElementById('settings')!.style.visibility = "visible"
    document.getElementById('settings')!.style.opacity = "1"
    document.getElementById('coversonsettingopen')!.style.display = "block"
  }
  closeSettings(){
    document.getElementById('settings')!.style.visibility = "hidden"
    document.getElementById('settings')!.style.opacity = "0"
    document.getElementById('coversonsettingopen')!.style.display = "none"
  }

  toggleSettingsMenu(){
    if(!this.settings){
      this.openSettings()
    }
    else{
      this.closeSettings()
    }
    this.settings = !this.settings
  }

  lightMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#fff')
    document.documentElement.style.setProperty('--primary-text-color', '#0e0e0e')
    document.documentElement.style.setProperty('--primary-color-brighter', '#570057')
    document.documentElement.style.setProperty('--darkmode-darker', '#fff')
    document.documentElement.style.setProperty('--box-shadow-color', '#d1d1d1')
    document.getElementById('header')!.style.backgroundColor = '#fff'
    
  }
  
  darkMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#181818')
    document.documentElement.style.setProperty('--primary-text-color', '#fff')
    document.documentElement.style.setProperty('--primary-color-brighter', '#860086')
    document.documentElement.style.setProperty('--darkmode-darker', '#111111')
    document.documentElement.style.setProperty('--box-shadow-color', '#860086')
    document.getElementById('header')!.style.backgroundColor = '#111111'
    
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
