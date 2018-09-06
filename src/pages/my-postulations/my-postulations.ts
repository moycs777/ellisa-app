import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyServiceDetailsPage } from '../my-service-details/my-service-details';
import { PostulationsServicesProvider } from '../../providers/postulations-services/postulations-services';

/**
 * Generated class for the MyPostulationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-my-postulations',
  templateUrl: 'my-postulations.html',
})
export class MyPostulationsPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public storage: Storage,
      public postulationService: PostulationsServicesProvider){
  }

  myPostulations:any;
  id_user = null;

  ionViewDidLoad() {
    console.log('mis postulaciones');
    this.storage.get('user').then((val) => {
      this.id_user = val.id;
    });
    this.index();
  }

  index() {
    this.postulationService.all()
      .subscribe((data) => {
        console.log("estas son mis postulaciones: " + JSON.stringify(data));
        this.myPostulations = data.postulations;
      },
        (err) => {
          console.log(err);
        })
  }

  details(data) {
    this.navCtrl.push(MyServiceDetailsPage, { service: data.service });
  }

}
