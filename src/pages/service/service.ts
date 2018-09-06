import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';

import { HomePage } from './../home/home';
import { ServiceProvider } from '../../providers/service/service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';

import * as $ from 'jquery'


/**
 * Generated class for the ServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {

	title: string = "";
	description: string = "";
	price: number = 0;
  category_id: any;
	service_date: any;
	end_date: any;
	status: string = "";

  hour_init: any;
  hour_end: any;

  categories: any[] = [];


  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private menu: MenuController,
  	private serviceProvider: ServiceProvider,
    private authService: AuthServiceProvider,
    private profileService: ProfileServiceProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicePage');
    this.menu.enable(true);

    this.getCategories();
  }

  onSaveService() {

    let data = {};

    if(this.service_date == undefined) {

      data = {
        title: this.title,
        description: this.description,
        amount: this.price,
        category_id: this.category_id,
        service_date: null,
        end_date: null,
        /* status: this.status, */
        user_id: this.authService.idUser
      };

    } else {

      data = {
        title: this.title,
        description: this.description,
        amount: this.price,
        category_id: this.category_id,
        service_date: this.service_date + ' ' + this.hour_init,
        end_date: this.end_date + ' ' + this.hour_end,
        /* status: this.status, */
        user_id: this.authService.idUser
      };

    }

    $('#save-service').hide();


    console.log(data);

  	this.serviceProvider.store(data)
  		.subscribe((data) => {
        //console.log(data);
        let message = JSON.stringify(data.message);
        this.presentToast(message);
  			this.navCtrl.setRoot(HomePage);
  		},
  		(err) => {
        console.log(err);
        let mensaje = JSON.parse(err._body);
        let message = JSON.stringify(mensaje.errors);
        this.presentToast(message);
        $('#save-service').show();
  		});
  }

  getCategories() {
    this.profileService.getCategories()
      .subscribe((data) => {
        this.categories = data.data;
      },
    err => console.log(err))
  }

  showTimepickers() {
    $('.show-timepickers').hide();
    $('.timepickers').css('display', 'block');

  }

  mayus(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
}
