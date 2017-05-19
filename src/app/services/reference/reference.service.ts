import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class ReferenceService {

  private socket;
  private alertId;

  constructor(public localStorageService : LocalStorageService) { }


   registerUser(){
     this.socket = io();
     this.socket.emit("register",{"uid":this.localStorageService.getLoginInfo().user.id});
   }
   getLatest(id){
     this.alertId = id;
     this.socket.emit("getLatest",{"alertId":id});
     let observable = new Observable<Array<string>>(observer => {
      this.socket.on('latestReference'+this.alertId, (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable.share();
   }
}
