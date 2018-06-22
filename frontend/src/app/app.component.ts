import {Component, OnInit} from '@angular/core';
import {RequestService} from "./services/request.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.requestService.getHello()
      .subscribe((name: string) => { this.title = name; });
  }

}
