import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  template: `
    <h1>404 not found</h1>
    <p>you might have clicked a wrong link.</p>
    <a routerLink="/">back to home</a>
  `
})
export class NotFoundComponent implements OnInit {
  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('404 not found - shrgrp');
  }
 }
