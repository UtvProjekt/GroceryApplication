import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MyaccountComponent } from './myaccount/myaccount.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    if(this.getCookieValue("appearance") == "light"){
      this.lightMode()
    } else{
      this.darkMode()
    }
  }
  title = 'GroceryApplication';
  darkOrLight: boolean = true;

  constructor(){}
  
  lightMode(): void{
    document.documentElement.style.setProperty('--darkmode', '#eee')
    document.documentElement.style.setProperty('--primary-text-color', '#262626')
    document.documentElement.style.setProperty('--primary-color-brighter', '#570057')
    document.documentElement.style.setProperty('--darkmode-darker', '#7f7f7f8c')
    document.documentElement.style.setProperty('--box-shadow-color', '#d1d1d1')
    document.documentElement.style.setProperty('--darktowhite', '#f4f4f4')
    document.documentElement.style.setProperty('--darktopurple', '#860086')
    document.documentElement.style.setProperty('--primarytopurple', '#570057')
    this.setAppearanceCookieLight()
    
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
    this.setAppearanceCookieDark()
  }

  setAppearanceCookieLight(){
    const d = new Date()
    d.setTime(d.getTime() + (365*24*60*60*1000))
    document.cookie = "appearance=light; expires=" + d.toUTCString() + "; path=/"
  }

  setAppearanceCookieDark(){
    const d = new Date()
    d.setTime(d.getTime() + (365*24*60*60*1000))
    document.cookie = "appearance=dark; expires=" + d.toUTCString() + "; path=/"
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

  public getCookie(name: string): any{
    name = name + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(";")
    for(let i = 0; i<ca.length; i++){
      let c = ca[i]
      while(c.charAt(0) == ' '){
        c = c.substring(1)
      }
      if(c.indexOf(name) == 0){
        return c
      }
    }
    return ""
  }

  public getCookieValue(cookie: string): string{
    let tempCookie = this.getCookie(cookie)
    let array = tempCookie.split("=")
    array.shift()
    return array.toString()
  }

}
