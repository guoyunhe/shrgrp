import { Group } from './group';
import { Thing } from './thing';

export class Friend {
  public _id: string;
  public facebookId: string;
  public name: string;
  public role: string;
  public groups: Group[];
  public things: Thing[];

  constructor() { }

  getAvatar() {
    return 'https://graph.facebook.com/' + this.facebookId + '/picture?type=square&width=320&height=320';
  }
}
