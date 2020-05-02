import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Arama',
      url: '/menu/home',
      icon: 'ios-search'
    },
    {
      title: 'Reçetelerim',
      url: '/menu/prescriptions/1',
      icon: 'ios-clipboard'
    },
    
    {
      title: 'Hakkında',
      url: '/menu/about',
      icon: 'ios-information-circle-outline'
    },

    {
      title: 'Profilim',
      url: '/menu/profile',
      icon: 'ios-person'
    },

    

  ];
  profilephoto = "";
  profilename = "";
  profilesurname = "";
  constructor(private storage: Storage, private navController: NavController, private authService: AuthService) { }

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
  }
  
  signout () {
    this.authService.signout();
    this.navController.navigateForward('signin');  
  };
}
