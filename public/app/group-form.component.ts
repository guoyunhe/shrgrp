import { Component, Input } from '@angular/core';

import { Group } from './group';
import { GroupService } from './group.service';
import { UploadService } from './upload.service';

@Component({
  selector: 'group-form',
  templateUrl: './group-form.component.html'
})
export class GroupFormComponent {

  @Input() public group: Group;

  // a trick to open / close form
  // open: pass a new random number from parent component to trigger
  // close: set to 0 in this component
  @Input() public open: boolean = false;

  private cities = ['helsinki', 'espoo', 'vantaa'];

  constructor(
    private groupService: GroupService,
    private uploadService: UploadService
    ) {}

  onSubmit() {
    if (this.group._id) {
      this.groupService.updateGroup(this.group).then(group => {
        this.group.slug = group.slug; // feed model with slug back to parent component
        this.open = false;
      });
    } else {
      this.groupService.createGroup(this.group).then(group => {
        this.group._id = group._id; // feed model with _id and slug back to parent component
        this.group.slug = group.slug;
        this.open = false;
      });
    }
  }

  upload(e: any) {
    var file = e.target.files[0];
    this.uploadService.upload(file).then(upload => this.group.cover = upload.path);
  }

}
