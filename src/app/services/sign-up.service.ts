import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class SignUpService {

  constructor(private http:Http) { }

  postSignupInfo(user){
      return this.http.post('/api/signup', user).map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error: Response | any){
    const body = error.json() || '';
    return Observable.throw(body);
  }
}
