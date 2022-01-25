import { Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faBrain, faDna, faPlus, faSearch, faShoppingCart, faSignInAlt, faSignOutAlt, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';
import { SearchsectionComponent } from '../searchsection/searchsection.component';

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
  faPlus = faPlus
  faSignOut = faSignOutAlt

  public loggedInHeader: boolean = false
  public loggedInAsAdmin: boolean = false

  @Input() viewInit: boolean = true
  @Output() messageEvent = new EventEmitter<boolean>();

  open: boolean = false
  public showForm: boolean = false

  email: string = ""
  firstname: string = ""
  lastname: string = ""
  admin: string = ""
  
  constructor(public globalvar: AppComponent, public searchcomp: SearchsectionComponent) { }

  ngOnInit(): void {
    this.email = this.globalvar.getCookieValue("email")
    this.firstname = this.globalvar.getCookieValue("firstname")
    this.lastname = this.globalvar.getCookieValue("lastname")
    this.admin = this.globalvar.getCookieValue("admin")
    this.setHeaderChangeOnScroll()
    this.checkIfUserIsLoggedIn()
    this.checkIfUserIsAdmin()
  }

  alterForm(): void{
    this.messageEvent.emit(this.showForm)
    if(this.searchcomp.formController){
      this.searchcomp.formCloseStyling()
      this.searchcomp.formController = false
    }
    else{
      this.searchcomp.formOpenStyling()
      this.searchcomp.formController = true
    }
  }

  checkIfUserIsAdmin(): void{
    if(this.admin === "true"){
      this.loggedInAsAdmin = true
    }
  }

  setHeaderChangeOnScroll(): void {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        document.getElementById("header")!.style.backgroundColor = "#111"
        document.getElementById("header")!.style.outline = ".15em solid var(--primary-color-brighter)"
      } else {
        document.getElementById("header")!.style.backgroundColor = "transparent"
        document.getElementById("header")!.style.outline = "none"
      }
    })
  }

  checkIfUserIsLoggedIn(): void {
    if (this.globalvar.getCookieValue("isUserLoggedIn") === "true") {
      this.loggedInHeader = true
    }
  }

  public toggleMenu(): void {
    if (!this.open) {
      this.openMenu()
    }
    else {
      this.closeMenu()
    }
    this.open = !this.open
  }

  openMenu() {
    document.getElementById('menu')!.style.bottom = "0"
    document.getElementById("nav-icon")!.classList.add("open")
  }

  closeMenu() {
    document.getElementById('menu')!.style.bottom = "6em"
    document.getElementById("nav-icon")!.classList.remove("open")
  }

  public signOut(): void{
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "lastname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "isUserLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.reload()
  }

}
