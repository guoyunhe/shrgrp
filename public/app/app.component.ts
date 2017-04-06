import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
      <navbar></navbar>
      <group-list></group-list>
    `
})
export class AppComponent { name = 'Angular'; }
