import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {AuthService} from '../../services/auth.service';
import { DialogService } from '../../services/dialog.service';
import {VdmcRequestService} from '../../services/vdmc-request.service';
import {Md5} from 'ts-md5/dist/md5';
import { SifreModalComponent } from '../../components/sifre-modal/sifre-modal.component';
import { TelifModalComponent } from '../../components/telif-modal/telif-modal.component';

const johndoe = "data:image/png;base64,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";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  user = {tc: "", password: ""};
  loading:any;
  alert:any;
  constructor(private alertController: AlertController, private dlgCtrl: DialogService, private storage: Storage, private navController: NavController, private modalCtrl: ModalController,
    private vdmcRequest: VdmcRequestService,private authService: AuthService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.get('AccessToken').then((token)=>{
      this.storage.get('TCKimlikNo').then((TCKimlikNo)=>{
        if(token || TCKimlikNo){
          if(this.authService.isRegistered()) this.navController.navigateForward('menu/home');
          else this.navController.navigateForward('register');
        }
      })

    });
  }

  async showModal (component){
    let modal = await this.modalCtrl.create({
      component: component
    });
    return await modal.present();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
  
  async presentAlert(message) {
    this.alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await this.alert.present();
  }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message,
    });
    await this.loading.present();
  }

  signIn(user) {
    if (!user || !user.tc || !user.password) {
      this.presentAlert("Bilgilerinizi kontrol ediniz");

    } else if (user.tc && user.password) {

      if (user.tc.length != 11) {
        this.presentAlert("TC kimlik numaranız 11 haneli olmalıdır");

      } else {
        this.dlgCtrl.showLoading("");
        var data = 'password=' + user.password + '&tcKimlikNo=' + user.tc;
        
        this.vdmcRequest.postRequest('nabiz/login', data)
        .subscribe((res) => {
          this.dlgCtrl.closeLoading();
          console.log(res);
          if(res["error"].code){
            this.dlgCtrl.showAlert("", null, "TC kimlik numaranız 11 haneli olmalıdır", ["Tamam"]);
          }
          else if(res["data"]){
            this.storage.set("profilename", res["data"].profile.name);
            this.storage.set("profilesurname", res["data"].profile.surname);
            if (res["data"].profile.photo) {
              this.storage.set("profilephoto", res["data"].profile.photo.trim());
            } else {
              this.storage.set("profilephoto", johndoe);
            }
            let tckimlikno = res["data"].tc;
            let accesstoken = res["data"].token;
            let tckimliknohash = Md5.hashStr(user.tc);
            this.presentLoading("");
            this.vdmcRequest.postRequest("user/details","tcHash=" + tckimliknohash)
            .subscribe((result) => {
              console.log(result);
              this.loadingController.dismiss();
              if (result["data"] && result["data"].id) {
                this.storage.set("isRegistered", 1);
                this.storage.set('AccessToken', accesstoken);
                this.storage.set('TCKimlikNo', tckimlikno);
                this.storage.set('TCKimlikNoHash', tckimliknohash);
                this.navController.navigateForward('menu/home');

              } else {
                this.storage.set("isRegistered", 0);
                this.storage.set('AccessToken', accesstoken);
                this.storage.set('TCKimlikNo', tckimlikno);
                this.storage.set('TCKimlikNoHash', tckimliknohash);
                this.navController.navigateForward('register');
              }

              },
              err =>{
                this.dlgCtrl.showAlert("", null, err.message, ["Tamam"]);
                this.presentAlert(err.message);
              }
            )
          }
            
        },
        error => {
          this.presentAlert(error.message);
        })
      }
    }
  }

  sifre(){
    this.showModal(SifreModalComponent);
  }

  enabizExternal(){

  }

  telif(){
    this.showModal(TelifModalComponent);
  }

}
