import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sifre-modal',
  templateUrl: './sifre-modal.component.html',
  styleUrls: ['./sifre-modal.component.scss'],
})
export class SifreModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

}
