import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  getHello() {
    return this.httpClient.get(environment.API + "hello", { responseType: 'text' });
  }
}
