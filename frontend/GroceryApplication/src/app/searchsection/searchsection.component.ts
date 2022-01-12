import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchsection',
  templateUrl: './searchsection.component.html',
  styleUrls: ['./searchsection.component.scss']
})
export class SearchsectionComponent implements OnInit, AfterViewInit {

  public emittedItems: any = []
 
  public onEntry: boolean = true

  public isOnSearchSection: boolean = true
  
  constructor() { }

  ngAfterViewInit(): void {
    this.isOnSearchSection = false
  }

  ngOnInit(): void {
  }

  addItem(newItem: any){
    this.emittedItems = []
    for (let iterator of newItem) {
      this.emittedItems.push(iterator)
    }
  }

}
