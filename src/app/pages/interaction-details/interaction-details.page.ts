import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {DialogService} from '../../services/dialog.service';
import {VdmcApiService} from '../../services/vdmc-api.service';

@Component({
  selector: 'app-interaction-details',
  templateUrl: './interaction-details.page.html',
  styleUrls: ['./interaction-details.page.scss'],
})
export class InteractionDetailsPage implements OnInit {

  interactions=[ ];
  products:any;
  nutritions:any;

  constructor(private route: ActivatedRoute, private authService: AuthService, private navCtrl: NavController,
    private dlgService: DialogService, private vdmcApi: VdmcApiService, private alertCtrl: AlertController) { }

    ngOnInit() {
      if (!this.authService.isAuthenticated()) {
        this.navCtrl.navigateForward('signin');
      } else if (!this.authService.isRegistered()) {
        this.navCtrl.navigateForward('register');
      }
      this.route.queryParams.subscribe(params => {
        this.products = params.products;
        this.nutritions = params.nutritions;
        this.getData();
      });

    }

    getData(){
      this.dlgService.showLoading("");
      this.vdmcApi.nutritioninteraction(this.nutritions, this.products).subscribe(result => {
        this.dlgService.closeLoading();
        console.log(result);
        if(result["success"]) this.interactions = result["data"];
      },
      error => {
        console.log(error);
          this.dlgService.closeLoading();
          this.dlgService.showAlertConfirm(error.message, null);
      }
      )
    }
  

}
