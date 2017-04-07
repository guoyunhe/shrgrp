import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  providers: []
})
export class AboutComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('about shrgrp: a small story behind the project');
  }
}
