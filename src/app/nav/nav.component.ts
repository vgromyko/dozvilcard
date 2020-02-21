
import { Component, OnInit , ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  public title = "Dozvil v.1";


  public navData = [
      {"name": "Card", "url":"/card"},
      {"name": "Profile", "url":"/profile"},
      {"name": "Visitors", "url":"/visitors"}
    ];
   

  ngOnInit(): void {
  }

}
