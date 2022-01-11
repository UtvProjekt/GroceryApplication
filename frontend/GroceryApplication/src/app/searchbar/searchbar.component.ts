import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { GroceryService } from 'src/Grocery.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})

export class SearchbarComponent implements OnInit {
  public jsonString: any

  public arr = []


  /* ICONS */
  faSearch = faSearch

  constructor(public groceryService: GroceryService) { }

  ngOnInit(): void {
  }


  onSearch(){
    
  }

  public async searchForData(input: string): Promise<void> {
    let response = await this.groceryService.getSearchData(input)
    this.jsonString = await response.toPromise()
    this.jsonString = this.jsonString.response.docs
    /**
     * Json returnerar flera objekt, för att välja lägg array på jsonString först.
     */
    console.log(this.jsonString[0].name)
    this.arr = this.jsonString


    

    //this.resultCount = this.jsonString.length
    //Kan läggas på om vi har tid
  }

}
