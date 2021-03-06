import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppHttpService } from '../app-http/app-http.service';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';

@Injectable()
export class FeedService {

   // Observable string sources
  private feedSource = new Subject<String>();
  private singleFeedSource = new Subject<String>();

  // Observable string streams
  feedSource$ = this.feedSource.asObservable().share();
  singleFeed$ = this.singleFeedSource.asObservable().share();


  constructor(public appBaseService : AppHttpService) { }

  saveFeed(feed){
    return this.appBaseService.post('/api/alerts',feed).map(res => res.json())
    .share();
  }

  // Service message commands
  setFeeds(mission) {
    this.feedSource.next(mission);
  }

  getFeeds(){
     return this.appBaseService.get('/api/alerts').map(res => res.json())
     .share()
     .catch(this.handleError);
  }

  setSingleFeed(singleFeed){
    this.singleFeedSource.next(singleFeed);
  }

  getReferenceByFeed(feed){
    return this.appBaseService.get('/api/reference/'+feed._id).map(res => res.json())
    .share()
    .catch(this.handleError);
  }

  deleteReferenceById(id){
    return this.appBaseService.delete('/api/reference/'+id).map(res => res.json())
    .share();
  }

  handleError(error: Response | any){
    const body = error.json() || '';
    return Observable.throw(body);
  }

}
