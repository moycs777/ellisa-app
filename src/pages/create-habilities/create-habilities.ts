import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfessionsPage } from '../professions/professions';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';

/**
 * Generated class for the CreateHabilitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-habilities',
  templateUrl: 'create-habilities.html',
})
export class CreateHabilitiesPage {
  categories: any[] = [];
  professions: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileService: ProfileServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateHabilitiesPage');
    this.get();
  }

  get() {
    this.profileService.getCategories()
      .subscribe((data) => {
        this.categories = data.data;
      },
    err => console.log(err))
  }

  radioChecked(category) {
    this.professions = category.professions;
  }

  goProfessions() {
    this.navCtrl.push(ProfessionsPage, {professions:  this.professions});
  }

  mayus(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
