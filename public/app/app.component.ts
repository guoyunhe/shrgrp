import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';
import { AuthService } from './auth.service';

@Component({
    selector: 'app',
    template: `
      <nav id="navbar">
        <a routerLink="/groups" routerLinkActive="active">groups</a>
        <a routerLink="/friends" routerLinkActive="active">friends</a>
        <a *ngIf="me">{{ me.name | lowercase }}</a>
        <a *ngIf="!me" href="/auth/facebook">login</a>
      </nav>
      <router-outlet></router-outlet>
    `
})
export class AppComponent {
  private me: Friend;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.check().then(me => this.me = me);
  }
}
