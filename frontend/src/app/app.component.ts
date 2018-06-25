import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RequestService} from "./shared/service/request.service";
import {b, e, p, s} from "@angular/core/src/render3";
import {Utility} from "./shared/globals";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";

const DISTANCE_BETWEEN = 96;
const ENTITIES_COUNT = 512;
const ENTITY_INTERVAL = 5;
const ENTITY_SPEED = 2;
const ENTITY_LENGTH = 32;

const COLLISION_DIST = 20;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  hello = 'loading..';

  pageTitle: string;
  pageBackground: string;

  challengeForm: FormGroup;

  winnersList: String[] = ['John', 'Bob', 'Will'];

  constructor(private element: ElementRef,
              private requestService: RequestService) {}

  ngOnInit(): void {
    this.pageTitle = Utility.getPageTitle();
    this.pageBackground = Utility.getPageBackground();
    this.requestService.getHello()
      .subscribe((name: string) => { this.hello = name; });

    this.challengeForm = new FormGroup({
      'name': new FormControl(null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)], this.validateEmailNotTaken.bind(this))
    });
    this.challengeForm.statusChanges.subscribe((status) => {
      console.log(status);
      // this.enableRegister = (status === 'VALID');
    });
  }

  onSubmit() {
    console.log('onSubmit');
  }

  private validateEmailNotTaken(control: AbstractControl): Promise<any>|Observable<any> {
    const emailPromise = new Promise<any>((resolve) => {
      // this.authService.getCredentialStatusRequest('email', control.value).subscribe(
      //   value => { resolve(null); },
      //   error => { resolve({'emailInUse': true}); }
      // );
      resolve();
    });
    return emailPromise;
  }
}
