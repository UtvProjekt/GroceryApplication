import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faUserCircle = faUserCircle
  faShoppingCart = faShoppingCart
  faTimes = faTimes

  showCart: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  cart1(){
    document.getElementById('shoppingcart')!.style.visibility = "visible"
  }

  cart2(){
    document.getElementById('shoppingcart')!.style.visibility = "hidden"
  }

  toggleShoppingCart(){
    if(!this.showCart){
      this.cart1()
    }
    else{
      this.cart2()
    }
    this.showCart = !this.showCart
  }

}
