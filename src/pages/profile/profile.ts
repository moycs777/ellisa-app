import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EditProfilePage } from '../edit-profile/edit-profile';
import { CreateHabilitiesPage } from '../create-habilities/create-habilities';
import { UploadImagesPage } from '../upload-images/upload-images';

import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { QuestionsPage } from '../questions/questions';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  info = {
    name: '',
    email: ''
  };

  profile: any = null;
  myProfessions: any[] = ["null-0"];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public profileService: ProfileServiceProvider) {
      this.profile = 'my-info';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.myInfo();

    this.storage.get('user').then((val) => {
      let id = val.id;
      this.getMyProfessions(id);
    });

  }

  myInfo() {
     this.storage.get('user').then((val) => {
       let id = val.id;

       this.profileService.getInfo(id)
       .subscribe( (data) => {
          this.info.name = data.me.name;
          this.info.email = data.me.email;
         },
         err => console.log(err));
     });
  }

  editProfile() {
    let formData = {name: this.info.name, email: this.info.email};
    this.navCtrl.push(EditProfilePage, {data: formData});
  }

  selectHabilities() {
    this.navCtrl.push(CreateHabilitiesPage);
  }

  uploadImages() {
    this.navCtrl.push(UploadImagesPage);
  }

  getMyProfessions(id) {
    console.log("el id es : " + id)
    this.profileService.myProfessions(id)
      .subscribe(data => {
        this.myProfessions = data.data;
          console.log("lo q llega: " + JSON.stringify(data.data));
        },
        err => console.log(err)
      )
  }

  goQuestions(profession_id) {
    this.navCtrl.push(QuestionsPage, { profession_id: profession_id });
  }
  

}
