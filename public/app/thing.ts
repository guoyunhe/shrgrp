import { Friend } from './friend';

export class Thing {
  public _id: string;
  public name: string;
  public slug: string;
  public icon: string;
  public cat: string;
  public published: boolean;
  public friends: Friend[];
  constructor() { }
}
