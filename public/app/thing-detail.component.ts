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

    <label *ngIf="canShare" class="share-this" [class.active]="shared">
      <input type="checkbox" [(ngModel)]="shared" (change)="onSharedChange()"/>
      {{ shared ? 'i am sharing' : 'share' | lowercase }}
    </label>

    <div *ngIf="!filteredFriends.length">no friend shares this yet</div>
    <div *ngIf="filteredFriends.length === 1">a friend is sharing this</div>
    <div *ngIf="filteredFriends.length > 1">{{ filteredFriends.length }} friends are sharing this</div>

    <div class="friends">
      <div class="friend" *ngFor="let f of filteredFriends">
        <a href="https://www.facebook.com/{{ f.facebookId }}" target="_blank">
          <img class="avatar" src="{{ f.facebookId | fbpicture }}"
               width="100" height="100" title="{{ f.name | lowercase }}">
        </a>
      </div>
    </div>
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
