import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailComponent } from './group-detail.component';
import { ThingDetailComponent } from './thing-detail.component';
import { MeComponent } from './me.component';
import { AdminComponent } from './admin.component';
import { ThingFormComponent } from './thing-form.component';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './not-found.component';

import { AuthService } from './auth.service';
import { GroupService } from './group.service';
import { ThingService } from './thing.service';
import { UploadService } from './upload.service';
import { FacebookPipesModule } from "./facebook-pipes.module";
import { FriendListComponent } from "./friend-list.component";

import { AuthGuard } from './auth.guard.service';
import { LoginComponent } from "./login.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgPipesModule,
    AppRoutingModule,
    FacebookPipesModule
  ],
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupDetailComponent,
    MeComponent,
    AdminComponent,
    ThingDetailComponent,
    ThingFormComponent,
    FriendListComponent,
    LoginComponent,
    AboutComponent,
    NotFoundComponent
  ],
  providers: [
    GroupService,
    AuthService,
    Title,
    ThingService,
    UploadService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
