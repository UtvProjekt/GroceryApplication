import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { faAt, faCog, faLongArrowAltDown, faPen, faPlus, faSignInAlt, faUser, faSearch, faUserCircle, faArrowAltCircleUp, faKey, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../header/header.component';
import { MyaccountComponent } from '../myaccount/myaccount.component';
import { SettingsComponent } from '../settings/settings.component';
import { GroceryService } from 'src/Grocery.service';
import { Grocery } from 'src/Grocery';

@Component({
  selector: 'app-applicationsection',
  templateUrl: './applicationsection.component.html',
  styleUrls: ['./applicationsection.component.scss']
})
export class ApplicationsectionComponent implements OnInit {
  //ICONS
  faUser = faUser
  faPen = faPen
  faAt = faAt
  faSignInAlt = faSignInAlt
  faPlus = faPlus
  faCog = faCog
  faLongArrowAltDown = faLongArrowAltDown
  faSearch = faSearch
  faUserCircle = faUserCircle
  faArrowAltCircleUp = faArrowAltCircleUp
  faKey = faKey
  faArrowRight = faArrowRight
  //BOOLEANS
  darkOrLight: boolean = true
  settingsIsOpen: boolean = false

  public firstnameForApp: string = ""
  public loggedInApp: boolean = false
  public slideLogic: number = 1

  public lastNine: Grocery[] = []

  constructor(public globalvar: AppComponent, public headervar: HeaderComponent, public myacc: MyaccountComponent, public headercomp: HeaderComponent, public settings: SettingsComponent, public groceryService: GroceryService) { }

  ngOnInit(): void {
    this.isUserSignedIn()
    this.bindBottomArrow()
    this.getLastNineItems()

    if(this.globalvar.getCookieValue("appearance") == "light"){
      this.settings.darkLightMode()
    }
  }
  
  isUserSignedIn(){
    if(this.globalvar.getCookieValue("isUserLoggedIn") === "true"){
      this.loggedInApp = true
    }
    this.firstnameForApp = this.globalvar.getCookieValue("firstname")
  }

  bindBottomArrow(){
    window.onscroll = function(){
      if((window.innerHeight + window.scrollY) >= 1700){
        document.getElementById('scrolltotoparrow')!.style.visibility = "visible"
      } else{
        document.getElementById('scrolltotoparrow')!.style.visibility = "hidden"
      }
    }
  }

  // Math is 78vw + 1.5rem for one slide
  slideMenuLeft(){
    if(this.slideLogic == 1){
      document.getElementById("slider")!.style.transform = "translateX(calc(-78vw - 1.5rem))"
      this.slideLogic++
    } else if(this.slideLogic == 2){
      document.getElementById("slider")!.style.transform = "translateX(calc(-156vw - 3rem))"
      this.slideLogic++
    }
  }
  
  slideMenuRight(){
    if(this.slideLogic == 2){
      document.getElementById("slider")!.style.transform = "translateX(0)"
      this.slideLogic--
    } else if(this.slideLogic == 3){
      document.getElementById("slider")!.style.transform = "translateX(calc(-78vw - 1.5rem))"
      this.slideLogic--
    }
  }

  getLastNineItems(){
    this.groceryService.getGroceryData().subscribe(
      (response => {
        this.lastNine = response
        for(let i = 0; this.lastNine.length !== 9; i++){
          this.lastNine.shift()
        }
        this.lastNine.reverse()
      })
    )
  }

}
