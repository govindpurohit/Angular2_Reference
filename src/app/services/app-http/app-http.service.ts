import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppHttpService {

  constructor(public http: Http, public localStorage: LocalStorageService, private router: Router) { }

  getHeader(headerOptions, params = {}, doNotSendAuthorizationParam){
    var headerParams = {'Content-Type': 'application/json'};
    if(doNotSendAuthorizationParam !== true){
      //send authorization param
      headerParams['Authorization'] = this.localStorage.getSessionId();
    }
    if(headerOptions){
      Object.assign(headerParams, headerOptions);
    }

    let qParams: URLSearchParams = new URLSearchParams();
    for(let key in params){
      qParams.set(key, params[key]);
    }

    let headers = new Headers(headerParams);
    let req = new RequestOptions({ headers: headers });
    req.search = qParams;
    return req;
  }

  get(url, params:any = {}, headerOptions:any = {}, doNotSendAuthorizationParam:boolean = false){
    let options = this.getHeader(headerOptions, params, doNotSendAuthorizationParam);
    return this.http.get(url, options).catch(this.handleError);
  }

  post(url, params:any = {}, headerOptions:any = {}, doNotSendAuthorizationParam:boolean = false){
    let options = this.getHeader(headerOptions, {}, doNotSendAuthorizationParam);
    return this.http.post(url, params, options).catch(this.handleError);
  }

  handleError(error: Response | any){
    const body = error.json() || '';
    if(body.error.code == 401){
      this.router.navigate(['/login']);
    }

    return Observable.throw(body);
  }
}
