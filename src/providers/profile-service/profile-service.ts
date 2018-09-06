import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthServiceProvider } from '../auth-service/auth-service';

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileServiceProvider {

  constructor(
    public http: Http,
    public authService: AuthServiceProvider) {
    console.log('Hello ProfileServiceProvider Provider');
  }

  getInfo(id){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.authService.api + 'me/' + id, { headers: headers })
      .map(res => res.json());
  }

  updateInfo(id, data) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.authService.api + 'infoBasic/' + id, data, { headers: headers })
      .map(res => res.json());
  }

  getCategories() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.authService.api + 'categories/', { headers: headers })
      .map(res => res.json());
  }

  getProfessionName(id){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.authService.api + 'profession-name/' + id, { headers: headers })
      .map(data => data.json());
  }

  getQuestions(id, user_id) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.authService.api + 'professions-attributes/' + id + '/' + user_id, { headers: headers })
      .map(res => res.json());
  }

  storeQuestions(data) {
    let headers = new Headers();

    headers.append('Authorization', this.authService.token);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.authService.api + 'user-attributes', data, {headers: headers})
      .map(data => data.json());
  }

  storeImages(data) {

    let headers = new Headers();
    headers.append('Authorization', this.authService.token);
    //headers.append('Content-Type': 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(this.authService.api + 'profile-images/', data, {headers: headers})
      .map(data => data.json());
  }

  myProfessions(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json')

    return this.http.get(this.authService.api + 'my-professions' + '/' + id, { headers: headers })
      .map(data => data.json());
      /* .map(data => data.json()).toPromise(); */
  }

}
