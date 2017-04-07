import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailComponent } from './group-detail.component';
import { MeComponent } from './me.component';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './not-found.component';

import { AuthService } from './auth.service';
import { GroupService } from './group.service';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupDetailComponent,
    MeComponent,
    AboutComponent,
    NotFoundComponent
  ],
  providers: [
    GroupService,
    AuthService,
    Title
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
