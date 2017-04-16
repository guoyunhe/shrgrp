/// <reference types="webfontloader" />
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import * as WebFont from 'webfontloader';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);

// WebFont.load({
//   google: {
//     families: ['Titillium Web']
//   }
// });
