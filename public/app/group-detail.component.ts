import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Friend } from './friend';
import { Group } from './group';
import { GroupService } from './group.service';

@Component({
  selector: 'group-detail',
  template: `
    <h2>{{ group.name }}</h2>
    <button type="button" (click)="join()">join</button>
    <button type="button" (click)="quit()">quit</button>
    <div *ngFor="let friend of friends">
        <img src="{{ friend.getAvatar() }}" width="50" height="50">
    </div>
    `,
  providers: [GroupService]
})
export class GroupDetailComponent implements OnInit, OnChanges {
  @Input() public group: Group;
  public friends: Friend[];

  constructor(
    private service: GroupService
  ) { }

  ngOnInit() {
    //
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (changes['group']) {
      this.update();
    }
  }

  update() {
    this.friends = this.service.getFriends(this.group);
  }

  join() {
    this.service.joinGroup(this.group);
  }

  quit() {
    this.service.quitGroup(this.group);
  }
}