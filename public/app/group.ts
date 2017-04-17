import { Friend } from './friend';
export class Group {
  public _id: string;
  public facebookId: string;
  public name: string;
  public slug: string;
  public cover: string;
  public friends: Friend[];

  constructor() { }
}
