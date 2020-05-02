import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-prescription-details',
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.scss'],
})
export class PrescriptionDetailsComponent implements OnInit {
  @Input() prescription;
  @Input() message;

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  productDetails(productId){
    this.navCtrl.navigateForward("menu/product-details/" + productId);
    this.closeModal();

  }

  prescriptionDetailsOK(){
    this.closeModal();
  }

}
