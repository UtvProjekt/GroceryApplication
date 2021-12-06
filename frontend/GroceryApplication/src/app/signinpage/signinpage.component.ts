import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faEnvelope, faKey, faShoppingBasket, faSignature } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/Login.service';
import { Login } from 'src/Login';
import { Observable } from 'rxjs';
import { sha256 } from 'js-sha256';


@Component({
  selector: 'app-signinpage',
  templateUrl: './signinpage.component.html',
  styleUrls: ['./signinpage.component.scss']
})
export class SigninpageComponent implements OnInit {
  //GLOBAL
  loginorregister: boolean = true
  public users: Login[] = []
  public userToSend!: Login
  public checkIfSignedIn: number = 0;


  //FA ICONS
  faEnvelope = faEnvelope
  faKey = faKey
  faCheckCircle = faCheckCircle
  faShoppingBasket = faShoppingBasket
  faSignature = faSignature


  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    
  }

  signInToApp(form: NgForm) {
    // IF TRUE SIGN IN
  }

  checkIfPasswordsAreEqual(signIn: NgForm){

  let responseValue = ""
   this.loginService.getPasswordByEmail(signIn.value.signInEmail).subscribe(
    (response: string) => {
      responseValue = response
    }

  )
    //ändra så den kollar roll också
    if(sha256(signIn.value.signInPassword) === responseValue){
      this.checkIfSignedIn = 1
      //document.cookie = Number(this.checkIfSignedIn)
      console.log("Status: " + this.checkIfSignedIn)
    }else{
      console.log("Fel inloggning, försök igen.")
    }

  }

  registerToApp(regForm: NgForm): void {
    try {
      if (this.passwordIsNotEqual(regForm)) {
        if (!this.checkEmail(regForm.value.email)) {
          console.log("created user")
          this.addUser(regForm)
        }
        else{
          alert("That email already exists")
        }
      }
      else {
        alert("Passwords must match")
      }
    } catch (error) {
      alert(error)
    }
  }

  checkEmail(email: string): boolean{
    this.loginService.getData().subscribe(
      (response: Login[]) => {
        this.users = response
      }
    )
    for (const iterator of this.users) {
      if(iterator.email === email){
        return true;
      }
    }
    return false;
  }

  addUser(form: NgForm): void {
    delete form.value.conpassword
    form.value.password = sha256(form.value.password)
    
    this.loginService.createUser(form.value).subscribe(
      (response: Login) => {
        console.log(response)
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
