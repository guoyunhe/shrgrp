import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupListComponent } from './group-list.component';
import { GroupDetailComponent } from './group-detail.component';
import { MeComponent } from './me.component';
import { AdminComponent } from './admin.component';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './not-found.component';

import { AuthGuard } from './auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/groups', pathMatch: 'full' },
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/:id', component: GroupDetailComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: 'me', component: MeComponent, canLoad: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canLoad: [AuthGuard] },
  { path: 'login', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
