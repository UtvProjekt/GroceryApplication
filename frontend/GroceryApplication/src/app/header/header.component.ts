import { Component, Injectable, OnInit } from '@angular/core';
import { faShoppingCart, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
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
