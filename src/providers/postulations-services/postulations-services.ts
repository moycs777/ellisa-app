//import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';

import { Injectable } from '@angular/core';

import { AuthServiceProvider } from '../auth-service/auth-service';

/*
  Generated class for the PostulationsServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostulationsServicesProvider {

  constructor(public http: Http, private authService: AuthServiceProvider) {
    console.log('Hello PostulationsServicesProvider Provider');
  }

  //obtener todas mis postulaciones
  all(){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.authService.api + 'postulations', { headers: headers })
      .map(res => res.json());
  }

  proposal(data) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    headers.append('Content-Type', 'application/json');

    let params = JSON.stringify(data);

    return this.http.post(this.authService.api + 'postulations', params, { headers: headers })
    	.map(res => res.json());
  }

  getPostulationsService(id) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.authService.api + 'my-postulations-services/' + id, { headers: headers })
      .map(res => res.json());
  }

  confirmPostulation(service_id, postulation_id) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.authService.api + 'confirm-postulation/' + service_id + '/' + postulation_id, { headers: headers })
      .map(res => res.json());
  }

}
