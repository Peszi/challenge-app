import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class RequestService {

  private challenge: ChallengeModel;

  constructor(private httpClient: HttpClient) { }

  getHello() {
    return this.httpClient.get(environment.API + "hello", { responseType: 'text' });
  }

  createChallengeRequest(name: string) {
    this.httpClient.post<ChallengeModel>(environment.API + "challenge/" + name, null)
      .subscribe((challenge: ChallengeModel) => {
        this.challenge = challenge;
        console.log(this.challenge);
      });
  }

}

export interface ChallengeModel {
  name: string;
}
