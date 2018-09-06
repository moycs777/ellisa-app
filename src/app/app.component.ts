import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Events, AlertController, ToastController } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { ServicePage } from '../pages/service/service';
import { MyProjectsPage } from '../pages/my-projects/my-projects';
import { MyPostulationsPage } from '../pages/my-postulations/my-postulations';
import { ProfilePage } from "../pages/profile/profile";

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { FCM } from "@ionic-native/fcm";
import { Vibration } from '@ionic-native/vibration';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

declare var Pusher: any;


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  user: '';
  idUser:1;
  channel;
  private pusher: any;
  private channels: any[];

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(
    public alertCtrl: AlertController,
    public platform: Platform,
    private fcm: FCM,
    private vibration: Vibration,
    public toastCtrl: ToastController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    //public keyboard: Keyboard,
    private authService: AuthServiceProvider,
    public storage: Storage,
    public event: Events
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage,    icon: 'home'},
      {title: 'Servicios', component: ServicePage,    icon: 'navigate'},
      {title: 'Mis Proyectos', component: MyProjectsPage,    icon: 'list-box'},
      {title: 'Mis Postulaciones', component: MyPostulationsPage,    icon: 'list-box'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      this.storage.get('user').then((user)=>{
        if (user) {
          console.log('si hay id ' + (user.id));
          this.rootPage = HomePage;
        }else{
          console.log('no hay id ' + user);
          this.rootPage = LoginPage;
        }
      })


      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
     // this.keyboard.disableScroll(true);

      this.event.subscribe('user:success', (user, idUser) => {
        console.log('user de event', idUser);
        this.user = user;
        this.idUser = idUser;
        // Pusher
        this.pusher = new Pusher('ef78bf1eb6a52dbd83f4', {
          cluster: 'us2',
          encrypted: true
        });
        this.pusher.logToConsole = true;
        this.channels = [];
        /*- - - - - */
        console.log("idUser: " + this.idUser);
        this.channel = this.pusher.subscribe('my-channel-' + this.idUser);
        this.channel.bind('my-event', (data) => {
          console.log('esta es la notificacion con pusher:');
          console.log(data.message);
          this.vibration.vibrate(2000);
          let toast = this.toastCtrl.create({
            message: data.title + ", " + data.message,
            duration: 3000,
            position: "bottom",
            cssClass: "dark-trans",
            closeButtonText: "X",
          });
          toast.present();
        });
      });

      // Notificaciones en primer plano
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
          this.vibration.vibrate(2000);
        };
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.authService.logout();
    this.nav.setRoot(LoginPage);
    this.user = '';
    this.channel.unbind();
  }

  getProfile() {
    this.nav.push(ProfilePage);
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
