import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Upload } from './upload';

@Injectable()
export class UploadService {

  constructor(private http: Http) { }

  upload(file: File): Promise<Upload> {
    var data = new FormData();
    data.append('file', file);
    return this.http.post('/uploads', data).toPromise()
               .then(response => response.json() as Upload)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
