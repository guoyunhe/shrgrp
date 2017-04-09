import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Thing } from './thing';

@Injectable()
export class ThingService {

  constructor(private http: Http) { }

  getThings(): Promise<Thing[]> {
    return this.http.get('/things').toPromise()
               .then(response => response.json() as Thing[])
               .catch(this.handleError);
  }

  getThing(id: string): Promise<Thing> {
    return this.http.get('/things/'+ id).toPromise()
               .then(response => response.json() as Thing)
               .catch(this.handleError);
  }

  createThing(thing: Thing): Promise<Thing> {
    return this.http.post('/things', thing).toPromise()
               .then(response => response.json() as Thing)
               .catch(this.handleError);
  }

  updateThing(thing: Thing): Promise<Thing> {
    return this.http.patch('/things/' + thing._id, thing).toPromise()
               .then(response => response.json() as Thing)
               .catch(this.handleError);
  }

  deleteThing(thing: Thing): Promise<Thing> {
    return this.http.delete('/things/' + thing._id).toPromise()
               .then(response => thing)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
