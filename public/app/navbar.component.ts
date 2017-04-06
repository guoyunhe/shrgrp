import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';
import { AuthService } from './auth.service';

@Component({
  selector: 'navbar',
  template: `
    <a *ngIf="me">{{ me.name }}</a>
    <a *ngIf="!me" href="/auth/facebook">login</a>
  `,
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {
  private me: Friend;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.check().then(me => this.me = me).then(me => console.log(me));
  }
}
