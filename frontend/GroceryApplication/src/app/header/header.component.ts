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

  public loggedInHeader: boolean = false

  open: boolean = false

  email: string = ""

  constructor(public myacc: MyaccountComponent) { }

  ngOnInit(): void {
    if(this.myacc.getCookieValue("isUserLoggedIn") === "true"){
      this.loggedInHeader = true
    }
    this.email = this.myacc.getCookieValue("email")
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
  }

  closeMenu(){
    document.getElementById('menu')!.style.bottom = "6em"
  }


}
