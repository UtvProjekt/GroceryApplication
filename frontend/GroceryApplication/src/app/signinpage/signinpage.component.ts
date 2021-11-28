import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faEnvelope, faKey, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/Login.service';
import { Login } from 'src/Login';


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

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
   
  }

  signInToApp(form: NgForm) {
    // IF TRUE SIGN IN
  }

  registerToApp(form: NgForm) {
    try {
      if (this.passwordIsNotEqual(form)) {
        if (this.loginService.checkIfEmailExists(form.value.email)) {
          this.createUser(form)
        }
      }
      else {
        throw new Error("Error")
      }
    } catch (error) {
      alert("Passwords must match")
    }
  }

  public createUser(form: NgForm): void {
    this.loginService.createUser(form.value).subscribe(
      (response: Login) => {
        alert("Created new User")
      }
    )
  }

  passwordIsNotEqual(form: NgForm) {
    if (form.value.password !== form.value.conpassword) {
      return false;
    }
    return true;
  }

  //STYLE ETC
  changeToLogin() {
    document.getElementById('title')!.innerHTML = "Sign in here"
  }
  changeToRegister() {
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





}
