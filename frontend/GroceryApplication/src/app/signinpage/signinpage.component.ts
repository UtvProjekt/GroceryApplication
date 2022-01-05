import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faEnvelope, faKey, faShoppingBasket, faSignature } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginService } from 'src/Login.service';
import { Login } from 'src/Login';
import { Observable } from 'rxjs';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { myVariables } from 'src/Variables';


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
  })

  registerForm = this.builder.group({
    firstname: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
    conpassword: ['', Validators.required]
  })

  //GLOBAL
  loginorregister: boolean = true
  public users: Login[] = []
  public userToSend!: Login
  public checkIfSignedIn: number = 0;
  private responseValue: string = ""
  public login: Login[] = []
  public successmessage: boolean = false



  //FA ICONS
  faEnvelope = faEnvelope
  faKey = faKey
  faCheckCircle = faCheckCircle
  faShoppingBasket = faShoppingBasket
  faSignature = faSignature


  constructor(public loginService: LoginService, private builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginSystem()
  }

  signInToApp(): void {
    this.successmessage = true
    myVariables.isLoggedIn === true
    setTimeout(() => {
      this.successmessage = false
      this.router.navigate(["/myaccount"])
    }, 2000);
  }

  loginSystem(): void {
    let emailFromForm = this.signInForm.value.signInEmail
    let passwordFromForm = this.signInForm.value.signInPassword
    this.loginService.getData().subscribe(
      (response: Login[]) => {
        this.login = response
        for (const iterator of this.login) {
          if (iterator.email === emailFromForm) {
            if (iterator.password === sha256(passwordFromForm)) {
              this.signInToApp()
            }
          }
        }
      }
    )
  }

  checkIfPasswordsAreEqual(): void {
    this.loginService.getPasswordByEmail(this.signInForm.value.signInEmail).subscribe(
      (response: string) => {
        this.responseValue = response
        //BUGG, SÄTTER SIG INTE LIKA MED STRINGEN FRÅN DATABASEN
      })
    //ändra så den kollar roll också
    if (sha256(this.signInForm.value.signInPassword) === this.responseValue) {
      this.checkIfSignedIn = 1
      //document.cookie = Number(this.checkIfSignedIn)
      console.log("Status: " + this.checkIfSignedIn)
    } else {
      console.log("Fel inloggning, försök igen.")
      console.log(this.responseValue)
    }

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
