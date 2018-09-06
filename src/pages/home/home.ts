import {Component} from "@angular/core";
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { PostulationsPage } from '../postulations/postulations';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ServiceProvider } from '../../providers/service/service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  items: any[] = [];

  constructor(
    public navCtrl: NavController, 
  	public navParams: NavParams,
  	private authService: AuthServiceProvider,
    private serviceProvider: ServiceProvider,
    private menu: MenuController
  ) {
  }

  ionViewDidLoad() {
    console.log('mi id es: ' + this.authService.idUser);
    this.menu.enable(true);

    this.index();
  }

  index() {
    this.serviceProvider.getAll(this.authService.idUser)
      .subscribe( (data) => {
        console.log(data);
        this.items = data.services;
      },
      (err) => {
        console.log(err);
      })
  }

  sendProposal(data) {
		this.navCtrl.push(PostulationsPage, {service: data});
	}

  

}

//
