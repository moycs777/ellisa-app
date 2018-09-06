import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery'

import { ProfileServiceProvider } from '../../providers/profile-service/profile-service'

/**
 * Generated class for the UploadImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-images',
  templateUrl: 'upload-images.html',
})
export class UploadImagesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public profileService: ProfileServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadImagesPage');
  }

  send() {
    this.storage.get('user').then((val) => {
      let form = $('.profile-images')[0];
      let formData = new FormData(form);
      formData.append('user_id', val.id);
      this.profileService.storeImages(formData)
        .subscribe((data) => {
          console.log(data)
        },
      err => console.log(err))
    });
  }

}
