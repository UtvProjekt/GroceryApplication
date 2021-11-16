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
    document.documentElement.style.setProperty('--primary-color-brighter', '#570057')
    document.getElementById('header')!.style.boxShadow = '0 0 .3em .2em #d1d1d1'
    document.getElementById('header')!.style.borderBottom = 'none'
    document.getElementById('blockinbutton')!.style.transform = "translateX(2.3vw)"
    
  }
  
  darkMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#0e0e0e')
    document.documentElement.style.setProperty('--primary-text-color', '#fff')
    document.documentElement.style.setProperty('--primary-color-brighter', '#860086')
    document.getElementById('header')!.style.boxShadow = '0 0 .3em .2em #860086'
    document.getElementById('blockinbutton')!.style.transform = "translateX(0)"
    
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
