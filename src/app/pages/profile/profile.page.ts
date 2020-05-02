import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { VdmcApiService } from '../../services/vdmc-api.service';
import {AuthService} from '../../services/auth.service';
import {DialogService} from '../../services/dialog.service';
import {VdmcRequestService} from '../../services/vdmc-request.service';
import { SportsModalComponent } from '../../components/sports-modal/sports-modal.component';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  isLoading = false;
  profilephoto = "";
  profilename = "";
  profilesurname = "";
  city:any;
  citySelected:any;
  cityname:any;
  education:any;
  educationSelected:any;
  educationname:any;
  gender:any;
  genderSelected:any;
  gendername:any;
  usersports:any;
  user:any;
  sportid:any;
  license = false;
  sports = [];
  cities = [];
  educations = [];

  constructor(private authService: AuthService,private dlgService: DialogService, private vdmcRequest: VdmcRequestService, private alertCtrl: AlertController,
    private navCtrl: NavController, private modalCtrl: ModalController, private storage: Storage, private vdmcApi: VdmcApiService, private loadingController: LoadingController) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.navCtrl.navigateForward('signin');
    } else if (!this.authService.isRegistered()) {
      this.navCtrl.navigateForward('register');
    }
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

  async presentLoading(message) {
    let loading = await this.loadingController.create({
      message: message,
    });
    await loading.present();
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

    this.storage.get("isRegistered").then((val) =>{
      if (parseInt(val) == 1){
        this.storage.get("TCKimlikNoHash").then((TCKimlikNoHash) =>{
          this.presentLoading("");
          this.vdmcRequest.postRequest("user/details","tcHash=" + TCKimlikNoHash)
            .subscribe(
              (result) => {
                this.loadingController.dismiss();
                if (result["data"] && result["data"].id) {
                  this.city = result["data"].city.id;
                  this.citySelected = result["data"].city.id;
                  this.cityname = result["data"].city.name;
                  this.education = result["data"].education.id;
                  this.educationSelected = result["data"].education.id;
                  this.educationname = result["data"].education.name;
                  this.gender = result["data"].gender.id;
                  this.genderSelected = result["data"].gender.id;
                  this.gendername = result["data"].gender.name;
                  this.usersports = result["data"].sports;
                } else {
                  this.navCtrl.navigateForward('menu/home');
                }
              },
              error =>{

              }
            )

        });

      }
    });

  }

  editGender() {
    var inputs = [
      {
        name: 'radio1',
        type: 'radio',
        label: 'Kadın',
        value: 1,
        checked: this.genderSelected ==1 ?true:false
      },
      {
        name: 'radio2',
        type: 'radio',
        label: 'Erkek',
        value: 2,
        checked: this.genderSelected ==2 ?true:false
      }
    ];
  
    this.presentAlertRadio(inputs, "Cinsiyet", "gender");
  }

  editEducation(){
    let inputs = [];
    for(let education of this.educations){
      let item = {
        name: education.name,
        type: 'radio',
        label: education.name,
        value: education,
        checked: this.educationSelected ==education.id ?true:false
      }
      inputs.push(item);
    }
    this.presentAlertRadio(inputs, "Eğitim Durumu", "education");
  }

  editCity(){
    let inputs = [];
    for(let city of this.cities){
      let item = {
        name: city.name,
        type: 'radio',
        label: city.name,
        value: city,
        checked: this.citySelected ==city.id ?true:false
      }
      inputs.push(item);
    }
    this.presentAlertRadio(inputs, "Şehir", "city");

  }

  editSport(id, licensed){
    this.license = licensed;
    this.sportid = id;
    this.showSportsModal("edit");
  }

  addSport(){
    this.showSportsModal("add");
  }

  async presentAlertRadio(inputs, header, type) {
    let buttons = [
      {
        text: 'İptal',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'Seç',
        handler: (data) => {
          this.save(data, type);
        }
      }
    ];
    
    const alert = await this.alertCtrl.create({
      header: header,
      inputs:inputs,
      buttons: buttons
    });

    await alert.present();
  }

  async showSportsModal(type){
    if(this.isLoading) return;
    const modal = await this.modalCtrl.create({
      component: SportsModalComponent,
      cssClass: "sportModal",
      componentProps: {
        sports: this.sports,
        usersports: this.usersports,
        sportid: this.sportid,
        license: this.license,
        type: type
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.isLoading = false;
        this.usersports = data.data.usersports;
        var type = data.data.type;
        if(type !== "cancel") this.save(null, "soprt");
    });
    this.isLoading = true;
    return await modal.present();
  }

  async save(data, type){
    if(type == "gender"){
      this.gender = data;
      this.genderSelected = data;
      this.gendername = data == 2 ? "Erkek" : "Kadın";
    }
    else if(type == "education"){
      this.education = data.id;
      this.educationSelected = data.id;
      this.educationname = data.name;
    }
    else if(type == "city"){
      this.city = data.id;
      this.citySelected = data.id;
      this.cityname = data.name;
    }

    // else if(type == "sport"){
    //   if(data.length == 0) return;
    //   for(let index in this.usersports){
    //     let item = this.usersports[index];
    //     if(item.id == this.sportid){
    //       this.usersports.splice(index, 1);
    //     }
    //   }
    //   for(let value of this.sports){
    //     if (value.id == data) {
    //       sportname = value.name;
    //     }
    //   };
    //   this.usersports.push({
    //     id: data,
    //     licensed: this.license,
    //     name: sportname
    //   });
    // }

    // else if(type == "addsport"){
    //   var found = 0;
    //   if (this.usersports.length > 0) {
    //     for(let value of this.usersports){
    //       if (value.id == data.id) {
    //         found = 1;
    //       }
    //     }
    //     if (this.usersports.length == 0 || found == 0) {
    //       var sportname = "";
    //       for(let value of this.sports){
    //         if (value.id == data.id) {
    //           sportname = value.name;
    //         }
    //       }
    //       this.usersports.push({
    //         id: data.id,
    //         licensed: this.license,
    //         name: sportname
    //       });
    //     }
    //   }
    // }

    var requestData = "tcHash=" + await this.storage.get("TCKimlikNoHash")
        + "&gender=" + this.gender
        + "&city=" + this.city
        + "&education=" + this.education
        + "&sports=" + JSON.stringify(this.usersports);

      this.presentLoading("");
      this.vdmcApi.updateuser(requestData).subscribe(
        result => {
          this.loadingController.dismiss();
        },
        error => {
          this.loadingController.dismiss();
        }
      )
  }

}
