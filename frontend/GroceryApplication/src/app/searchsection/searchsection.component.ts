import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroceryService } from 'src/Grocery.service';

@Component({
  selector: 'app-searchsection',
  templateUrl: './searchsection.component.html',
  styleUrls: ['./searchsection.component.scss']
})
export class SearchsectionComponent implements OnInit, AfterViewInit {

  addForm = this.builder.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.email],
    description: ['', Validators.required],
    price: ['', Validators.required],
    expiredDate: ['', Validators.required]
  })

  //ARRAYS
  public searchedItems: any = []
  public allItems: any = []
  //BOOLEANS
  public showFormInSearch: boolean = false
  public onEntry: boolean = true
  public isOnSearchSection: boolean = true
  message: boolean = false;
  
  constructor(private groceryComp: GroceryService, private builder: FormBuilder) { }
  //ON INITS
  ngAfterViewInit(): void {
    this.isOnSearchSection = false
  }

  ngOnInit(): void {
    this.getAllItems()
  }

  //METHODS

  addNewGrocery(): void{

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
    this.groceryComp.getGroceryData().subscribe(
      (response => {
        this.allItems = response
      })
    )
  }

  

}

