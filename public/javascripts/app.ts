import 'zone.js/dist/zone';
import 'reflect-metadata';
import * as $ from 'jquery';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

$(function () {
    platformBrowserDynamic().bootstrapModule(AppModule);
});

console.log('hello'); // hello