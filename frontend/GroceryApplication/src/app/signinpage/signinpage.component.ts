import { Component, Injectable, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faCheckCircle, faEnvelope, faKey, faShoppingBasket, faSignature } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/Login.service';
import { Login } from 'src/Login';
import { sha256 } from 'js-sha256';
import { MyaccountComponent } from '../myaccount/myaccount.component';

@Component({
  selector: 'app-signinpage',
  templateUrl: './signinpage.component.html',
  styleUrls: ['./signinpage.component.scss']
})
export class SigninpageComponent implements OnInit {

  //FORM CONTROLS
  signInForm = this.builder.group({
    signInEmail: ['', Validators.email],
    signInPassword: ['', Validators.required],
    rememberMe: []
  })

  registerForm = this.builder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
    conpassword: ['', Validators.required]
  })

  //GLOBAL
  loginorregister: boolean = true
  public users: Login[] = []
  public userToSend!: Login
  public checkIfSignedIn: number = 0;
  public login: Login[] = []
  public successmessage: boolean = false

  //Personal Info
  public loggedIn: boolean = false
  public email: string = ""
  public firstname: string = ""
  public lastname: string = ""

  //FA ICONS
  faEnvelope = faEnvelope
  faKey = faKey
  faCheckCircle = faCheckCircle
  faShoppingBasket = faShoppingBasket
  faSignature = faSignature

  constructor(public loginService: LoginService, private builder: FormBuilder, private myacc: MyaccountComponent) { }

  ngOnInit(): void {
    this.checkIfUserIsSignedIn()
  }

  checkIfUserIsSignedIn(): void {
    if (this.myacc.getCookieValue("isUserLoggedIn") === "true") {
      this.loggedIn = true
    }
  }

  signInToApp(): void {
    this.successmessage = true
    document.getElementById("returnmessage")!.innerText = "Success. Redirecting.."
    document.getElementById("returnmessage")!.style.color = "green"
    setTimeout(() => {
      this.loggedIn = true
      this.successmessage = false
    }, 2000);
  }

  loginSystem(): void {
    let emailFromForm = this.signInForm.value.signInEmail
    let passwordFromForm = this.signInForm.value.signInPassword
    this.loginService.getData().subscribe(
      (response: Login[]) => {
        this.login = response
        const d = new Date()
        d.setTime(d.getTime() + 30 * 60000)
        let expiresIn = "expires=" + d.toLocaleString()
        for (const iterator of this.login) {
          if (iterator.email === emailFromForm) {
            if (this.signInForm.value.rememberMe) {
              document.cookie = "email=" + iterator.email
              document.cookie = "firstname=" + iterator.firstname
              document.cookie = "lastname=" + iterator.lastname
              document.cookie = "isUserLoggedIn=true"
              this.email = iterator.email
              this.firstname = iterator.firstname
              this.lastname = iterator.lastname
            }
            else {
              document.cookie = "email=" + iterator.email + ";" + expiresIn + "Thu, 18 Dec 2013 12:00:00 UTC;path=/"
              document.cookie = "firstname=" + iterator.firstname + ";" + expiresIn + "Thu, 18 Dec 2013 12:00:00 UTC;path=/"
              document.cookie = "lastname=" + iterator.lastname + ";" + expiresIn + "Thu, 18 Dec 2013 12:00:00 UTC;path=/"
              this.email = iterator.email
              this.firstname = iterator.firstname
              this.lastname = iterator.lastname
            }
            if (iterator.password === sha256(passwordFromForm)) {
              this.signInToApp()
            }
            else {
              document.getElementById("returnmessage")!.innerText = "Wrong password"
              document.getElementById("returnmessage")!.style.color = "red"
              this.successmessage = true
              setTimeout(() => {
                this.successmessage = false
              }, 3000);
            }
          }
          if (!this.login.find(x => x.email === emailFromForm)) {
            this.successmessage = true
            document.getElementById("returnmessage")!.innerText = "Could not find that email."
            document.getElementById("returnmessage")!.style.color = "red"
            setTimeout(() => {
              this.successmessage = false
            }, 3000);
          }
        }
      }
    )
  }

  registerToApp(): void {
    try {
      if (this.passwordIsNotEqual()) {
        if (!this.checkEmail(this.registerForm.value.email)) {
          this.addUser()
        }
        else {
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

  checkEmail(email: string): boolean {
    this.loginService.getData().subscribe(
      (response: Login[]) => {
        this.users = response
      }
    )
    for (const iterator of this.users) {
      if (iterator.email === email) {
        return true;
      }
    }
    return false;
  }

  addUser(): void {
    delete this.registerForm.value.conpassword
    this.registerForm.value.password = sha256(this.registerForm.value.password)

    this.loginService.createUser(this.registerForm.value).subscribe(
      (response: Login) => {
        console.log(response)
      }
    )
  }

  passwordIsNotEqual(): boolean {
    if (this.registerForm.value.password !== this.registerForm.value.conpassword) {
      return false;
    }
    return true;
  }

  //STYLE ETC
  changeToLogin(): void {
    document.getElementById('title')!.innerHTML = "Sign in here"
  }
  changeToRegister(): void {
    document.getElementById('title')!.innerHTML = "Register here"
  }

  changeTitle(): void {
    if (!this.loginorregister) {
      this.changeToLogin()
    }
    else {
      this.changeToRegister()
    }
    this.loginorregister = !this.loginorregister
  }





}
