import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
@Injectable({ providedIn: 'root' })
export class MyaccountComponent implements OnInit {
  //Fa Icons
  faSignOut = faSignOutAlt


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.email = this.getCookieValue("email")
    this.firstname = this.getCookieValue("firstname")
    this.lastname = this.getCookieValue("lastname")
  }
  
  @Input() email: string = ""
  @Input() firstname: string = ""
  @Input() lastname: string = ""


  public signOut(): void{
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "lastname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "isUserLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    this.router.navigate(["/"])
  }


  /**
   * Cookie handlers
   */
  
  public getCookies(): void{
    this.email = this.getCookieValue("email")
    this.firstname = this.getCookieValue("firstname")
    this.lastname = this.getCookieValue("lastname")
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
    console.log("Cookie: " + array)
    array.shift()
    return array.toString()
  }

}
