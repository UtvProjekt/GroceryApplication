import { Component, Directive, HostListener, Injectable, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { GroceryService } from 'src/Grocery.service';

@Component({
  selector: 'app-searchsection',
  templateUrl: './searchsection.component.html',
  styleUrls: ['./searchsection.component.scss']
})
@Injectable({providedIn:'root'})
export class SearchsectionComponent implements OnInit{

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

  //FA ICONS
  faTimes = faTimes
  
  constructor(private groceryService: GroceryService, private builder: FormBuilder) { }
  //ON INITS
  
  ngOnInit(): void {
    this.isOnSearchSection = false
    this.getAllItems()
  }

  //METHODS

  addNewGrocery(): void{
    console.log("added new grocery")
    console.log(this.addForm.value.imageUrl)
    const reader = new FileReader();
    

    let fileinput = document.getElementById("expiredDate")

    fileinput?.addEventListener('change', () => {
      const file = this.addForm.value.imageUrl[0]
    })

    reader.addEventListener('load', () => {

    })

    
    //RESPONSE MESSAGE THEN RUN CLOSE

    setTimeout(() => {
      this.formCloseStyling()
    }, 3000);
  }

  receiveMessage($event: any) {
    this.message = $event
  }

  addItem(newItem: any){
    this.searchedItems = []
    for (let iterator of newItem) {
      this.searchedItems.push(iterator)
    }
  }

  getAllItems(){
    this.groceryService.getGroceryData().subscribe(
      (response => {
        this.allItems = response
      })
    )
  }

  searchStyle(){
    document.getElementById("examplepane")!.style.visibility = "hidden"
    document.getElementById("resultpane")!.style.visibility = "visible"
    document.getElementById("resultpane")!.style.opacity = "1"
  }

  formOpenStyling(){
    this.formController = true
    document.getElementById("addformcontainer")!.style.visibility = "visible";
    document.getElementById("addForm")!.style.transform = "translateY(0)";
    document.getElementById("addForm")!.style.opacity = "1";
  }
  formCloseStyling(){
    this.formController = false
    document.getElementById("addformcontainer")!.style.visibility = "hidden";
    document.getElementById("addForm")!.style.transform = "translateY(-5rem)";
    document.getElementById("addForm")!.style.opacity = "0";
  }


}

