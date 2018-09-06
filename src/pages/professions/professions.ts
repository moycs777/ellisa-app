import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { QuestionsPage } from '../questions/questions';

import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';

import * as _ from 'lodash';

/**
 * Generated class for the ProfessionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-professions',
  templateUrl: 'professions.html',
})
export class ProfessionsPage {
  professions: any[] = [];
  dataProfessions: any[] = [];
  my_professions: any[] = [];
  profession_id = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public profileService: ProfileServiceProvider) {

      this.dataProfessions = this.navParams.get('professions');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessionsPage');

    this.storage.get('user').then((val) => {
      let id = val.id;
      this.getMyProfessions(id);
    });
  }

  mayus(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  radioChecked(id) {
    if(this.profession_id == id) {
      console.log('Ya seleccionaste esta profesión.');
    }

    this.profession_id = id;

  }

  getMyProfessions(id) {
    console.log("el id es : " + id)
    this.profileService.myProfessions(id)
      .subscribe(data => {
        this.my_professions = data.data;
        let myProfession = this.my_professions;
        let professions = [];

         _.each(this.dataProfessions,function(obj) {
          let elements = _.find(myProfession,obj);
          if(elements===undefined) {
            professions.push(obj);
          }
        });

        this.professions = professions;
      },
        err => console.log(err)
      )
  }

  goQuestions() {
    this.navCtrl.push(QuestionsPage, {profession_id: this.profession_id});
  }

}
