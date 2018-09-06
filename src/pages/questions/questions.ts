import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery'

import { ProfilePage } from '../profile/profile';

import { ProfileServiceProvider } from '../../providers/profile-service/profile-service'

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  profession_id = null;
  questions: any[] = [];
  user_id = null;
  professionName:any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public profileService: ProfileServiceProvider) {

      this.profession_id = this.navParams.get('profession_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');

    this.storage.get('user').then((val) => {
      this.user_id = val.id;
      console.log("user_id: " + val.id );
      this.get(val.id);
    });
    //this.get();
    this.getProfessionName(this.profession_id);
  }

  getProfessionName(id) {
    this.profileService.getProfessionName(id)
      .subscribe((data) => {
        console.log("nombre de la profesion:  " + JSON.stringify(data.data));
        this.professionName = data.data.name;
      },
      err => console.log(err))
  }

  get(user_id) {
    this.profileService.getQuestions(this.profession_id, user_id)
      .subscribe((data) => {
        console.log("respuesta:  " + JSON.stringify(data.data));
        this.questions = data.data;
      },
    err => console.log(err))
  }

  send() {
    this.storage.get('user').then((val) => {
      let form = {
        data: $('.form-question').serializeArray(),
        idUser: val.id
      };

      this.profileService.storeQuestions(form)
      .subscribe((response) => {
         console.log(response)
         this.navCtrl.setRoot(ProfilePage);
        },
        err => console.log(err));
    });

  }

}
