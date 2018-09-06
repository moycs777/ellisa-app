import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the MyServiceDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-service-details',
  templateUrl: 'my-service-details.html',
})
export class MyServiceDetailsPage {

  service = {
    title: '',
    description: '',
    amount: '',
    status: '',
    init_date: null,
    end_date: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public serviceProvider: ServiceProvider) {
  }

  ionViewDidLoad() {
    let params = this.navParams.get('service');
    //console.log('id de servicio ' + JSON.stringify(this.service.id));
    this.showService(params.id);
  }

  showService(id){
    this.serviceProvider.showService(id)
    .subscribe((data) => {
      this.service.title = data.service[0].title;
      this.service.description = data.service[0].description;
      this.service.amount = data.service[0].amount;
      this.service.status = data.service[0].status;
      this.service.init_date = data.service[0].detail.service_date;
      this.service.end_date = data.service[0].detail.end_date;
      console.log(data.service);
    },
    err => console.log(err));
  }

}
