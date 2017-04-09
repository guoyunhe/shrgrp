import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';
import { Group } from './group';
import { Thing } from './thing';
import { AuthService } from './auth.service';
import { ThingService } from './thing.service';

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

      <h2>friends</h2>
    `
})
export class AdminComponent {
  private me: Friend;
  private thing: Thing; // selected thing for edit or create new
  private things: Thing[];
  private thingFormOpen: number = 0;

  constructor(
    private auth: AuthService,
    private thingService: ThingService
  ) { }

  ngOnInit() {
    this.auth.check().then(me => this.me = me);
    this.thingService.getThings().then(things => this.things = things);
  }

  createThing() {
    this.thing = new Thing();
    this.things.push(this.thing);
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
}
