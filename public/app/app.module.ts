import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailComponent } from './group-detail.component';
import { MeComponent } from './me.component';
import { AdminComponent } from './admin.component';
import { ThingFormComponent } from './thing-form.component';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './not-found.component';

import { AuthService } from './auth.service';
import { GroupService } from './group.service';
import { ThingService } from './thing.service';
import { UploadService } from './upload.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgPipesModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupDetailComponent,
    MeComponent,
    AdminComponent,
    ThingFormComponent,
    AboutComponent,
    NotFoundComponent
  ],
  providers: [
    GroupService,
    AuthService,
    Title,
    ThingService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
