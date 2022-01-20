import { Component, Directive, HostListener, Injectable, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { GroceryService } from 'src/Grocery.service';

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

  //ARRAYS
  public searchedItems: any = []
  public allItems: any = []
  //BOOLEANS
  public showFormInSearch: boolean = false
  public onEntry: boolean = true
  public isOnSearchSection: boolean = true
  message: boolean = false;
  public formController: boolean = false
  fileString: string = ""
  //FA ICONS
  faTimes = faTimes

  constructor(private groceryService: GroceryService, private builder: FormBuilder) { }
  //ON INITS

  ngOnInit(): void {
    this.isOnSearchSection = false
    this.getAllItems()
  }

  //METHODS

  categoryFilter(filter: String): void {
    console.log(filter)
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
    this.groceryService.createGrocery(this.addForm.value).subscribe(
      (response => {
        document.getElementById("successmessagegrocery")!.style.visibility = "visible"
        document.getElementById("successmessagegrocery")!.style.opacity = "1"
        document.getElementById("checkmark")!.style.animation = "fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both"
        document.getElementById("circleoncheckmark")!.style.animation = "stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards"
        document.getElementById("pathoncheckmark")!.style.animation = "stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards"
      })
    )


    //RESPONSE MESSAGE THEN RUN CLOSE

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


}
