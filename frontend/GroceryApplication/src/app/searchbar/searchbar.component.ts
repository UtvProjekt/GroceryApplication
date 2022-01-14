import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { GroceryService } from 'src/Grocery.service';
import { SearchsectionComponent } from '../searchsection/searchsection.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})

export class SearchbarComponent implements OnInit {
  private jsonString: any
  @Output() newItemEvent = new EventEmitter<any>()

  /* ICONS */
  faSearch = faSearch

  constructor(public groceryService: GroceryService, public searchsec: SearchsectionComponent) { }

  ngOnInit(): void {
  }

  

  onSearch(value: any): any{
    this.searchForData(value)
    this.searchsec.onEntry = false
  }

  public async searchForData(input: string): Promise<void> {
    let response = this.groceryService.getSearchData(input)
    this.jsonString = await response.toPromise()
    this.jsonString = this.jsonString.response.docs
    this.newItemEvent.emit(this.jsonString)
  }

}
