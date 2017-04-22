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
    <div *ngIf="group && group.friends && me">
      <h1 class="title">{{ group.name | lowercase }}</h1>

      <div class="help">
        <p>
          <strong>how to share</strong>: click the "share" button under things you want to share
        </p>
        <p>
          <strong>how to borrow</strong>: click avatars and then contact them through facebook message
        </p>
      </div>

      <div class="thing-list-wrap">
        <div class="thing-list" [class.blur]="!isMember">
          <thing-detail *ngFor="let thing of things" [thing]="thing"
                        [friends]="group.friends"
                        [canShare]="isMember" [me]="me"></thing-detail>
        </div>
        <div class="please-join" [hidden]="isMember">
          <p>join the community, share with your neighbors</p>
          <button type="button" (click)="join()">join</button>
        </div>
      </div>

      <p>
        <span *ngIf="group.friends.length > 1">{{ group?.friends?.length }} friends have joined {{ group.name | lowercase }}</span>
        <span *ngIf="group.friends.length === 1">one friend has joined {{ group.name | lowercase }}</span>
        <button *ngIf="isMember" type="button" (click)="quit()">quit</button>
      </p>

      <div class="friends">
        <div class="friend" *ngFor="let f of group.friends">
          <a href="https://www.facebook.com/{{ f.facebookId }}" target="_blank">
            <img class="avatar" src="{{ f.facebookId | fbpicture }}"
                width="100" height="100" title="{{ f.name | lowercase }}">
          </a>
        </div>
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
