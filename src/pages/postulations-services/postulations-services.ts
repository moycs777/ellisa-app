import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery'

import { MyProjectsPage } from '../my-projects/my-projects';
import { PostulationsServicesProvider } from '../../providers/postulations-services/postulations-services';

/**
 * Generated class for the PostulationsServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postulations-services',
  templateUrl: 'postulations-services.html',
})
export class PostulationsServicesPage {
	postulations: any[] = [];
  service_id = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postulationsService: PostulationsServicesProvider) {
  	this.service_id = this.navParams.get('service_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostulationsServicesPage');
    this.allPostulationsServices();
  }

  allPostulationsServices() {
    this.postulationsService.getPostulationsService(this.service_id)
      .subscribe((data) => {
        console.log(data.postulations);
        this.postulations = data.postulations;
      },
    err => console.log(err))
  }

  accept(service_id, postulation_id) {
    $('.accept').attr('disabled', true);
    $('.accept').html('Espere...');
    
    this.postulationsService.confirmPostulation(service_id, postulation_id)
      .subscribe((data) => {
        this.navCtrl.setRoot(MyProjectsPage);
      },
    err => console.log(err))
  }

}
