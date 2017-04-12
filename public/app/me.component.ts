import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Friend } from './friend';
import { AuthService } from './auth.service';

@Component({
  selector: 'me',
  template: `
    <div *ngIf="me">
      <h1>hi, {{ me.name | lowercase }}</h1>


      <p>
        <button (click)="logout()">logout</button>
      </p>
    </div>
  `,
  providers: [AuthService]
})
export class MeComponent implements OnInit {
  public me: Friend;

  constructor(
    private service: AuthService,
    private title: Title
  ) { }

  ngOnInit() {
    this.service.check().then(me => this.me = me);
    this.title.setTitle('me @ shrgrp');
  }

  logout() {
    this.service.logout().then(response => location.href = '/');
  }
}
