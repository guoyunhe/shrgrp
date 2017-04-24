import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Search } from 'js-search';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
  selector: 'group-list',
  template: `
    <form class="filter">
      <p>
        <label *ngFor="let c of cities" class.active="city === c" (click)="filter()">
          <input type="radio" name="city" [(ngModel)]="city" [value]="c">
          {{ c }}
        </label>
      </p>
      <p>
        <input type="search" name="search" [(ngModel)]="search" placeholder="search...">
      </p>
    </form>

    <a class="group" *ngFor="let group of filteredGroups"
       routerLink="/groups/{{group.slug}}"
       [style.background-image]="'url(' + group.cover + ')'">
      <div class="name">{{ group.name | lowercase }}</div>
    </a>
    `,
  providers: [GroupService]
})
export class GroupListComponent implements OnInit, DoCheck {
  private groups: Group[];
  private filteredGroups: Group[];
  private city = 'helsinki';
  private cities = ['helsinki', 'espoo', 'vantaa'];
  private search: string;

  constructor(
    private service: GroupService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.service.getGroups().then(groups => this.groups = groups);
    this.title.setTitle('groups @ shrgrp');
  }

  ngDoCheck() {
    this.filter();
  }

  filter() {
    if (this.groups) {
      var groupsFilteredByCity = this.groups.filter(g => g.city === this.city);
      if (this.search) {
        var search = new Search('isbn');
        search.addIndex('name');
        search.addIndex('desc');
        search.addDocuments(groupsFilteredByCity);
        this.filteredGroups = search.search(this.search);
      } else {
        this.filteredGroups = groupsFilteredByCity;
      }
    }
  }
}
