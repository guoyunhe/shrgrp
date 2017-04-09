import { Friend } from './friend';

export class Thing {
  public _id: string;
  public name: string;
  public slug: string;
  public icon: string;
  public cat: 'tools' | 'kitchen' | 'sports' | 'party' | 'other' = 'other';
  public published: boolean = false;
  public friends: Friend[];
  constructor() { }
}
