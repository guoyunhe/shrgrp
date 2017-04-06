import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Group } from './group';
import { Friend } from './friend';

@Injectable()
export class AuthService {
  private me: Friend;
  private redirectUrl: string;
  private groups: Group[] = [];
  private friends: Friend[] = [];

  constructor(private http: Http) { }

  check(): Promise<Friend> {
    return this.http.get('me').toPromise()
               .then(response => response.json() as Friend)
               .catch(this.handleError);
  }

  getLoginUrl(): string {
    return '/auth/facebook?redirect=' + encodeURI(this.redirectUrl);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
