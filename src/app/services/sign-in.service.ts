import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class SignInService {

  constructor(private http:Http) { }

  postSigninInfo(user){
      return this.http.post('http://localhost:3000/api/signin', user).map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error: Response | any){
    const body = error.json() || '';
    return Observable.throw(body);
  }
}
