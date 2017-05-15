import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppHttpService } from '../app-http/app-http.service';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class AlertService {
// Observable string sources
  private alertSource = new Subject<String>();
  private singleAlertSource = new Subject<String>();

  // Observable string streams
  alertSource$ = this.alertSource.asObservable();
  singleAlert$ = this.singleAlertSource.asObservable();


  constructor(public appBaseService : AppHttpService) { }

  saveAlert(alert){
    return this.appBaseService.post('/api/alerts',alert).map(res => res.json());
  }

  // Service message commands
  setAlerts(mission) {
    this.alertSource.next(mission);
  }

  getAlerts(){
     return this.appBaseService.get('/api/alerts').map(res => res.json())
      .catch(this.handleError);
  }

  setSingleAlert(singleAlert){
    this.singleAlertSource.next(singleAlert);
  }

  getReferenceByAlert(alert){
    return this.appBaseService.get('/api/reference/'+alert._id).map(res => res.json())
    .catch(this.handleError);
  }

  deleteAlertById(id){
    return this.appBaseService.delete('/api/alerts/'+id).map(res => res.json())
    .catch(this.handleError);
  }

  handleError(error: Response | any){
    const body = error.json() || '';
    return Observable.throw(body);
  }

}
