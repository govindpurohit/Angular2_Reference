import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppHttpService } from '../app-http/app-http.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class FeedService {

  constructor(public appBaseService : AppHttpService) { }

  getFeeds(){
     return this.appBaseService.get('/api/feeds').map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error: Response | any){
    const body = error.json() || '';
    return Observable.throw(body);
  }

}
