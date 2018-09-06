import { Events } from 'ionic-angular';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
	api: any;
  token: any = "";
  user: string = "";
  idUser: number;

  constructor(
		private http: Http,
		private storage: Storage,
		public event: Events) {
    console.log('Hello AuthServiceProvider Provider');

    //this.api = '/web-ellisa/';

    this.api = 'http://142.93.49.220/api/';
    //this.api = 'http://localhost:8000/api/';
  }

  login(data) {

  	let headers = new Headers({'Content-Type': 'application/json'});
    let params = JSON.stringify(data);

    return this.http.post(this.api + 'login', params, { headers: headers })
    	.map(res => res.json());
  }

  register(data) {


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = JSON.stringify(data);

    return this.http.post(this.api + 'signup', params, { headers: headers })
    	.map(res => res.json());
  }

  storeData(data) {
    this.storage.set('user', data);
    this.storage.set('token', data.access_token);

    this.user = data.user;
    this.token = data.access_token
    this.idUser = data.id;

		this.event.publish('user:success', this.user, this.idUser);
  }

  logout() {
    this.token = null;
    this.user = null;
    this.idUser = 0;
    this.storage.clear();
  }
}
