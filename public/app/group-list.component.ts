import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
  selector: 'group-list',
  template: `
    <div class="group" *ngFor="let group of groups">
      <a routerLink="/groups/{{group.slug}}" [style.background]="'url(' + group.cover + ')'">{{ group.name | lowercase }}</a>
    </div>
    `,
  providers: [GroupService]
})
export class GroupListComponent implements OnInit {
  private groups: Group[];

  constructor(
    private service: GroupService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.service.getGroups().then(groups => this.groups = groups);
    this.title.setTitle('groups @ shrgrp');
  }
}
