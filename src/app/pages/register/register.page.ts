import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { VdmcApiService } from '../../services/vdmc-api.service';
import {AuthService} from '../../services/auth.service';
import {DialogService} from '../../services/dialog.service';
import { TermsModalComponent } from '../../components/terms-modal/terms-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isLoading = false;
  agree = false;
  profilephoto = "";
  profilename = "";
  profilesurname = "";
  city:any;
  education:any;
  genderSelected:any;
  usersports:Array<any>;
  sport:"";
  license = true;;
  sports = [];
  cities = [];
  educations = [];

  constructor(private authService: AuthService,private dlgService: DialogService, private modalCtrl: ModalController, private alertCtrl: AlertController,
    private navCtrl: NavController, private storage: Storage, private vdmcApi: VdmcApiService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.get("profilephoto").then((val) => {
      this.profilephoto = val;
    });
    this.storage.get("profilename").then((val) => {
      this.profilename = val;
    });
    this.storage.get("profilesurname").then((val) => {
      this.profilesurname = val;
    });
    this.getData();
  }

  getData(){
    this.vdmcApi.sports().subscribe(
      result => {
        this.sports = result["data"];
      }
    )
    this.vdmcApi.cities().subscribe(
      result => {
        this.cities = result["data"];
      }
    )

    this.vdmcApi.education().subscribe(
      result => {
        this.educations = result["data"];
      }
    )
  }

  changeGender($event){
    this.genderSelected = $event.detail.value;
  }

  changeEducation($event){
    this.education = $event.detail.value;
  }

  changeCity($event){
    this.city = $event.detail.value;
  }

  async deleteSport(sportid){
      const alert = await this.alertCtrl.create({
        header: '',
        message: 'Silmek istediğinizden emin misiniz?',
        buttons: [
          {
            text: 'İptal',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Eminim',
            handler: () => {
              for(let key in this.usersports){
                let value = this.usersports[key];
                if (value.id == sportid) {
                  this.usersports.splice(parseInt(key), 1);
                }
              };  
            }
          }
        ]
      });
      
      await alert.present();
  }

  async showSports() {
    let inputs = [];
    inputs.push({
      name: "Spor seçiniz",
      type: 'radio',
      label: "Spor seçiniz",
      value: "",
    });
    for(let sport of this.sports){
      let item = {
        name: sport.name,
        type: 'radio',
        label: sport.name,
        value: sport,
      }
      inputs.push(item);
    }
    const alert = await this.alertCtrl.create({
      header: "Spor Dalı",
      inputs:inputs,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ekle',
          handler: (data) => {
            if(!data.id) return;
            this.sport = data.id;
            var found = 0;
            if(!this.usersports) this.usersports = [];
            if (this.usersports.length > 0) {
              for(let value of this.usersports) {
                if (value.sport == this.sport) {
                  found = 1;
                }
              };
            }
            if (this.usersports.length == 0 || found == 0) {
              var sportname = "";
              for(let value of this.sports) {
                if (value.id == this.sport) {
                  sportname = value.name;
                }
              };
              var item = {
                id: this.sport,
                licensed: this.license,
                name: sportname
              }
              this.usersports.push({
                id: this.sport,
                licensed: this.license,
                name: sportname
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading(message) {
    let loading = await this.loadingController.create({
      message: message,
    });
    await loading.present();
  }

  async showTermModal(){
    if (!this.genderSelected || !this.city || !this.education) {
      this.dlgService.showAlertConfirm("Bilgilerinizi kontrol ediniz", null);
      return;
    }
    if(this.isLoading) return;
    const modal = await this.modalCtrl.create({
      component: TermsModalComponent,
      showBackdrop: true,
	    backdropDismiss: true,
    });
    modal.onDidDismiss()
      .then((data) => {
        this.isLoading = false;
        this.agree = data.data.agree;
        if(this.agree) this.save();
    });
    this.isLoading = true;
    return await modal.present();

  }

  async save(){
    var requestData = "tcHash=" + await this.storage.get("TCKimlikNoHash")
      + "&gender=" + this.genderSelected
      + "&city=" + this.city
      + "&education=" + this.education
      + "&sports=" + JSON.stringify(this.usersports);
    this.presentLoading("");
    let serverError = "Bir hata olutu. Lütfen daha sonra tekrar deneyin";
    this.vdmcApi.createuser(requestData).subscribe(
      result => {
        console.log(result);
        this.loadingController.dismiss();
        if(!result["success"]){
          this.dlgService.showAlertConfirm(result["error"].message, "signin");
          this.authService.signout();
        }else{
          this.storage.set("isRegistered", 1);
          this.navCtrl.navigateForward('menu/home');
        }
      },
      error => {
        this.loadingController.dismiss();
        this.authService.signout();
        this.dlgService.showAlertConfirm(error.message, "signin");
      }
    )
  }
}
