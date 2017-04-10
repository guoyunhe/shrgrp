import { NgModule }      from '@angular/core';

import { FacebookPicturePipe } from "./facebook-picture.pipe";

@NgModule({
  declarations: [ FacebookPicturePipe ], // include capitalize pipe here
  exports: [FacebookPicturePipe]
})

export class FacebookPipesModule { }