import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { MyServiceDetailsPage } from '../my-service-details/my-service-details';
import { PostulationsServicesPage } from '../postulations-services/postulations-services';

/**
 * Generated class for the MyProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-projects',
  templateUrl: 'my-projects.html',
})
export class MyProjectsPage {

	projects: any[] = [];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private serviceProvider:ServiceProvider,
  	private authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProjectsPage');

    this.index();
  }

  index() {
    console.log("user id : "+this.authService.idUser)
    this.serviceProvider.getMyServices(this.authService.idUser)
  		.subscribe((data) => {
  			this.projects = data.services;
  			console.log(this.projects);
  		},
  		(err) => {
  			console.log(err);
  		})
  }

  details(service){
    //console.log("detalles de : " + JSON.stringify(service));
    //redireccion o rederizado del componente de detalles
    this.navCtrl.push(MyServiceDetailsPage, { service: service });

  }

  proposalServices(data) {
    this.navCtrl.push(PostulationsServicesPage, {service_id: data.id});
  }

  aproxLength(val) {
    return Object.keys(val).length;
  }
}
