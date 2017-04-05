import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailComponent } from './group-detail.component';
import { NotFoundComponent } from './not-found.component';

import { GroupService } from './group.service';

@NgModule({
  imports:      [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupDetailComponent,
    NotFoundComponent
  ],
  providers: [
    GroupService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }