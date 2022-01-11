import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchsection',
  templateUrl: './searchsection.component.html',
  styleUrls: ['./searchsection.component.scss']
})
export class SearchsectionComponent implements OnInit {

  @Input() dataValue: any
  @Input() jsonString: any
  
  constructor() { }

  ngOnInit(): void {
  }

}
