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
export class DownloadService {

  constructor(public appBaseService : AppHttpService ) { }

  downloadFile(id){
   return this.appBaseService.get('/api/download/'+id).map(res => res._body)
     .share()
     .catch(this.handleError);
  }

   handleError(error: Response | any){
    const body = error.json() || '';
    return Observable.throw(body);
  }
}
