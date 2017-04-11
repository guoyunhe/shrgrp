import { Group } from './group';
import { Thing } from './thing';

export class Friend {
  public _id: string;
  public facebookId: string;
  public name: string;
  public role: string;
  public groups: Group[] = [];
  public things: Thing[] = [];
}
