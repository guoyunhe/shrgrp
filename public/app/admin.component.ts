import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';
import { Group } from './group';
import { Thing } from './thing';
import { AuthService } from './auth.service';
import { ThingService } from './thing.service';
import { GroupService } from "./group.service";

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  private me: Friend;

  private thing: Thing; // selected thing for edit or create new
  private things: Thing[];
  private thingFormOpen: number = 0;

  private group: Group;
  private groups: Group[];
  private newGroupFacebookUrl: string;
  private groupFormOpen: number = 0;

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
      var lastThing = this.things[this.things.length - 1];
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
        this.things = this.things.filter(function (e) { return e !== thing });
        thing = null; // if it is referenced, set all of them to null
      });
    } else {
      this.things = this.things.filter(function (e) { return e !== thing });
      thing = null; // if it is referenced, set all of them to null
    }
  }

  createGroup() {
    if (this.newGroupFacebookUrl) {
      this.groupService.createGroupFromFacebookUrl(this.newGroupFacebookUrl)
        .then(group => {
          this.groups.push(group);
          this.newGroupFacebookUrl = null;
        });
    } else {
      if (this.groups) {
        var lastGroup = this.groups[this.groups.length - 1];
      }

      if (!lastGroup || lastGroup._id) {
        // if no last group, or last group have been saved
        this.group = new Group();
        this.groups.push(this.group);
      } else {
        // if last group haven't been saved
        this.group = lastGroup;
      }

      this.groupFormOpen = Date.now();
    }
  }

  editGroup(group: Group) {
    this.group = group;
    this.groupFormOpen = Date.now();
  }

  deleteGroup(group: Group) {
    this.groupService.deleteGroup(group).then(succeed => this.groups = this.groups.filter(g => g._id !== group._id));
  }
}
