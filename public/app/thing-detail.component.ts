import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { Friend } from './friend';
import { Thing } from "./thing";
import { ThingService } from "./thing.service";

@Component({
  selector: 'thing-detail',
  template: `
    <div class="thing" *ngIf="thing">
      <img class="icon" [src]="thing.icon || '/images/ph-icon.svg'" width="100" height="100">
      <div class="name">{{ thing.name | lowercase }}</div>
    </div>
    <ul class="friends" *ngIf="friends && filteredFriends">
      <li class="friend" *ngFor="let f of filteredFriends">
        <a href="https://www.facebook.com/{{ f.facebookId }}" target="_blank">
          <img class="avatar" src="{{ f.facebookId | fbpicture }}"
               width="100" height="100" title="{{ f.name | lowercase }}">
        </a>
      </li>
    </ul>
    <label *ngIf="canShare">
      <input type="checkbox" [(ngModel)]="shared" (change)="onSharedChange()"/>
      share this
    </label>
  `,
  providers: []
})
export class ThingDetailComponent implements OnInit, DoCheck {

  @Input() private friends: Friend[];
  @Input() private thing: Thing;
  @Input() private me: Friend;
  @Input() private canShare: boolean;
  private filteredFriends: Friend[];
  private shared: boolean;

  constructor(private service: ThingService) { }

  ngOnInit(): void {
    this.filterFriends();
    this.shared = this.me.things.findIndex(t => t._id === this.thing._id) > -1;
  }

  ngDoCheck() {
    this.filterFriends();
  }

  onSharedChange() {
    // get reference in this.friends array
    var meInGroup = this.friends.find(f => f._id === this.me._id);
    if (this.shared) {
      this.me.things.push(this.thing);
      meInGroup.things.push(this.thing);
      this.service.share(this.thing);
    } else {
      this.me.things = this.me.things.filter(t => t._id !== this.thing._id);
      meInGroup.things = meInGroup.things.filter(t => t._id !== this.thing._id);
      this.service.unshare(this.thing);
    }
  }

  filterFriends(): void {
    this.filteredFriends = this.friends.filter(f => {
      return f.things.findIndex(t => t._id === this.thing._id) > -1;
    });
  }
}
