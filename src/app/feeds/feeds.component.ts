import { Component, OnInit, Renderer } from '@angular/core';
import * as io from 'socket.io-client';

import { AlertService } from '../services/alert/alert.service';
import { FeedService } from '../services/feed/feed.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { ReferenceService } from '../services/reference/reference.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {

  public alert;
  public ref = [];
  public allRef = [];
  public dataLimit = 10;
  public message = "";
  public stopScroll = false;
  public page = 1;
  public noReferences = false;
  public loading = false;
  public myObservable : any;
  public showUpdate = false;
  public update = [];

  constructor(public alertService : AlertService,public feedService : FeedService, public renderer : Renderer, public localStorageService : LocalStorageService, public referenceService : ReferenceService) {
    this.alertService.singleAlert$.subscribe(
      alert => {
        this.alert = alert;
        this.page = 1;
        this.ref = [];
        this.loading = true;
        this.noReferences = false;
        this.showUpdate = false;
        this.alertService.getReferenceByAlert(this.alert).subscribe((data) => {
          this.allRef = data.data;
          this.loading = false;
          this.noReferences = false;
          this.getLatest(this.alert._id);

          if(this.allRef && this.allRef.length > 0 && this.allRef.length <= this.dataLimit){
            this.ref = this.allRef;
          }
          else if(this.allRef && this.allRef.length > this.dataLimit){
            this.ref = this.allRef.slice(0,10);
          }
          else{
            this.message = "No References to show.";
            this.noReferences = true;
            this.ref = [];
            console.log("no data reference.");
          } 
        });
    });
  }

  ngOnInit() {  
    this.connectToSocket();
    setInterval(()=>{
      this.getLatest(this.alert._id);
    }, 1000 * 60 * 6);
  }
  ngAfterViewInit(){
    this.renderer.setElementStyle(document.getElementsByClassName('nav-tabs')[0],'display','none');
    this.renderer.setElementStyle(document.getElementsByClassName('tab-content')[0],'max-width','70%');
    this.renderer.setElementStyle(document.getElementsByClassName('tab-content')[0],'margin','0 auto');
  }

  onScroll(event) {
    let tracker = event.target;
    let limit = tracker.scrollHeight - tracker.clientHeight;
    if (event.target.scrollTop === limit) {
        if(!this.stopScroll){
          this.page++;
          this.loadMoreData();
          this.stopScroll = false;
        }
        else{
          this.stopScroll = true;
        }
    }
  }

  loadMoreData(){
    if((this.allRef.length - this.ref.length) >= 10){
      this.ref = this.ref.concat(this.allRef.slice((this.page-1) * this.dataLimit,this.page * this.dataLimit));
    }
    else if((this.allRef.length - this.ref.length) > 0){
      this.ref = this.ref.concat(this.allRef.slice((this.page-1) * this.dataLimit));
    }
    else{
      this.page = 1;
      console.log("no data");
    }
  }

  delete(resource,index){
    if(confirm("are u sure? You want to delete.")){
      this.ref.splice(index,1);
      this.feedService.deleteReferenceById(resource._id).subscribe((response) => {
        if(response.data && response.data.error){
          alert("Reference is not deleted.");
        }
      });
    }
    
  }

  connectToSocket(){
    this.referenceService.registerUser();
  }

  getLatest(id){
    this.myObservable =this.referenceService.getLatest(id).subscribe(message => {
      if(message.length > 0){
        this.showUpdate = true;
        this.update = message;
      }
    })
  }

  addUpdates(){
    this.showUpdate = false;
    this.prependUpdates(this.update);
  }
  prependUpdates(updates){
    for(let i=0;i<updates.length;i++){
      this.ref.unshift(updates[i]);
    }
  }
}
