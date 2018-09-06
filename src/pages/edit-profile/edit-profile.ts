import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProfilePage } from '../profile/profile';

import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  edit = {
    name: '',
    email: ''
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public profileService: ProfileServiceProvider) {

      let data = this.navParams.get('data');
      this.edit.name = data.name;
      this.edit.email = data.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  update() {
    this.storage.get('user').then((val) => {
      this.profileService.updateInfo(val.id, this.edit)
        .subscribe((data) => {
          this.navCtrl.setRoot(ProfilePage);
        },
        err => console.log(err));
    });
  }

}
