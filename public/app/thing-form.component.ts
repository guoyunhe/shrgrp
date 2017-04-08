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

  constructor(
    private service: ThingService,
    private uploadService: UploadService
    ) {}

  onSubmit() {
    if (this.thing._id) {
      this.service.updateThing(this.thing).then(thing => {
        this.thing.slug = thing.slug;// feed model with slug back to parent component
        this.thing = null;
      });
    } else {
      this.service.createThing(this.thing).then(thing => {
        this.thing._id = thing._id; // feed model with _id and slug back to parent component
        this.thing.slug = thing.slug;
        this.thing = null;
      });
    }
  }

  upload(e: any) {
    var file = e.target.files[0];
    this.uploadService.upload(file, '/uploads/svg').then(upload => this.thing.icon = upload.path);
    console.log(file);
  }

}
