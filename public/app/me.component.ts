import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Friend } from './friend';
import { AuthService } from './auth.service';

@Component({
  selector: 'me',
  template: `
    <div *ngIf="me">
      <header class="me-header">
        <img src="{{ me.facebookId | fbpicture }}">
        <h1 class="title">{{ me.name | lowercase }}</h1>
        <p>
          <button (click)="logout()">logout</button>
        </p>
      </header>

      <h2>groups i joined</h2>

      <div class="group-list">
        <a class="group" *ngFor="let group of me.groups"
          routerLink="/groups/{{group.slug}}"
          [style.background-image]="'url(' + group.cover + ')'">
          <div class="name">{{ group.name | lowercase }}</div>
        </a>
      </div>
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
