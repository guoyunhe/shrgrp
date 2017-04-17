import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Group } from './group';
import { Friend } from './friend';

@Injectable()
export class GroupService {
  private groups: Group[] = [];
  private friends: Friend[] = [];

  constructor(private http: Http) { }

  getGroups(): Promise<Group[]> {
    return this.http.get('/groups').toPromise()
               .then(response => response.json() as Group[])
               .catch(this.handleError);
  }

  getGroup(id: string): Promise<Group> {
    return this.http.get('/groups/'+ id).toPromise()
               .then(response => response.json() as Group)
               .catch(this.handleError);
  }

  getFriends(group: Group): Promise<Friend[]> {
    return this.getFriendsByGroupId(group._id);
  }

  getFriendsByGroupId(id: string): Promise<Friend[]> {
    return this.http.get('/groups/' + id + '/friends').toPromise()
               .then(response => response.json() as Friend[])
               .catch(this.handleError);
  }

  joinGroup(group: Group): void {
    this.http.post('/groups/' + group._id + '/me', null).toPromise()
        .catch(this.handleError);
  }

  quitGroup(group: Group): void {
    this.http.delete('/groups/' + group._id + '/me').toPromise()
        .catch(this.handleError);
  }

  createGroupFromFacebookUrl(url: String): Promise<Group> {
    return this.http.post('/groups', {url: url}).toPromise().then(response => response.json() as Group)
               .catch(error => null);
  }

  createGroup(group: Group): Promise<Group> {
    return this.http.post('/groups', group).toPromise()
               .then(response => response.json() as Group)
               .catch(error => null);
  }

  updateGroup(group: Group): Promise<Group> {
    return this.http.patch('/groups/' + group._id, group).toPromise()
               .then(response => response.json() as Group)
               .catch(error => null);
  }

  deleteGroup(group: Group): Promise<boolean> {
    return this.http.delete('/groups/' + group._id).toPromise().then(response => true)
               .catch(error => false);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
