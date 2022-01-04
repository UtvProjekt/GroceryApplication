import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faEnvelope, faKey, faShoppingBasket, faSignature } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  public responseValue: string = ""
  


  //FA ICONS
  faEnvelope = faEnvelope
  faKey = faKey
  faCheckCircle = faCheckCircle
  faShoppingBasket = faShoppingBasket
  faSignature = faSignature


  constructor(public loginService: LoginService, private builder: FormBuilder) { }

  ngOnInit(): void {
      
  }

  signInToApp(form: NgForm) {
    // IF TRUE SIGN IN
  }

  checkIfPasswordsAreEqual(){
   this.loginService.getPasswordByEmail(this.signInForm.value.signInEmail).subscribe(
    (response: string) => {
      this.responseValue = response
      //BUGG, SÄTTER SIG INTE LIKA MED STRINGEN FRÅN DATABASEN
      console.log(this.responseValue)
    })
    //ändra så den kollar roll också
    if(sha256(this.signInForm.value.signInPassword) === this.responseValue){
      this.checkIfSignedIn = 1
      //document.cookie = Number(this.checkIfSignedIn)
      console.log("Status: " + this.checkIfSignedIn)
    }else{
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

  addUser(): void {
    delete this.registerForm.value.conpassword
    
    this.registerForm.value.password = sha256(this.registerForm.value.password)
    
    this.loginService.createUser(this.registerForm.value).subscribe(
      (response: Login) => {
        console.log(response)
      }
    )
  }

  passwordIsNotEqual() {
    if (this.registerForm.value.password !== this.registerForm.value.conpassword) {
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
