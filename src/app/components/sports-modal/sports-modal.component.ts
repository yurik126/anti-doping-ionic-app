import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sports-modal',
  templateUrl: './sports-modal.component.html',
  styleUrls: ['./sports-modal.component.scss'],
})
export class SportsModalComponent implements OnInit {

  @Input() license = false;
  @Input() sports = [];
  @Input() usersports = [];
  listsports = [];
  @Input() sportid = 0;
  @Input() type = "edit";
  selectedid = 0;
  selectedLicense = false;
  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.selectedLicense = this.license;
  }

  change($event){
    this.selectedid = $event.detail.value;
  }

  save(){
    var found = 0;
    if(!this.usersports) this.usersports = [];
    if (this.usersports.length > 0) {
      for(let value of this.usersports){
        if (value.id == this.selectedid) {
          found = 1;
        }
      }
    }
    if (this.usersports.length == 0 || found == 0 || this.license != this.selectedLicense) {

      for(let index in this.usersports){
        let item = this.usersports[index];
        if(item.id == this.sportid){
          this.usersports.splice(parseInt(index), 1);
        }
      }
      for(let value of this.sports){
        if (value.id == this.selectedid) {
          var sportname = value.name;
        }
      };
      this.usersports.push({
        id: this.selectedid,
        licensed: this.selectedLicense,
        name: sportname
      });
      this.modalCtrl.dismiss({usersports: this.usersports, license: this.selectedLicense, type: "edit"});
    }
  }

  cancel(){
    this.modalCtrl.dismiss({usersports: this.usersports, license: this.selectedLicense, type: "cancel"});
  }

  async remove(){
    const alert = await this.alertCtrl.create({
      header: '',
      message: 'Silmek istediğinizden emin misiniz?',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Eminim',
          handler: () => {
            var found = 0;
            for(let key in this.usersports){
              let value = this.usersports[key];
              if (value.id == this.selectedid) {
                found = 1;
                this.usersports.splice(parseInt(key), 1);
              }
            };  
            if(found == 1) this.modalCtrl.dismiss({usersports: this.usersports, license: this.license, type: "remove"});
          }
        }
      ]
    });
    await alert.present();
  }
}
