import { Component, Input } from '@angular/core';

import { Friend } from './friend';
import { Thing } from "./thing";

@Component({
  selector: 'friend-list',
  template: `
    <ul class="friends">
      <li class="friend" *ngFor="let f of friends">
        <a href="https://www.facebook.com/{{ f.facebookId }}" target="_blank">
          <img class="avatar" src="{{ f.facebookId | fbpicture }}"
               width="100" height="100" title="{{ f.name | lowercase }}">
        </a>
      </li>
    </ul>
  `,
})
export class FriendListComponent {
  @Input() private friends: Friend[];
}
