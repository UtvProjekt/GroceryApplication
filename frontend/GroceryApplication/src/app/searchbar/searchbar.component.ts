import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  /* ICONS */
  faSearch = faSearch

  constructor() { }

  ngOnInit(): void {
  }

  positionSearchComponentUpper(){
    document.getElementById('searchbarcontainer')!.style.transform = "translate(-26vw, -35vh)"
    //document.getElementById('searchbarcontainer')!.style.flexDirection = "row"
    document.getElementById('header')!.style.outline = "0.1em solid var(--primary-text-color)"
    document.getElementById('searchpane')!.style.height = "90vh";

  }

}
