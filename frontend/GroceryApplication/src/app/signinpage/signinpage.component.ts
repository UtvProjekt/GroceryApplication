import { Component, Injectable, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faCheckCircle, faEnvelope, faKey, faShoppingBasket, faSignature } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/Login.service';
import { Login } from 'src/Login';
import { sha256 } from 'js-sha256';
import { MyaccountComponent } from '../myaccount/myaccount.component';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

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
  private loggedIn: boolean = false
  public email: string = ""
  public firstname: string = ""
  public lastname: string = ""

  //FA ICONS
  faEnvelope = faEnvelope
  faKey = faKey
  faCheckCircle = faCheckCircle
  faShoppingBasket = faShoppingBasket
  faSignature = faSignature

  constructor(public loginService: LoginService, private builder: FormBuilder, private router: Router, public globalvar: AppComponent) { }

  ngOnInit(): void {
    this.expiresIn30Min()
    this.expiresIn30Days()
    this.checkIfUserIsSignedIn()
  }

  checkIfUserIsSignedIn(): void {
    if (this.globalvar.getCookieValue("isUserLoggedIn") === "true") {
      this.loggedIn = true
    }
  }

  signInToApp(): void {
    this.successmessage = true
    document.getElementById("returnmessage")!.innerText = "Success. Redirecting.."
    document.getElementById("returnmessage")!.style.color = "green"
    setTimeout(() => {
      this.router.navigate(["/"])
      this.loggedIn = true
      this.successmessage = false
    }, 1500);
  }
  /**
   * @author AntonEwards
   * 
   * 
   */
  loginSystem(): void {
    let emailFromForm = this.signInForm.value.signInEmail
    let passwordFromForm = this.signInForm.value.signInPassword
    this.loginService.getData().subscribe(
      async (response:Login[]) => {
        this.login = response
        let expiresIn30Min = this.expiresIn30Min()
        let expiresIn30Days = this.expiresIn30Days()
        /**
         * 
         */
        if (!this.login.find(x => x.email === emailFromForm)) {
          this.successmessage = true
          document.getElementById("returnmessage")!.innerText = "Could not find that email."
          document.getElementById("returnmessage")!.style.color = "red"
          setTimeout(() => {
            this.successmessage = false
          }, 3000);
        }

        for (const iterator of this.login) {
          if (iterator.email === emailFromForm) {
            if (iterator.password === sha256(passwordFromForm)) {
              if (this.signInForm.value.rememberMe) {
                document.cookie = "email=" + iterator.email + ";" + expiresIn30Days + ";path=/"
                document.cookie = "firstname=" + iterator.firstname + ";" + expiresIn30Days + ";path=/"
                document.cookie = "lastname=" + iterator.lastname + ";" + expiresIn30Days + ";path=/"
                document.cookie = "isUserLoggedIn=true;" + expiresIn30Days + ";path=/"
                //OM ADMIN ÄR TRUE SKAPA ADMIN-COOKIE
                this.loginService.checkIfAdmin(iterator.email).subscribe(
                  (respons: boolean) => {
                    if (respons) {
                      document.cookie = "admin=true;" + expiresIn30Days + ";path=/"
                    }
                    else{
                      document.cookie = "admin=false;" + expiresIn30Days + ";path=/"
                    }
                  }
                )
                this.email = iterator.email
                this.firstname = iterator.firstname
                this.lastname = iterator.lastname
              }
              else {
                document.cookie = "email=" + iterator.email + ";" + expiresIn30Min + ";path=/"
                document.cookie = "firstname=" + iterator.firstname + ";" + expiresIn30Min + ";path=/"
                document.cookie = "lastname=" + iterator.lastname + ";" + expiresIn30Min + ";path=/"
                document.cookie = "isUserLoggedIn=true;" + expiresIn30Min + ";path=/"
                
                this.loginService.checkIfAdmin(iterator.email).subscribe(
                  (respon: boolean) => {
                    if (respon) {
                      document.cookie = "admin=true;" + expiresIn30Min + ";path=/"
                      console.log("sant")
                    }
                    else{
                      document.cookie = "admin=false;" + expiresIn30Min + ";path=/"
                      console.log("falskt")
                    }
                  }
                )
               
                this.email = iterator.email
                this.firstname = iterator.firstname
                this.lastname = iterator.lastname
              }
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
        }
      }
    )
  }

  public expiresIn30Min(): string {
    const d = new Date()
    d.setTime(d.getTime() + 30 * 60000)
    let expiresIn = "expires=" + d.toUTCString()
    console.log(expiresIn)
    return expiresIn
  }
  public expiresIn30Days(): string {
    const d = new Date()
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000))
    let expiresIn = "expires=" + d.toUTCString()
    console.log(expiresIn)
    return expiresIn
  }

 
  /**
   * Change alert to onscreen notification
   */
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
    document.getElementById("returnmessage")!.innerHTML = "You successfully created an account."
    document.getElementById("returnmessage")!.style.color = "green"
    this.successmessage = false
    setTimeout(() => {
      this.successmessage = true
      this.loginorregister = true
    }, 2000);

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
