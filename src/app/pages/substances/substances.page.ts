import { Component, OnInit, ViewChild} from '@angular/core';
import { NavController, IonInput } from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {DialogService} from '../../services/dialog.service';
import {VdmcApiService} from '../../services/vdmc-api.service';

@Component({
  selector: 'app-substances',
  templateUrl: './substances.page.html',
  styleUrls: ['./substances.page.scss'],
})
export class SubstancesPage implements OnInit {

  @ViewChild(IonInput, {static: false}) searchbar: IonInput;
  search:String;
  substances = [];
  // substances = [{id:"324234234223", name: "product1", alternativeNames: ["altername1", "altername2"]}, {id:"324234234223", name: "product2", alternativeNames: ["altername1", "altername2"]}];

  constructor(private authService: AuthService, private navCtrl: NavController,
    private dlgService: DialogService, private vdmcApi: VdmcApiService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.navCtrl.navigateForward('signin');
    } else if (!this.authService.isRegistered()) {
      this.navCtrl.navigateForward('register');
    }
  }

  changeValue(){
    if(this.search.length < 3) {
      this.substances = [];
      return;
    }
    this.substances = [];
    this.dlgService.showLoading("", () => {this.searchbar.setFocus();});
    this.vdmcApi.searchsubstances(this.search).subscribe(result => {
      console.log(result)
      this.dlgService.closeLoading();
      if(result["data"]) this.substances = result["data"];
    },
    error => {
        this.dlgService.closeLoading();
        this.dlgService.showAlertConfirm(error.message, 'menu/home');
    }
    )
  }

  goSubstenceDetails(substenceId){
    this.navCtrl.navigateForward("menu/substance-details/" + substenceId); 
  }

}
