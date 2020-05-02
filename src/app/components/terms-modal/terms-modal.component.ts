import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss'],
})
export class TermsModalComponent implements OnInit {
  
  agree = false;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  
  agreed(){
    this.modalCtrl.dismiss({agree: this.agree});
  }

}
