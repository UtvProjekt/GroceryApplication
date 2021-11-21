import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GroceryApplication';
  darkOrLight: boolean = true;
 
  lightMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#eee')
    document.documentElement.style.setProperty('--primary-text-color', '#161616')
    document.documentElement.style.setProperty('--primary-color-brighter', '#570057')
    document.documentElement.style.setProperty('--darkmode-darker', '#b2b2b2')
    document.documentElement.style.setProperty('--box-shadow-color', '#d1d1d1')
    document.documentElement.style.setProperty('--darktowhite', '#f4f4f4')
    document.documentElement.style.setProperty('--darktopurple', '#860086')
    document.documentElement.style.setProperty('--primarytopurple', '#570057')
  }
  
  darkMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#181818')
    document.documentElement.style.setProperty('--primary-text-color', '#fff')
    document.documentElement.style.setProperty('--primary-color-brighter', '#860086')
    document.documentElement.style.setProperty('--darkmode-darker', '#111111')
    document.documentElement.style.setProperty('--box-shadow-color', '#860086')
    document.documentElement.style.setProperty('--darktowhite', '#111111')
    document.documentElement.style.setProperty('--darktopurple', '#111111')
    document.documentElement.style.setProperty('--primarytopurple', '#fff')
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
