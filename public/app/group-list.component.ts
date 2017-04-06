import { Component, OnInit } from '@angular/core';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
  selector: 'group-list',
  template: `
    groups
    <a *ngFor="let group of groups" routerLink="/groups/{{group.slug}}">{{ group.name | lowercase }}</a>
    `,
  providers: [GroupService]
})
export class GroupListComponent implements OnInit {
  public groups: Group[];

  constructor(private service: GroupService) { }

  ngOnInit() {
    this.service.getGroups().then(groups => this.groups = groups);
  }
}
