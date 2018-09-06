//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
//import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { AuthServiceProvider } from '../auth-service/auth-service';
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: Http, private authService: AuthServiceProvider) {
    console.log('Hello ServiceProvider Provider');
  }


  store(data) {
  	let headers = new Headers({'Content-Type': 'application/json'});
    let params = JSON.stringify(data);

    return this.http.post(this.authService.api + 'services', params, { headers: headers })
    	.map(res => res.json());
  }

  getMyServices(id) {

    return this.http.get(this.authService.api + 'get-my-services/' + id)
      .map(res => res.json());
  }

  showService(id) {

    return this.http.get(this.authService.api + 'show-service/' + id)
      .map(res => res.json());
  }

  getAll(id) {

    return this.http.get(this.authService.api + 'all-services/' + id)
      .map(res => res.json());
  }

}
