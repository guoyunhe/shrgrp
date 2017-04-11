import 'rxjs/add/operator/switchMap';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Friend } from './friend';
import { Group } from './group';
import { Thing } from "./thing";
import { GroupService } from './group.service';
import { ThingService } from "./thing.service";
import { AuthService } from "./auth.service";

@Component({
  selector: 'group-detail',
  template: `
    <button (click)="goBack()">back</button>

    <div *ngIf="group && group.friends && me">
      <h2>{{ group.name | lowercase }} (espoo)</h2>
      <p>
        {{ group?.friends?.length || 0 }} friends are sharing
        <button *ngIf="!isMember" type="button" (click)="join()">join</button>
        <button *ngIf="isMember" type="button" (click)="quit()">quit</button>
      </p>
      <div class="thing-list">
        <thing-detail *ngFor="let thing of things" [thing]="thing"
                      [friends]="group.friends"
                      [canShare]="isMember" [me]="me"></thing-detail>
      </div>
    </div>
  `,
  providers: [GroupService, ThingService, AuthService]
})
export class GroupDetailComponent implements OnInit, DoCheck {
  private group: Group;
  private things: Thing[];
  private me: Friend;
  private isMember: boolean = false;

  constructor(
    private groupService: GroupService,
    private thingService: ThingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.groupService.getGroup(params['id']))
      .subscribe(group => this.group = group);
    this.thingService.getThings().then(things => this.things = things);
    this.authService.check().then(me => this.me = me);
  }

  ngDoCheck(): void {
    if (this.group) {
      this.title.setTitle(this.group.name.toLowerCase() + ' @ shrgrp');
    }
    this.checkMember();
  }

  join() {
    this.groupService.joinGroup(this.group);
    this.group.friends.push(this.me);
  }

  quit() {
    this.groupService.quitGroup(this.group);
    this.group.friends = this.group.friends.filter(friend => friend._id !== this.me._id);
  }

  checkMember() {
    if (this.me && this.group && this.group.friends) {
      var matched = this.group.friends.findIndex(friend => {
        return friend._id === this.me._id;
      });
      this.isMember = matched > -1;
    }
  }

  goBack() {
    this.location.back();
  }
}
