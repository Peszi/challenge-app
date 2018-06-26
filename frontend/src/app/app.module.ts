import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { RequestService } from "./shared/service/request.service";
import { MovingBackgroundDirective } from './shared/directive/moving-background.directive';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from './components/index/index.component';
import { EditComponent } from './components/edit/edit.component';
import { ChallengeComponent } from './components/challenge/challenge.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: IndexComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'view/:id', component: ChallengeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MovingBackgroundDirective,
    IndexComponent,
    EditComponent,
    ChallengeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
