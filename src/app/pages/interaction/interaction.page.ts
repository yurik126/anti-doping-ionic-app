import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {DialogService} from '../../services/dialog.service';
import {VdmcApiService} from '../../services/vdmc-api.service';
import { InteractionNutritionsModalComponent } from '../../components/interaction-nutritions-modal/interaction-nutritions-modal.component';
import { InteractionProductsModalComponent } from '../../components/interaction-products-modal/interaction-products-modal.component';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.page.html',
  styleUrls: ['./interaction.page.scss'],
})
export class InteractionPage implements OnInit {

  nutritions = [];
  products = [];
  search = "";
  interactionProducts;
  interactionNutritions;
  isLoading = false;

  constructor(private authService: AuthService, private navCtrl: NavController, private modalCtrl: ModalController,
    private dlgService: DialogService, private vdmcApi: VdmcApiService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.navCtrl.navigateForward('signin');
    } else if (!this.authService.isRegistered()) {
      this.navCtrl.navigateForward('register');
    }
    this.dlgService.showLoading("");
    this.vdmcApi.nutritions().subscribe(result => {
      this.dlgService.closeLoading();
      this.nutritions = result["data"];
    },
    error => {
      console.log(error);
    }
    )
  }

  async product(){
    if(this.isLoading) return;
    const modal = await this.modalCtrl.create({
      component: InteractionProductsModalComponent,
      showBackdrop: true,
	    backdropDismiss: true,
      componentProps: {
        products: this.products,
        interactionProducts: this.interactionProducts
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.isLoading = false;
        this.interactionProducts = data.data.interactionProducts;
    });
    this.isLoading = true;
    return await modal.present();
  }

  async viewNutritions(){
    if(this.isLoading) return;
    const modal = await this.modalCtrl.create({
      component: InteractionNutritionsModalComponent,
      showBackdrop: true,
	    backdropDismiss: true,
      componentProps: {
        nutritions: this.nutritions,
        interactionNutritions: this.interactionNutritions
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.isLoading = false;
        this.interactionNutritions = data.data.interactionNutritions;
    });
    this.isLoading = true;
    return await modal.present();
     
  }

  removeProduct(interactionProduct){
    this.interactionProducts = this.interactionProducts.filter(
      interactionProductsValue => interactionProduct.id !== interactionProductsValue.id);
    for (let productsValue of this.products) {
      if(productsValue.id === interactionProduct.id) productsValue.added = 0;
    }
  }

  removeNutrition(interactionNutrition){
    this.interactionNutritions = this.interactionNutritions.filter(
      interactionNutritionValue => interactionNutrition.id !== interactionNutritionValue.id);
    for (let nutritionsValue of this.nutritions) {
      if(nutritionsValue.id === interactionNutrition.id) nutritionsValue.added = 0;
    }
  }

  interactionDetails(){
    if (!this.interactionNutritions || this.interactionNutritions.lengh == 0) {
      this.dlgService.showAlert("", "", "Besin seçiniz", ['Tamam']);
      return;
    }
    if (!this.interactionProducts || this.interactionProducts.lengh == 0) {
      this.dlgService.showAlert("", "", "İlaç seçiniz", ['Tamam']);
      return;
    }
    var nutritionsString = null;
    var productString = null;

    for(let value of this.interactionNutritions) {
      nutritionsString = nutritionsString + value.id + ",";
    };

    for(let value of this.interactionProducts) {
      productString = productString + value.id + ",";
    };

    if (nutritionsString) {
      nutritionsString = nutritionsString.substring(0, nutritionsString.length - 1);
    }

    if (productString) {
      productString = productString.substring(0, productString.length - 1);
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        products: productString,
        nutritions: nutritionsString
      }
    };
    this.navCtrl.navigateForward('interaction-details', navigationExtras);
  }

}
