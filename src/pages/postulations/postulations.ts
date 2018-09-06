import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { PostulationsServicesProvider } from '../../providers/postulations-services/postulations-services';
import { HomePage } from "../home/home";

/**
 * Generated class for the PostulationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postulations',
  templateUrl: 'postulations.html',
})
export class PostulationsPage {
  description: string = "";
  price: number = 0;

  service: any = [];
  title: string = "";
  total: number = 0;

  myPostulations:any;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    private postulationService: PostulationsServicesProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PostulationsPage');
    this.service = this.navParams.get('service');

    this. title = this.service.title;
    console.log("mis postulaciones : ");

  }


  calculate(newValue) {
    console.log("valor: " + typeof  newValue );
    let tax = 0.30;
    let comision = parseFloat(newValue) * tax;
    this.total = parseFloat(newValue) + comision;
    console.log("total: " + this.total );
    console.log('Valor original: '+ newValue);
  }


  send() {
    let info = {
      description: this.description,
      price: this.total,
      user_id: this.service.user_id,
      talent_id: this.authService.idUser,
      service_id: this.service.id
    }

    this.postulationService.proposal(info)
      .subscribe((data) => {
        console.log(data.message);
        let message = JSON.stringify(data.message);
        this.presentToast(/* JSON.parse(data._body) */message);
        this.navCtrl.setRoot(HomePage);
      },
      (err) => {
        console.log(err);
        let mensaje = JSON.parse(err._body);
        let message = JSON.stringify(mensaje.errors);
        this.presentToast(message);
        JSON.stringify(mensaje.errors)
      });

  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
