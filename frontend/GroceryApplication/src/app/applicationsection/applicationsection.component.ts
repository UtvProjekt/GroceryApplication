import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicationsection',
  templateUrl: './applicationsection.component.html',
  styleUrls: ['./applicationsection.component.scss']
})
export class ApplicationsectionComponent implements OnInit {
  darkOrLight: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  lightMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#fff')
    document.documentElement.style.setProperty('--primary-text-color', '#0e0e0e')
    
  }
  
  darkMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#0e0e0e')
    document.documentElement.style.setProperty('--primary-text-color', '#fff')
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
