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

      <p *ngFor="let thing of things" (click)="editThing(thing)">{{ thing._id }} {{ thing.name | lowercase }}</p>

      <button (click)="createThing()">new</button>
      <thing-form [thing]="thing" [callback]="onThingCreated"></thing-form>
      <h2>groups</h2>

      <h2>friends</h2>
    `
})
export class AdminComponent {
  private me: Friend;
  private thing: Thing; // selected thing for edit or create new
  private things: Thing[];

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
  }

  editThing(thing: Thing) {
    this.thing = thing;
  }
}
