import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fbpicture'})
export class FacebookPicturePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    return 'https://graph.facebook.com/' + value + '/picture?type=square&width=320&height=320';
  }
}