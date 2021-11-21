import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faEnvelope, faKey, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-signinpage',
  templateUrl: './signinpage.component.html',
  styleUrls: ['./signinpage.component.scss']
})
export class SigninpageComponent implements OnInit {
  //GLOBAL
  loginorregister: boolean = true


  //FA ICONS
  faEnvelope = faEnvelope
  faKey = faKey
  faCheckCircle = faCheckCircle
  faShoppingBasket = faShoppingBasket
  
  constructor() { }

  ngOnInit(): void {
   
  }
  
  changeToLogin(){
    document.getElementById('title')!.innerHTML = "Sign in here"
  }
  changeToRegister(){
    document.getElementById('title')!.innerHTML = "Register here"
  }

  changeTitle() {
    if (!this.loginorregister) {
      this.changeToLogin()
    }
    else {
      this.changeToRegister()
    }
    this.loginorregister = !this.loginorregister
  }
  changePasswordVisibility() {

  }


}
