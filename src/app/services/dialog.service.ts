import { Injectable } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  
  isLoading = null;
  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController) {

     }

    async ShowModal (modalPage, params){
      const modal = await this.modalCtrl.create({
        component: modalPage
      });
      return await modal.present();
    }

    async showAlert(header = 'Alert', subHeader = 'subtitle', message = '', buttons = ['OK']) {
      let alert = await this.alertCtrl.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: buttons
      });
  
      await alert.present();
    }

  async showLoading(message, func = () => {console.log("loading")}) {
    let loading = await this.loadingCtrl.create({
      message: message,
      duration: 3000,
    });
    loading.onDidDismiss().then(func);
    if(!this.isLoading) {
      loading.present().then(func);
      this.isLoading = true;
    }
  }

  closeLoading(){
    this.isLoading = false;
    this.loadingCtrl.dismiss();
  }

  async showAlertConfirm(message, path) {
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      message: '<div class="popup-alert-text">' + message + '</div>',
      buttons: [
        {
          text: 'Tamam',
          handler: () => {
            if(path) this.navCtrl.navigateForward(path);
          }
        }
      ]
    });

    await alert.present();
  }
}
