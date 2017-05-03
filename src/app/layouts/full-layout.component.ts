import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SideBarComponent } from '../side-bar/side-bar.component';
//services
import { FeedService } from '../services/feed/feed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public isFeeds: boolean = false;

  constructor(public router : Router, public feedService :FeedService){ } //

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    if(this.router.url === '/feeds'){
      this.isFeeds = true;
      this.feedService.getFeeds().subscribe(result => {
        this.feedService.setFeeds(result);
      },
      err => {
        console.log("Error:"+err);
      });
    }
    else{
      this.isFeeds = false;
    }
  }
}
