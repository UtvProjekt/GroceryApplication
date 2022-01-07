import { Component, Injectable, OnInit } from '@angular/core';
import { faShoppingCart, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
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

  showCart: boolean = false
  showMenu: boolean = false

  public loggedIn: boolean = false

  constructor(public myacc: MyaccountComponent) { }

  ngOnInit(): void {
    if(this.myacc.getCookieValue("isUserLoggedIn") === "true"){
      this.loggedIn = true
    }
  }

  toggleMenu(){
    this.showMenu = !this.showMenu
    if(this.showCart){
      this.showCart = false
    }
  }

  toggleShoppingCart(){
    this.showCart = !this.showCart
    if(this.showMenu){
      this.showMenu = false
    }
  }

  setShowCartFalse(){
    this.showCart = false
  }
  setShowMenuFalse(){
    this.showMenu = false
  }

}
