import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Group } from './group';
import { Friend } from './friend';

@Injectable()
export class AuthService {
  private me: Friend;
  public redirectUrl: string;

  constructor(private http: Http) { }

  check(): Promise<Friend> {
    if (this.me) {
      return Promise.resolve(this.me);
    } else {
      return this.http.get('me').toPromise()
                 .then(response => this.me = response.json() as Friend)
                 .catch(err => this.me = null);
    }
  }

  getLoginUrl(): string {
    return '/auth/facebook?redirect=' + encodeURI(this.redirectUrl);
  }

  get isLoggedIn(): boolean  {
    return this.me !== null && this.me._id !== null;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
