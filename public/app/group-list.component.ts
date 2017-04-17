import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
  selector: 'group-list',
  template: `
    <a class="group" *ngFor="let group of groups"
       routerLink="/groups/{{group.slug}}"
       [style.background-image]="'url(' + group.cover + ')'">
      <div class="name">{{ group.name | lowercase }}</div>
    </a>
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
