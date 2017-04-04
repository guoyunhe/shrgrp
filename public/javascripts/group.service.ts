import { Injectable } from '@angular/core';
import * as $ from 'jquery';

import { Group } from './group';
import { Friend } from './friend';

@Injectable()
export class GroupService {
  private groups: Group[] = [];
  private friends: Friend[] = [];

  constructor() { }

  getGroups() {
    var that = this;
    $.ajax({
      url: '/groups',
      method: 'get',
      dataType: 'json'
    }).done(function (data: any[]) {
      data.forEach(item => {
        that.groups.push(new Group(item._id, item.facebookId, item.name, item.slug));
      });
    });
    return this.groups;
  }

  getFriends(group: Group) {
    var friends: Friend[] = [];
    $.ajax({
      url: '/groups/' + group.id + '/friends',
      method: 'get',
      dataType: 'json'
    }).done(function (data: any[]) {
      data.forEach(item => {
        friends.push(new Friend(item._id, item.facebookId, item.name));
      });
      console.log(friends);
    });
    return friends;
  }

  joinGroup(group: Group) {
    $.ajax({
      url: '/groups/' + group.id + '/me',
      method: 'post'
    });
  }

  quitGroup(group: Group) {
    $.ajax({
      url: '/groups/' + group.id + '/me',
      method: 'delete'
    });
  }
}