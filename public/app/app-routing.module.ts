import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupListComponent }   from './group-list.component';
import { GroupDetailComponent }      from './group-detail.component';
import { MeComponent }      from './me.component';
import { AboutComponent }      from './about.component';

const routes: Routes = [
  { path: '', redirectTo: '/groups', pathMatch: 'full' },
  { path: 'groups',  component: GroupListComponent },
  { path: 'groups/:id', component: GroupDetailComponent },
  { path: 'me',  component: MeComponent },
  { path: 'about',  component: AboutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
