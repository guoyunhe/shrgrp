import 'rxjs/add/operator/switchMap';
import { Component, OnInit, DoCheck }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Friend } from './friend';
import { Group } from './group';
import { GroupService } from './group.service';
import { ThingService } from "./thing.service";
import { Thing } from "./thing";

@Component({
  selector: 'group-detail',
  template: `
    <button (click)="goBack()">back</button>
    
    <div *ngIf="group">
      <h2>{{ group.name | lowercase }} (espoo)</h2>
      <button type="button" (click)="join()">join</button>
      <button type="button" (click)="quit()">quit</button>
    </div>

    <div *ngIf="group && things">
      <thing-detail *ngFor="let thing of things" [thing]="thing" [friends]="group.friends"></thing-detail>
    </div>
  `,
  providers: [GroupService, ThingService]
})
export class GroupDetailComponent implements OnInit, DoCheck {
  private group: Group;
  private things: Thing[];

  constructor(
    private groupService: GroupService,
    private thingService: ThingService,
    private route: ActivatedRoute,
    private location: Location,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.groupService.getGroup(params['id']))
      .subscribe(group => { this.group = group; console.log(this.group.friends)});
    this.thingService.getThings().then(things => this.things = things);
  }

  ngDoCheck(): void {
    if (this.group && this.group.name) {
      this.title.setTitle(this.group.name.toLowerCase() + ' @ shrgrp');
    }
  }

  join() {
    this.groupService.joinGroup(this.group);
  }

  quit() {
    this.groupService.quitGroup(this.group);
  }

  goBack() {
    this.location.back();
  }
}
