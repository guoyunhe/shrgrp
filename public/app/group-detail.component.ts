import 'rxjs/add/operator/switchMap';
import { Component, OnInit, DoCheck }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Friend } from './friend';
import { Group } from './group';
import { GroupService } from './group.service';

@Component({
  selector: 'group-detail',
  template: `
    <button (click)="goBack()">back</button>
    <div *ngIf="group">
      <h2>{{ group.name | lowercase }}</h2>
      <button type="button" (click)="join()">join</button>
      <button type="button" (click)="quit()">quit</button>
    </div>
    `,
  providers: [GroupService]
})
export class GroupDetailComponent implements OnInit, DoCheck {
  public group: Group;

  constructor(
    private service: GroupService,
    private route: ActivatedRoute,
    private location: Location,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.service.getGroup(params['id']))
      .subscribe(group => this.group = group);
  }

  ngDoCheck(): void {
    if (this.group && this.group.name) {
      this.title.setTitle(this.group.name.toLowerCase() + ' @ shrgrp');
    }
  }

  join() {
    this.service.joinGroup(this.group);
  }

  quit() {
    this.service.quitGroup(this.group);
  }

  goBack() {
    this.location.back();
  }
}
