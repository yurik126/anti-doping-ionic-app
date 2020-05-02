import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInput } from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {DialogService} from '../../services/dialog.service';
import {VdmcApiService} from '../../services/vdmc-api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-prohibited-products',
  templateUrl: './prohibited-products.page.html',
  styleUrls: ['./prohibited-products.page.scss'],
})
export class ProhibitedProductsPage implements OnInit {

  @ViewChild(IonInput, {static: false}) searchbar: IonInput;
  search:String = "";
  showload = false;
  products = [];
  // products = [{id:"324234234223", name: "product1"}, {id:"324234234223", name: "product2"}];

  constructor(private authService: AuthService, private navCtrl: NavController, private storage: Storage,
    private dlgService: DialogService, private vdmcApi: VdmcApiService ) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.navCtrl.navigateForward('signin');
    } else if (!this.authService.isRegistered()) {
      this.navCtrl.navigateForward('register');
    }
    this.changeValue();
  }

  changeValue(page = 1){
    if(this.search.length > 0 && this.search.length < 3) return;
    this.dlgService.showLoading("", () => {this.searchbar.setFocus();});
    if(this.search.length == 0) {
        this.storage.set("php-page", 1);
        this.storage.set("php-page-count", 1);
        this.showload = false;
    }    
    
    this.vdmcApi.prohibitedproducts(page,this.search).subscribe(result => {
      console.log(result);
      this.dlgService.closeLoading();
      if (!result["success"]){
        this.dlgService.showAlertConfirm("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.", null);
      }else{
        if (page == 1) {
          this.products = result["data"];
        } else {
          this.products.concat(result["data"]);
        }

      this.storage.set("php-page", parseInt(result["_meta"].currentPage) + 1);
      this.storage.set("php-page-count", parseInt(result["_meta"].totalCount));
      this.setShowLoad();
    }
    },
    error => {
      console.log(error);
        this.dlgService.closeLoading();
        this.dlgService.showAlertConfirm(error.message, null);
    }
    )
  }

  async setShowLoad(){
    if (parseInt(await this.storage.get("php-page")) < parseInt(await this.storage.get("php-page-count"))) {
      this.showload = true;
    } else {
      this.showload = false;
    }
  }

  goProductDetails(productId){
    this.navCtrl.navigateForward("menu/product-details/" + productId); 
  }

  async loadMore(){
    this.dlgService.showLoading("");
    if (parseInt(await this.storage.get("php-page")) < parseInt(await this.storage.get("php-page-count"))) {
      this.changeValue(await this.storage.get("php-page"));
    }
  }
}
