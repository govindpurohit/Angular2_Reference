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
export class AlertService {
// Observable string sources
  private alertSource = new Subject<String>();
  private singleAlertSource = new Subject<String>();

  // Observable string streams
  alertSource$ = this.alertSource.asObservable().share();
  singleAlert$ = this.singleAlertSource.asObservable().share();


  constructor(public appBaseService : AppHttpService) { }

  saveAlert(alert){
    return this.appBaseService.post('/api/alerts',alert).map(res => res.json()).share();
  }

  updateAlert(id,alert){
    return this.appBaseService.put('api/alerts/'+id,alert).map(res => res.json()).share();
  }

  // Service message commands
  setAlerts(mission) {
    this.alertSource.next(mission);
  }

  getAlerts(){
     return this.appBaseService.get('/api/alerts').map(res => res.json()).share()
      .catch(this.handleError);
  }

  setSingleAlert(singleAlert){
    this.singleAlertSource.next(singleAlert);
  }

  getReferenceByAlert(alert){
    return this.appBaseService.get('/api/reference/'+alert._id).map(res => res.json())
    .share()
    .catch(this.handleError);
  }

  deleteAlertById(id){
    return this.appBaseService.delete('/api/alerts/'+id).map(res => res.json())
    .share()
    .catch(this.handleError);
  }

  handleError(error: Response | any){
    const body = error.json() || '';
    return Observable.throw(body);
  }

}
