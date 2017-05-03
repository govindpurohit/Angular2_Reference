import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppHttpService } from '../app-http/app-http.service';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class FeedService {

   // Observable string sources
  private feedSource = new Subject<object>();
  private singleFeedSource = new Subject<object>();

  // Observable string streams
  feedSource$ = this.feedSource.asObservable();
  singleFeed$ = this.singleFeedSource.asObservable();


  constructor(public appBaseService : AppHttpService) { }

  // Service message commands
  setFeeds(mission: object) {
    this.feedSource.next(mission);
  }

  getFeeds(){
     return this.appBaseService.get('/api/feeds').map(res => res.json())
      .catch(this.handleError);
  }

  setSingleFeed(singleFeed){
    this.singleFeedSource.next(singleFeed);
  }

  getNewsByFeed(){

  }

  handleError(error: Response | any){
    const body = error.json() || '';
    return Observable.throw(body);
  }

}
