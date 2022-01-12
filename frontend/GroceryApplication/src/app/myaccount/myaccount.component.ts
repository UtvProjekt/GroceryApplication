import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
@Injectable({ providedIn: 'root' })
export class MyaccountComponent implements OnInit {
  //Fa Icons
  faSignOut = faSignOutAlt


  constructor(private router: Router, public globalvar: AppComponent) { }

  ngOnInit(): void {
    this.getCookies()
  }
  
  public email: string = ""
  public firstname: string = ""
  public lastname: string = ""

  public signOut(): void{
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "lastname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "isUserLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    this.router.navigate(["/"])
  }

  public getCookies(): void{
    this.email = this.globalvar.getCookieValue("email")
    this.firstname = this.globalvar.getCookieValue("firstname")
    this.lastname = this.globalvar.getCookieValue("lastname")
  }

}
