import { Component, Directive, HostListener, Injectable, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Grocery } from 'src/Grocery';
import { GroceryService } from 'src/Grocery.service';
import { AppComponent } from '../app.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-searchsection',
  templateUrl: './searchsection.component.html',
  styleUrls: ['./searchsection.component.scss']
})
@Injectable({ providedIn: 'root' })
export class SearchsectionComponent implements OnInit {

  addForm = this.builder.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    expiredDate: ['', Validators.required],
    imageUrl: [null, Validators.required]
  })
  editForm = this.builder.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    expiredDate: ['', Validators.required]
  })

  //ARRAYS
  public searchedItems: any = []
  public allItems: any = []
  public nonAlphabeticallySearchedItems: any = []
  public nonAlphabeticallyAllItems: any = []
  public nonNumericalSearchedItems: any = []
  public nonNumericalAllItems: any = []
  listOfShoppingCart: Grocery[] = []
  //BOOLEANS
  public showFormInSearch: boolean = false
  public onEntry: boolean = true
  public isOnSearchSection: boolean = true
  message: boolean = false;
  public formController: boolean = false
  shoppingcartOpen: boolean = false
  editMode: boolean = false
  public loggedInAsAdmin: boolean = false
  save: boolean = false
  delete: boolean = false
  //NUMBERS
  public sortedAlphabetically: number = 0
  public sortedNumerically: number = 0
  totalPrice: number = 0;
  totalOfItem: number = 0
  //STRINGS
  fileString: string = ""
  admin: string = ""
  name: string = ""
  brand: string = ""
  description: string = ""
  price: string = ""
  expiredDate: string = ""
  category: string = ""


  //FA ICONS
  faTimes = faTimes
  faTrash = faTrash

  constructor(private groceryService: GroceryService, private builder: FormBuilder, private globalvar: AppComponent) { }
  //ON INITS

  ngOnInit(): void {
    this.isOnSearchSection = false
    this.admin = this.globalvar.getCookieValue("admin")
    this.checkIfUserIsAdmin()
    this.getAllItems()
  }

  //METHODS

  categoryFilter(filter: String): void {
    this.groceryService.filterGrocery(filter).subscribe(
      (response => {
        this.allItems = response
        this.searchedItems = response;
      })
    )
  }
  getFiles(event: any) {
    this.fileString = event.target.files[0].name
  }

  addNewGrocery(): void {
    delete this.addForm.value.imageUrl
    this.addForm.value.imageUrl = this.fileString
    this.addForm.value.totalOfProduct = 0
    console.log(this.addForm.value)
    this.groceryService.createGrocery(this.addForm.value).subscribe(
      (response => {
        console.log("Created a new grocery...", response)
        document.getElementById("successmessagegrocery")!.style.visibility = "visible"
        document.getElementById("successmessagegrocery")!.style.opacity = "1"
        document.getElementById("checkmark")!.style.animation = "fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both"
        document.getElementById("circleoncheckmark")!.style.animation = "stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards"
        document.getElementById("pathoncheckmark")!.style.animation = "stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards"
      })
    )

    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("name")).value = "";
      (<HTMLInputElement>document.getElementById("brand")).value = "";
      (<HTMLInputElement>document.getElementById("category")).value = "";
      (<HTMLInputElement>document.getElementById("description")).value = "";
      (<HTMLInputElement>document.getElementById("price")).value = "";
      (<HTMLInputElement>document.getElementById("expiredDate")).value = "";
    }, 2000);
    setTimeout(() => {
      this.formCloseStyling();
    }, 4000);
  }

  checkIfUserIsAdmin(): void{
    if(this.admin === "true"){
      this.loggedInAsAdmin = true
    }
  }

  receiveMessage($event: any) {
    this.message = $event
  }

  addItem(newItem: any) {
    this.searchedItems = []
    for (let iterator of newItem) {
      this.searchedItems.push(iterator)
    }
  }

  getAllItems() {
    this.groceryService.getGroceryData().subscribe(
      (response => {
        this.allItems = response
      })
    )
  }

  searchStyle() {
    document.getElementById("examplepane")!.style.visibility = "hidden"
    document.getElementById("resultpane")!.style.visibility = "visible"
    document.getElementById("resultpane")!.style.opacity = "1"
  }

  formOpenStyling() {
    this.formController = true
    document.getElementById("addformcontainer")!.style.visibility = "visible";
    document.getElementById("addForm")!.style.transform = "translateY(0)";
    document.getElementById("addForm")!.style.visibility = "visible";
    document.getElementById("addForm")!.style.opacity = "1";

  }
  formCloseStyling() {
    this.formController = false
    document.getElementById("addformcontainer")!.style.visibility = "hidden";
    document.getElementById("addForm")!.style.transform = "translateY(-5rem)";
    document.getElementById("addForm")!.style.visibility = "hidden";
    document.getElementById("addForm")!.style.opacity = "0";
    document.getElementById("successmessagegrocery")!.style.visibility = "hidden"
    document.getElementById("successmessagegrocery")!.style.opacity = "0"
    document.getElementById("checkmark")!.style.animation = "none"
    document.getElementById("circleoncheckmark")!.style.animation = "none"
    document.getElementById("pathoncheckmark")!.style.animation = "none"
  }

  reloadWindow() {
    window.location.reload()
  }

  sortByName() {
    if (this.sortedNumerically == 0) {

      if (this.sortedAlphabetically == 0) {
        console.log("sorting from A-Z")

        this.nonAlphabeticallySearchedItems = []
        this.searchedItems.forEach((element: { value: any; }) => {
          this.nonAlphabeticallySearchedItems.unshift(element)
        });
        this.searchedItems.sort(function (a: { name: String; }, b: { name: String; }) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        })

        this.nonAlphabeticallyAllItems = []
        this.allItems.forEach((element: { value: any; }) => {
          this.nonAlphabeticallyAllItems.unshift(element)
        });

        this.allItems.sort(function (a: { name: String; }, b: { name: String; }) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        })
        this.sortedAlphabetically++
        return
      }
      if (this.sortedAlphabetically == 1) {
        console.log("Sorting from Z-A")
        this.allItems.reverse()
        this.searchedItems.reverse()
        this.sortedAlphabetically++
        return
      }
      if (this.sortedAlphabetically == 2) {
        console.log("going back to non alphabetically")
        this.allItems = []
        this.nonAlphabeticallyAllItems.forEach((element: { value: any; }) => {
          this.allItems.unshift(element)
        });

        this.searchedItems = []
        this.nonAlphabeticallySearchedItems.forEach((element: { value: any; }) => {
          this.searchedItems.unshift(element)
        });
        this.sortedAlphabetically = 0;
        return
      }
    }
  }

  sortByPrice() {
    if (this.sortedAlphabetically == 0) {

      if (this.sortedNumerically == 0) {
        this.nonNumericalSearchedItems = []
        this.searchedItems.forEach((element: { value: any; }) => {
          this.nonNumericalSearchedItems.unshift(element)
        });
        this.searchedItems.sort(function (a: { price: number }, b: { price: number }) {
          return a.price - b.price
        })

        this.nonNumericalAllItems = []
        this.allItems.forEach((element: { value: any; }) => {
          this.nonNumericalAllItems.unshift(element)
        });

        this.allItems.sort(function (a: { price: number }, b: { price: number }) {
          return a.price - b.price
        })
        this.sortedNumerically++
        return
      }
      if (this.sortedNumerically == 1) {
        this.allItems.reverse()
        this.searchedItems.reverse()
        this.sortedNumerically++
        return
      }
      if (this.sortedNumerically == 2) {
        this.allItems = []
        this.nonNumericalAllItems.forEach((element: { value: any; }) => {
          this.allItems.unshift(element)
        });

        this.searchedItems = []
        this.nonNumericalSearchedItems.forEach((element: { value: any; }) => {
          this.searchedItems.unshift(element)
        });
        this.sortedNumerically = 0;
        return
      }

    }
  }

  
  toggleShoppingCart() {
    this.shoppingcartOpen = !this.shoppingcartOpen
    if (this.shoppingcartOpen) {
      document.getElementById('shoppingcart')!.style.left = "75vw"
      document.getElementById('hideShoppingCart')!.style.visibility = "visible"
      document.getElementById('hideShoppingCart')!.style.opacity = "1"
    }
    else {
      document.getElementById('shoppingcart')!.style.left = "126vw"
      document.getElementById('hideShoppingCart')!.style.visibility = "hidden"
      document.getElementById('hideShoppingCart')!.style.opacity = "0"
    }
  }

  public addToShoppingCart(grocery: Grocery) {
    grocery.totalOfProduct = 1
    this.listOfShoppingCart.push(grocery)
    this.totalPrice += grocery.price
  }

  public removeFromShoppingCart(grocery: Grocery){
    this.totalPrice -= (grocery.price * grocery.totalOfProduct)
    const removeItem = this.listOfShoppingCart.indexOf(grocery)
    grocery.totalOfProduct = 0
    this.listOfShoppingCart.splice(removeItem, 1)
    if(this.listOfShoppingCart.length === 0){
      this.totalPrice = 0
    }
  }

  isZero(grocery: Grocery){
    if(grocery.totalOfProduct > 0){
      this.totalPrice -= grocery.price
    }
    if(grocery.totalOfProduct === 0){
      grocery.totalOfProduct = 1
      this.removeFromShoppingCart(grocery)
      grocery.totalOfProduct = 0
    }
    if(this.listOfShoppingCart.length === 0){
      this.totalPrice = 0
    }
  }

  checkPrice(grocery: Grocery){
    this.totalPrice += grocery.price
  }

  openCard(value: number){
    document.getElementById("allitem-popup-" + value)!.style.visibility = "visible"
    document.getElementById("allitem-popup-" + value)!.style.opacity = "1"
  }

  closeCard(value: number){
    document.getElementById("allitem-popup-" + value)!.style.visibility = "hidden"
    document.getElementById("allitem-popup-" + value)!.style.opacity = "0"
  }

  saveChanges(value: Grocery): void{
    
    this.groceryService.updateGrocery(value).subscribe(
      ((response : Grocery) =>  {
        this.closeEditMode(value.id)
      })
    )

      //Måste skicka in nya värderna om man trckte save
      //Just nu skickar vi in dom gamla värderna
      //Samt att det är en bugg när man trycker save, då öppnar den cancel typ


  }

  deleteGrocery(value: Grocery): void{
    this.groceryService.deleteGrocery(value.id).subscribe(
      (response: any) => {
        this.afterAction(value.id)
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      })
  }

  afterAction(value: Number){
    document.getElementById("action-wrapper" + value)!.style.visibility = "hidden"
    document.getElementById("action-wrapper" + value)!.style.opacity = "0"
    document.getElementById("save" + value)!.style.display = "none"
    document.getElementById("delete" + value)!.style.display = "none"
    document.getElementById("cancel" + value)!.style.display = "none"
  }
  
  openYesOrNo(value: Number, saveordelete: Number){
    document.getElementById("action-wrapper" + value)!.style.visibility = "visible"
    document.getElementById("action-wrapper" + value)!.style.opacity = "1"
    if(saveordelete === 0){
      document.getElementById("save" + value)!.style.display = "flex"
    } else if (saveordelete === 1){
      document.getElementById("delete" + value)!.style.display = "flex"
    } else if(saveordelete === 2){
      document.getElementById("cancel" + value)!.style.display = "flex"
    }
  }

  openEditMode(value: Number){
    this.editMode = true
    this.name = document.getElementById("allitem-name-" + value)!.innerText 
    this.brand = document.getElementById("allitem-brand-" + value)!.innerText
    this.description = document.getElementById("allitem-description-" + value)!.innerText
    this.price = document.getElementById("allitem-price-" + value)!.innerText
    this.expiredDate = document.getElementById("allitem-expiredDate-" + value)!.innerText
    this.category = document.getElementById("allitem-category-" + value)!.innerText

    document.getElementById("allitem-name-" + value)!.setAttribute("contenteditable", "true")
    document.getElementById("allitem-brand-" + value)!.setAttribute("contenteditable", "true")
    document.getElementById("allitem-description-" + value)!.setAttribute("contenteditable", "true")
    document.getElementById("allitem-price-" + value)!.setAttribute("contenteditable", "true")
    document.getElementById("allitem-expiredDate-" + value)!.setAttribute("contenteditable", "true")
    document.getElementById("allitem-category-" + value)!.style.display="none"
  }

  closeEditMode(value: Number){
    this.editMode = false
    document.getElementById("allitem-name-" + value)!.setAttribute("contenteditable", "false")
    document.getElementById("allitem-brand-" + value)!.setAttribute("contenteditable", "false")
    document.getElementById("allitem-description-" + value)!.setAttribute("contenteditable", "false")
    document.getElementById("allitem-price-" + value)!.setAttribute("contenteditable", "false")
    document.getElementById("allitem-expiredDate-" + value)!.setAttribute("contenteditable", "false")
    document.getElementById("allitem-category-" + value)!.style.display="block"

  }

  resetEditedText(value: Number){
    document.getElementById("allitem-name-" + value)!.innerText = this.name;
    document.getElementById("allitem-brand-" + value)!.innerText = this.brand;
    document.getElementById("allitem-description-" + value)!.innerText = this.description;
    document.getElementById("allitem-price-" + value)!.innerText = this.price;
    document.getElementById("allitem-expiredDate-" + value)!.innerText = this.expiredDate;
  }



}
