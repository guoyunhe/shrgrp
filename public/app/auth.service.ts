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

  /**
   * Check login status and get me object.
   * If it is not logged in, return null or error code.
   */
  check(): Promise<Friend> {
    if (this.me) {
      return Promise.resolve(this.me);
    } else {
      return this.http.get('me').toPromise()
        .then(response => this.me = response.json() as Friend)
        .catch(error => this.me = null);
    }
  }

  /**
   * URL for login, with redirect parameter. Backend with store redirect url
   * to session and execute redirect after OAuth callback.
   */
  get loginUrl(): string {
    if (this.redirectUrl) {
      return '/auth/facebook?redirect=' + encodeURI(this.redirectUrl);
    } else {
      return '/auth/facebook';
    }
  }

  get isLoggedIn(): boolean {
    return this.me !== null && this.me._id !== null;
  }

  /**
   * Avoid XSS, the logout route must be accessed by POST, not GET
   */
  logout(): Promise<boolean> {
    return this.http.post('auth/logout', this.me).toPromise()
      .then(response => true).catch(error => false);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
