import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from "@angular/router";

import { Friend } from './friend';
import { AuthService } from './auth.service';


@Component({
  selector: 'login',
  template: `
    <button (click)="login()">login with facebook</button>
  `,
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('login - shrgrp');
    this.route.queryParams.subscribe((params: Params) => {
        this.auth.redirectUrl = params['redirect'];
      });
  }

  login() {
    location.href = this.auth.loginUrl;
  }
}
