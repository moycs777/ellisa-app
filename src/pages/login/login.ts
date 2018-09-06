import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController } from "ionic-angular";
//import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { HomePage } from "../home/home";
import { FCM } from '@ionic-native/fcm';

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email: string = "";
  password: string = "";
  errors = [];
  token_id:any;

  constructor(
    public navCtrl: NavController,
    private fcm: FCM,
    public alertCtrl: AlertController,
    private authService: AuthServiceProvider,
    public menu: MenuController,
    public toastCtrl: ToastController
  ) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad(){
    this.fcm.getToken().then(token => {
       console.log(token);
       //here you will getthe device token id ok
       this.token_id = token;
   });
 };

  signin() {

  	let request = {
  		email : this.email,
      password : this.password,
      token_id : this.token_id
    };
     //ok now i am sending you one extra parameter at the time of login tokken, ok
     //please get this parameter in back-end ame as email, password
  	this.authService.login(request)
  		.subscribe( (data) => {
        //console.log("felicidades ahora bienvenido al inicio: " + data.access_token);
        this.authService.storeData(data);
        this.navCtrl.setRoot(HomePage);
  		},

  		(err) => {
				var response = JSON.parse(err._body);
        if(response) {
					let title = 'Error!';
					let message = response.error;
          this.showAlert(title, message);
          console.log(response.error);
        }
        if (err.status === 422) {
          let response = JSON.parse(err._body);
          this.errors = response.errors;
          console.log(response.errors);
        }
  		}
  		);

  	//console.log(request);
  }

  // go to register page
  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
		});
		alert.present();
	}

  // login and go to home page
  /*login() {
    this.nav.setRoot(HomePage);
  }*/

  /*forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: "Forgot Password?",
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: "email",
          placeholder: "Email",
          type: "email"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Send",
          handler: data => {
            console.log("Send clicked");
            let toast = this.toastCtrl.create({
              message: "Email was sended successfully",
              duration: 3000,
              position: "top",
              cssClass: "dark-trans",
              closeButtonText: "OK",
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }*/

}
