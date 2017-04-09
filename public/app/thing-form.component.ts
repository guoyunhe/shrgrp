import { Component, Input } from '@angular/core';

import { Thing } from './thing';
import { ThingService } from './thing.service';
import { UploadService } from './upload.service';

@Component({
  selector: 'thing-form',
  templateUrl: './thing-form.component.html'
})
export class ThingFormComponent {

  @Input() public thing: Thing;

  // a trick to open / close form
  // open: pass a new random number from parent component to trigger
  // close: set to 0 in this component
  @Input() public open: number = 0; 

  constructor(
    private service: ThingService,
    private uploadService: UploadService
    ) {}

  onSubmit() {
    if (this.thing._id) {
      this.service.updateThing(this.thing).then(thing => {
        this.thing.slug = thing.slug; // feed model with slug back to parent component
        this.open = 0;
      });
    } else {
      this.service.createThing(this.thing).then(thing => {
        this.thing._id = thing._id; // feed model with _id and slug back to parent component
        this.thing.slug = thing.slug;
        this.open = 0;
      });
    }
  }

  upload(e: any) {
    var file = e.target.files[0];
    this.uploadService.upload(file, '/uploads/svg').then(upload => this.thing.icon = upload.path);
  }

}
