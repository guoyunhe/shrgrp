import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailComponent } from './group-detail.component';
import { NotFoundComponent } from './not-found.component';

import { AuthService } from './auth.service';
import { GroupService } from './group.service';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    GroupListComponent,
    GroupDetailComponent,
    NotFoundComponent
  ],
  providers: [
    GroupService,
    AuthService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
