import { Component, OnInit } from '@angular/core';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
  selector: 'group-list',
  template: `
    groups
    <ul class="list">
      <li *ngFor="let group of groups" (click)="select(group)" [ngClass]="{active: selected === group}">{{ group.name }}</li>
    </ul>

    <group-detail *ngIf="selected" [group]="selected"></group-detail>
    `,
  providers: [GroupService]
})
export class GroupListComponent implements OnInit {
  public groups: Group[];
  public selected: Group;

  constructor(private service: GroupService) { }

  ngOnInit() {
    this.groups = this.service.getGroups();
  }

  select(group: Group) {
    this.selected = group;
  }
}