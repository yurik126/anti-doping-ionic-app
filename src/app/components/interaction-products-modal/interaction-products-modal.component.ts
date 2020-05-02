import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import {DialogService} from '../../services/dialog.service';
import {VdmcApiService} from '../../services/vdmc-api.service';


@Component({
  selector: 'app-interaction-products-modal',
  templateUrl: './interaction-products-modal.component.html',
  styleUrls: ['./interaction-products-modal.component.scss'],
})
export class InteractionProductsModalComponent implements OnInit {

  search:String;
  @Input() interactionProducts;
  @Input() products;
  @ViewChild(IonInput, {static: false}) searchbar: IonInput;

  constructor(private modalCtrl: ModalController, private dlgService: DialogService, private vdmcApi: VdmcApiService) { }

  ngOnInit() {
    // console.log(this.products)
  }

  changeValue(){
    if(this.search.length < 3) {
      this.products = [];
      return;
    }
    this.dlgService.showLoading("", () => {this.searchbar.setFocus();});
    this.vdmcApi.searchproducts(this.search).subscribe(result => {
      this.dlgService.closeLoading();
      if (!result["success"]){
        this.dlgService.showAlertConfirm("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.", null);
      }else{
        this.products = result["data"];
      }
    },
    error => {
      console.log(error);
        this.dlgService.closeLoading();
        this.dlgService.showAlertConfirm(error.message, null);
    }
    )
  }

  close(){
    this.modalCtrl.dismiss({interactionProducts: this.interactionProducts});
  }

  addProduct(product){
    if(!this.interactionProducts) this.interactionProducts = [];
    if (product.added != 1) {
      let found = 0;
      if (this.interactionProducts.length >= 3) {
        this.dlgService.showAlert(null, null, "Üç adet besin ekleyebilirsiniz", ["Tamam"]);
      }
      else if (this.interactionProducts.length == 0) {
        product.added = 1;
        this.interactionProducts.push(product);
        this.close();
      }
      else{
        this.interactionProducts.forEach(value => {
          if (value.id == product.id) {
            found = 1;
            value.added = 1;
            product.added = 1;
          }
          if (found == 0) {
            product.added = 1;
            this.interactionProducts.push(product);
            this.close();
          }
        })
      }
    }
  }

}
