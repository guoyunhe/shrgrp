import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailComponent } from './group-detail.component';
import { GroupService } from './group.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupDetailComponent
  ],
  providers: [
    GroupService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }