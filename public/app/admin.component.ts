import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';
import { AuthService } from './auth.service';

@Component({
    selector: 'admin',
    template: `
      <h1>admin panel</h1>
      <h2>things</h2>

      <h2>groups</h2>

      <h2>friends</h2>
    `
})
export class AdminComponent {
  private me: Friend;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.check().then(me => this.me = me);
  }
}
