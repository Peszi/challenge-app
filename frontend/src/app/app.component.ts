import {Component, OnInit } from '@angular/core';
import {Utility} from "./shared/globals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pageBackground: string;

  constructor() {}

  ngOnInit(): void {
    this.pageBackground = Utility.getPageBackground();
  }

}
