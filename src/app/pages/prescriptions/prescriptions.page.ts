import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DialogService } from '../../services/dialog.service';
import {AuthService} from '../../services/auth.service';
import {NabizApiService} from '../../services/nabiz-api.service';
import { PrescriptionDetailsComponent } from '../../components/prescription-details/prescription-details.component';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.page.html',
  styleUrls: ['./prescriptions.page.scss'],
})
export class PrescriptionsPage implements OnInit {
  prescriptions = [];
  token: any;
  tCKimlikNo: any;
  prescription: any;
  message: any;
  isLoading = true;
  type = "1";
  constructor(private route: ActivatedRoute, private alertController: AlertController, private dlgService: DialogService, private modalCtrl: ModalController,
    private navController: NavController, private authService: AuthService, private storage: Storage, private nabizApi: NabizApiService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.navController.navigateForward('signin');
    } else if (!this.authService.isRegistered()) {
      this.navController.navigateForward('register');
    }
    this.storage.get("AccessToken").then((val) => {
      this.token = val;
    });
    this.type = this.route.snapshot.paramMap.get('type');
    this.storage.get("TCKimlikNo").then((val) => {
      this.tCKimlikNo = val;
    });
    this.getPrescriptions();
  }

  async getPrescriptions(){
    this.isLoading = true;
    this.dlgService.showLoading("Reçetelerinizin analizi yapılıyor");
    var data = 'token=' + await this.storage.get('AccessToken') + '&tcKimlikNo=' + await this.storage.get('TCKimlikNo');
    this.nabizApi.prescriptions(data).subscribe(
      result => {
        this.isLoading = false;
        this.dlgService.closeLoading();
        if(result["data"]) this.prescriptions = result["data"].prescriptions;
      },
      error => {
        this.dlgService.closeLoading();
        if (error.code == 4010) {
            this.presentAlertConfirm();
        }
        else{
          this.isLoading = false;
          this.dlgService.showAlertConfirm('Reçete bilgilerine ulaşılamadı. Lütfen daha sonra tekrar deneyin.', "'menu/home'");
        }
        
      }
    )
  }

  async showPrescriptionDetails (){
    const modal = await this.modalCtrl.create({
      component: PrescriptionDetailsComponent,
      componentProps: {
        message: this.message,
        prescription: this.prescription
      }
    });
    return await modal.present();
  }
  
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<div style="text-align: center; width: 100%">e-Nabız oturumunuz kapandı. Reçetelerinizden sorgulama yapmak için tekrar giriş yapmalısınız.</div>',
      buttons: [
        {
          text: '<strong>Devam et</strong>',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.navController.navigateForward('menu/home');
          }
        }, {
          text: 'Çıkış yap',
          handler: () => {
            this.navController.navigateForward('signout');
          }
        }
      ]
    });

    await alert.present();
  }

  openPrescriptionDetails(prescriptionno){
    this.dlgService.showLoading("Reçete detaylarına ulaşılıyor");
      let data = 'token=' + this.token + '&tcKimlikNo=' + this.tCKimlikNo + '&prescriptionNo=' + prescriptionno;
      this.nabizApi.prescriptiondetails(data).subscribe(result => {
        this.dlgService.closeLoading();
        if (result["data"]) {
            this.prescription = result["data"].prescription;
            this.message = result["data"].prescription.dopingStatus == 1 ? "Reçetenizde doping etkisi yaratan ilaç bulunmaktadır" : "Reçetenizde doping etkisi yaratan ilaç bulunmamaktadır";
            this.showPrescriptionDetails();
        }
      },
      error => {
        if (error.code == 2) {
          this.presentAlertConfirm();
        }
        else{
          this.dlgService.showAlertConfirm('Reçete detayına ulaşılamadı. Lütfen daha sonra tekrar deneyin.', null);
        }
      }
    );
  }
}
