import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';
import { Group } from './group';
import { Thing } from './thing';
import { AuthService } from './auth.service';
import { ThingService } from './thing.service';
import { GroupService } from "./group.service";

@Component({
  selector: 'admin',
  template: `
    <h1>admin panel</h1>

    <h2>things</h2>

    <p *ngFor="let thing of things" [hidden]="!thing._id">
      <img width="50" height="50" [src]="thing.icon || '/images/ph-icon.svg'">
      {{ thing.name | lowercase }}
      <button (click)="editThing(thing)">edit</button>
      <button (click)="deleteThing(thing)">delete</button>
    </p>

    <button (click)="createThing()">new</button>

    <thing-form [thing]="thing" [open]="thingFormOpen"></thing-form>

    <h2>groups</h2>

    <form>
      <input type="text" name="url" [(ngModel)]="newGroupFacebookUrl" placeholder="facebook group url">
      <button (click)="createGroup()">new</button>
    </form>

    <div *ngFor="let group of groups">
      {{ group.name | lowercase }}
      <button (click)="editGroup(group)">edit</button>
      <button (click)="deleteGroup(group)">delete</button>
      <br>
      <a *ngFor="let friend of group.friends" href="http://www.facebook.com/{{ friend.facebookId }}">{{ friend }}</a>
    </div>

    <group-form [group]="group" [open]="groupFormOpen"></group-form>
  `
})
export class AdminComponent {
  private me: Friend;

  private thing: Thing; // selected thing for edit or create new
  private things: Thing[];
  private thingFormOpen: number = 0;

  private group: Group;
  private groups: Group[];
  private newGroupFacebookUrl: string;
  private groupFormOpen: boolean = false;

  constructor(
    private auth: AuthService,
    private thingService: ThingService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.auth.check().then(me => this.me = me);
    this.thingService.getThings().then(things => this.things = things);
    this.groupService.getGroups().then(groups => this.groups = groups);
  }

  createThing() {
    if (this.things) {
      var lastThing = this.things[this.things.length-1];
    }

    if (!lastThing || lastThing._id) {
      // if no last thing, or last thing have been saved
      this.thing = new Thing();
      this.things.push(this.thing);
    } else {
      // if last thing haven't been saved
      this.thing = lastThing;
    }

    this.thingFormOpen = Date.now();
  }

  editThing(thing: Thing) {
    this.thing = thing;
    this.thingFormOpen = Date.now();
  }

  deleteThing(thing: Thing) {
    if (thing._id) {
      this.thingService.deleteThing(thing).then(thing => {
        this.things = this.things.filter(function (e) { return e !== thing});
        thing = null; // if it is referenced, set all of them to null
      });
    } else {
      this.things = this.things.filter(function (e) { return e !== thing});
      thing = null; // if it is referenced, set all of them to null
    }
  }

  createGroup() {
    this.groupService.createGroupFromFacebookUrl(this.newGroupFacebookUrl)
        .then(group => {
          this.groups.push(group);
          this.newGroupFacebookUrl = null;
        });
  }

  editGroup(group: Group) {
    this.group = group;
    this.groupFormOpen = true;
  }

  deleteGroup(group: Group) {
    this.groupService.deleteGroup(group).then(succeed => this.groups = this.groups.filter(g => g._id !== group._id));
  }
}
