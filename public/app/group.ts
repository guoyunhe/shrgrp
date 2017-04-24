import { Friend } from './friend';
export class Group {
  public _id: string;
  public facebookId: string;
  public name: string;
  public desc: string;
  public slug: string;
  public cover: string;
  public city: 'helsinki' | 'espoo' | 'vantaa' = 'helsinki';
  public friends: Friend[];

  constructor() { }
}
