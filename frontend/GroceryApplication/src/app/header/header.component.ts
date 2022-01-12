import { Component, Injectable, Input, OnInit } from '@angular/core';
import { faBars, faBrain, faDna, faSearch, faShoppingCart, faSignInAlt, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';
import { MyaccountComponent } from '../myaccount/myaccount.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@Injectable({ providedIn: 'root' })
export class HeaderComponent implements OnInit {

  faUserCircle = faUserCircle
  faShoppingCart = faShoppingCart
  faTimes = faTimes
  faBars = faBars
  faSearch = faSearch
  faBrain = faBrain
  faDna = faDna
  faSignIn = faSignInAlt

  public loggedInHeader: boolean = false

  @Input() viewInit: boolean = true

  open: boolean = false

  email: string = ""
  firstname: string = ""
  lastname: string = ""

  constructor(public myacc: MyaccountComponent, public globalvar: AppComponent) { }

  ngOnInit(): void {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 200){
        document.getElementById("header")!.style.backgroundColor = "var(--darkmode-darker)"
        document.getElementById("header")!.style.outline = ".15em solid var(--primary-color-brighter)"
      } else {
        document.getElementById("header")!.style.backgroundColor = "transparent"
        document.getElementById("header")!.style.outline = "none"
      }
    })


    if(this.globalvar.getCookieValue("isUserLoggedIn") === "true"){
      this.loggedInHeader = true
    }
    this.email = this.globalvar.getCookieValue("email")
    this.firstname = this.globalvar.getCookieValue("firstname")
    this.lastname = this.globalvar.getCookieValue("lastname")
  }

 
  public toggleMenu(): void{
    if(!this.open){
      this.openMenu()
    }
    else{
      this.closeMenu()
    }
    this.open = !this.open
  }

  openMenu(){
    document.getElementById('menu')!.style.bottom = "0"
    document.getElementById("nav-icon")!.classList.add("open")
  }
  
  closeMenu(){
    document.getElementById('menu')!.style.bottom = "6em"
    document.getElementById("nav-icon")!.classList.remove("open")
  }



}
