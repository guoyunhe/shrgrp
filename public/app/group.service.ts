/// <reference types="jquery" />

import { Injectable } from '@angular/core';
import * as $ from 'jquery';

import { Group } from './group';
import { Friend } from './friend';

@Injectable()
export class GroupService {
  private groups: Group[] = [];
  private friends: Friend[] = [];

  constructor() { }

  getGroups(): Group[] {
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

  getGroup(id: string): Group {
    return this.groups.find(function(group: Group) {
      return group.id === id
    });
  }

  getFriends(group: Group): Friend[] {
    var friends: Friend[] = [];
    $.ajax({
      url: '/groups/' + group.id + '/friends',
      method: 'get',
      dataType: 'json'
    }).done(function (data: any[]) {
      data.forEach(item => {
        friends.push(new Friend(item._id, item.facebookId, item.name));
      });
    });
    return friends;
  }

  joinGroup(group: Group): void {
    $.ajax({
      url: '/groups/' + group.id + '/me',
      method: 'post'
    });
  }

  quitGroup(group: Group): void {
    $.ajax({
      url: '/groups/' + group.id + '/me',
      method: 'delete'
    });
  }
}