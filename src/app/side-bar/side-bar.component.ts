import { Component, OnInit } from '@angular/core';

import { FeedService } from '../services/feed/feed.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public feeds : any = [];

  constructor(public feedService : FeedService) {
    this.feedService.feedSource$.subscribe(
      feeds => {
        this.feeds = feeds;
      }
    )
   }

  ngOnInit() {
  }

  getFeed(feed){
    this.feedService.setSingleFeed(feed);
  }

}
