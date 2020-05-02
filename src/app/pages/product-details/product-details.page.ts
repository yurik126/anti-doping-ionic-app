import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {DialogService} from '../../services/dialog.service';
import {VdmcApiService} from '../../services/vdmc-api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  barcode:any;
  drugName = "";
  dopingStatus = true;
  prohibitionCondition: any;
  prohibitionConditionDescription:any;
  prohibitionTime:any;
  prohibitedGender:any;
  sports = [];
  applicationMethods = [];
  specialCases:any;
  substances = [];
  nutritionInteractionWarnings = [];
  nutritionInteractions = [];
  isLoading = true;

  constructor(private route: ActivatedRoute, private authService: AuthService, private navCtrl: NavController,
              private dlgService: DialogService, private vdmcApi: VdmcApiService, private alertCtrl: AlertController ) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.navCtrl.navigateForward('signin');
    } else if (!this.authService.isRegistered()) {
      this.navCtrl.navigateForward('register');
    }
    this.barcode = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData(){
    this.isLoading = true;
    this.dlgService.showLoading("");
    this.vdmcApi.productdopingdetails(this.barcode).subscribe(result => {
      this.dlgService.closeLoading();
      this.isLoading = false;
      if (!result["success"]){
        this.dlgService.showAlertConfirm("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.", "menu/home");
      }else{
        this.drugName = result["data"].product.name;
        this.substances = result["data"].substances;
        this.prohibitionCondition = result["data"].dopingInfo.prohibitionCondition;
        this.prohibitedGender = result["data"].dopingInfo.prohibitedGender;
        this.prohibitionConditionDescription = result["data"].dopingInfo.prohibitionConditionDescription;

        this.prohibitionTime = result["data"].dopingInfo.prohibitionTime;
        this.sports = result["data"].dopingInfo.prohibitedSports;
        this.applicationMethods = result["data"].dopingInfo.prohibitedApplicationMethods;
        this.specialCases = result["data"].dopingInfo.specialCases;
        this.dopingStatus = result["data"].dopingInfo.prohibited;

        this.nutritionInteractions = result["data"].nutritionInteractions;
        this.nutritionInteractionWarnings = result["data"].nutritionInteractionWarnings;

        if (result["data"].dopingInfo.prohibited == null) {
          this.dopingStatus = false;
          this.prohibitionCondition = "Yasaklı değil";
        }
      }
    },
    error => {
        this.dlgService.closeLoading();
        this.dlgService.showAlertConfirm(error.message, "menu/home");
    }
    )
  }

  

  goSubstanceDetails(substanceId){
    this.navCtrl.navigateForward("menu/substance-details/" + substanceId); 
  }


}
