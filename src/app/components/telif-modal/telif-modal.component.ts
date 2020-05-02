import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-telif-modal',
  templateUrl: './telif-modal.component.html',
  styleUrls: ['./telif-modal.component.scss'],
})
export class TelifModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

}
