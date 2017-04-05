import { Friend } from './friend';
export class Group {
  public friends: Friend[];

  constructor(
    public id: string,
    public facebookId: string,
    public name: string,
    public slug: string
  ) {
    //
  }
}