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

 

  toggleShoppingCart(){
    this.showCart = !this.showCart
  }

}
