import { Component } from '@angular/core';
@Component({
  template: `
    <h1>404 not found</h1>
    <p>you might have clicked a wrong link.</p>
    <a routerLink="/">back to home</a>
  `
})
export class NotFoundComponent { }
