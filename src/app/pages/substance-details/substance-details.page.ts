import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {DialogService} from '../../services/dialog.service';
import {VdmcApiService} from '../../services/vdmc-api.service';

@Component({
  selector: 'app-substance-details',
  templateUrl: './substance-details.page.html',
  styleUrls: ['./substance-details.page.scss'],
})
export class SubstanceDetailsPage implements OnInit {
  barcode:any;
  isLoading = true;
  substanceName = "";
  dopingStatus = false;
  prohibitionCondition:any;
  prohibitionConditionDescription:any;
  wadaCode:any;
  prohibitionTime:any;
  prohibitedGender:any;
  specialCases:any;
  alternativeNames = [];
  includedProducts = [];
  nutritionInteractionWarnings = [];
  nutritionInteractions = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private navCtrl: NavController,
    private dlgService: DialogService, private vdmcApi: VdmcApiService, private alertCtrl: AlertController) { }

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
    this.dlgService.showLoading("");
    this.vdmcApi.substancedopingdetails(this.barcode).subscribe(result => {
      console.log(result)
      this.dlgService.closeLoading();
      this.isLoading = false;
      if (!result["success"]){
        this.dlgService.showAlertConfirm("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.", "menu/home");
      }else{
        this.substanceName = result["data"].substance.name;
        this.prohibitionTime = result["data"].dopingInfo.prohibitionTime;
        this.prohibitionCondition = result["data"].dopingInfo.prohibitionCondition;
        this.prohibitedGender = result["data"].dopingInfo.prohibitedGender;

        this.specialCases = result["data"].dopingInfo.specialCases;
        this.alternativeNames = result["data"].alternativeNames;
        if (result["data"].products.length > 0) {
          this.includedProducts = result["data"].products;
        } else {
          this.includedProducts = null;
        }

        this.dopingStatus = result["data"].dopingInfo.prohibited;
        this.prohibitionConditionDescription = result["data"].dopingInfo.prohibitionConditionDescription;

        this.nutritionInteractions = result["data"].nutritionInteractions;
        this.nutritionInteractionWarnings = result["data"].nutritionInteractionWarnings;

        if (!result["data"].dopingInfo.wadaCode) {
          this.wadaCode = result["data"].substance.name + " WADA yasaklı listesinde değildir";
        } else {
          this.wadaCode = result["data"].dopingInfo.wadaCode;
        }

        if (result["data"].dopingInfo.prohibited == null) {
          this.dopingStatus = false;
          this.prohibitionCondition = "Yasaklı değil";
        }

      }
    },
    error => {
      console.log(error);
        this.dlgService.closeLoading();
        this.dlgService.showAlertConfirm(error.message, "menu/home");
    }
    )
  }

  goProductDetails(productId){
    this.navCtrl.navigateForward("menu/product-details/" + productId); 
  }

}
