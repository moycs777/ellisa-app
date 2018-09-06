import {Component} from "@angular/core";
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { HomePage } from '../home/home';
import { FCM } from "@ionic-native/fcm";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  name: string = "";
	email: string = "";
	password: string = "";
	password_confirmation: string = "";
  errors = [];
  token_id:any;

  constructor(
    public navCtrl: NavController,
    private fcm: FCM,
  	public navParams: NavParams,
    private authService: AuthServiceProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.fcm.getToken().then(token => {
      console.log(token);
      //here you will getthe device token id ok
      this.token_id = token;
    });
  };

  signup() {

  	let request = {
  		name: this.name,
  		email: this.email,
  		password: this.password,
      password_confirmation: this.password_confirmation,
      token_id: this.token_id
  	};

  	this.authService.register(request)
  		.subscribe( (data) => {
  			console.log(data);
        this.authService.storeData(data);
        this.navCtrl.setRoot(HomePage, {'data': data});
  		},
  		(err) => {
        console.log(err._body);
        let mensaje = JSON.parse(err._body);
        var response = JSON.parse(err._body);
        if (response) {
          let title = 'Error!';
          let message = JSON.stringify(mensaje.errors);
          this.showAlert(title, message);
          this.errors = response.errors;
        }
  		});
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  // register and go to home page
  /*register() {
    this.nav.setRoot(HomePage);
  }*/

  // go to login page
  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
