import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
//import {Keyboard} from '@ionic-native/keyboard';

import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { ServiceProvider } from '../providers/service/service';
import { PostulationsServicesProvider } from '../providers/postulations-services/postulations-services';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';

import {MyApp} from "./app.component";

import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {ServicePage} from "../pages/service/service";
import {MyProjectsPage} from "../pages/my-projects/my-projects";
import {PostulationsPage} from "../pages/postulations/postulations";
import {PostulationsServicesPage} from "../pages/postulations-services/postulations-services";
import {MyPostulationsPage} from "../pages/my-postulations/my-postulations";
import { ProfilePage } from "../pages/profile/profile";
import {CreateHabilitiesPage} from '../pages/create-habilities/create-habilities';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {UploadImagesPage} from '../pages/upload-images/upload-images';
import { ProfessionsPage } from "../pages/professions/professions";
import { QuestionsPage } from "../pages/questions/questions";

import {MyServiceDetailsPage} from "../pages/my-service-details/my-service-details";
import { FCM } from '@ionic-native/fcm';
import { Vibration } from '@ionic-native/vibration';

/*Tambien falta crear un evento para mostrar el nombre en el menú del usuario logueado*/

// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ServicePage,
    MyServiceDetailsPage,
    MyProjectsPage,
    PostulationsPage,
    PostulationsServicesPage,
    MyPostulationsPage,
    ProfilePage,
    CreateHabilitiesPage,
    EditProfilePage,
    UploadImagesPage,
    ProfessionsPage,
    QuestionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ServicePage,
    MyServiceDetailsPage,
    MyProjectsPage,
    PostulationsPage,
    PostulationsServicesPage,
    MyPostulationsPage,
    ProfilePage,
    CreateHabilitiesPage,
    EditProfilePage,
    UploadImagesPage,
    ProfessionsPage,
    QuestionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
   // Keyboard,
    AuthServiceProvider,
    ServiceProvider,
    PostulationsServicesProvider,
    ProfileServiceProvider,
    FCM,
    Vibration
  ]
})

export class AppModule {
}
