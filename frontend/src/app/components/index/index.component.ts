import {Component, ElementRef, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../shared/service/request.service";
import {Observable} from "rxjs/internal/Observable";
import {Utility} from "../../shared/globals";

const DISTANCE_BETWEEN = 96;
const ENTITIES_COUNT = 512;
const ENTITY_INTERVAL = 5;
const ENTITY_SPEED = 2;
const ENTITY_LENGTH = 32;

const COLLISION_DIST = 20;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  hello = 'loading..';

  pageTitle: string;

  challengeForm: FormGroup;

  winnersList: String[] = ['John', 'Bob', 'Will'];

  constructor(private element: ElementRef,
              private requestService: RequestService) {}

  ngOnInit(): void {
    this.pageTitle = Utility.getPageTitle();
    this.requestService.getHello()
      .subscribe((name: string) => { this.hello = name; });

    this.challengeForm = new FormGroup({
      'name': new FormControl(null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)], this.validateEmailNotTaken.bind(this))
    });
  }

  onSubmit() {
    const name = this.challengeForm.get('name').value;
    this.requestService.createChallengeRequest(name);
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
