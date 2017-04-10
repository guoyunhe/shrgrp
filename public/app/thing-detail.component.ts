import { Component, OnInit, Input } from '@angular/core';

import { Friend } from './friend';
import { Thing } from "./thing";

@Component({
  selector: 'thing-detail',
  template: `
    <div>
      <img [src]="thing.icon || '/images/ph-icon.svg'" width="100" height="100">
      {{ thing.name | lowercase }}
    </div>
    <span *ngFor="let f of friends">
      <img src="{{ f.facebookId | fbpicture }}" width="100" height="100">
      {{ f.name }}
    </span>
  `,
  providers: []
})
export class ThingDetailComponent {
  @Input() private friends: Friend[];
  @Input() private thing: Thing;
}
