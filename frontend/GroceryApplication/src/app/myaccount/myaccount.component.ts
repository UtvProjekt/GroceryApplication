import { Component, Injectable, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
@Injectable({ providedIn: 'root' })
export class MyaccountComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.email = this.getCookieValue("email")
    this.firstname = this.getCookieValue("firstname")
    this.lastname = this.getCookieValue("lastname")
  }
  
  @Input() email: string = ""
  @Input() firstname: string = ""
  @Input() lastname: string = ""
  
  getCookies(): void{
    this.email = this.getCookieValue("email")
    this.firstname = this.getCookieValue("firstname")
    this.lastname = this.getCookieValue("lastname")
  }

  public getCookie(name: string){
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
    console.log("Cookie: " + array)
    array.shift()
    return array.toString()
  }

}
