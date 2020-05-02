import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInput } from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {DialogService} from '../../services/dialog.service';
import {VdmcApiService} from '../../services/vdmc-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  search:String = "";
  products: Array<any> = [];
  @ViewChild(IonInput, {static: false}) searchbar: IonInput;

  constructor(private authService: AuthService, private navCtrl: NavController,
    private dlgService: DialogService, private vdmcApi: VdmcApiService ) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.navCtrl.navigateForward('signin');
    } else if (!this.authService.isRegistered()) {
      this.navCtrl.navigateForward('register');
    }
  }

  changeValue(){
    if(this.search.length < 3) {
      this.products = [];
      return;
    }
    this.products = [];
    this.dlgService.showLoading("", () => {this.searchbar.setFocus();});
    this.vdmcApi.searchproducts(this.search).subscribe(result => {
      this.dlgService.closeLoading();
      if(result["data"]) this.products = result["data"];
    },
    error => {
        this.dlgService.closeLoading();
        this.dlgService.showAlertConfirm(error.message, 'menu/home');
    }
    )
  }

  goProductDetails(productId){
    this.navCtrl.navigateForward("menu/product-details/" + productId); 
  }
}
