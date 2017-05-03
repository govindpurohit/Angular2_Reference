import { Component, OnInit } from '@angular/core';

import { FeedService } from '../services/feed/feed.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {

  public feed : any = {};

  constructor(public feedService : FeedService) {
    this.feed.name = 'G';
    this.feedService.singleFeed$.subscribe(
      feed => {
        this.feed = feed;
        console.log("single feed:"+this.feed.name);
    });
  }

  ngOnInit() {
  }

}
