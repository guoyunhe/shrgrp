import { Group } from './group';
import { Thing } from './thing';

export class Friend {
  public groups: Group[];
  public things: Thing[];

  constructor(
    public id: string,
    public facebookId: string,
    public name: string
  ) {
    //
  }

  getAvatar() {
    return 'https://graph.facebook.com/' + this.facebookId + '/picture?type=square&width=320&height=320';
  }
}