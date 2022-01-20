import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() dataValue: any

  constructor(public headerComp: HeaderComponent) { }

  ngOnInit(): void {
  }

}
